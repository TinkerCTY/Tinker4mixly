/*语音识别库文件

  版本：3.0  修改时间：2017/07/10

  board:Arduino leonardo

  公司：成都极趣科技有限公司

  网站：http://dfrobot.taobao.com/ 
*/

#include "ASRB.h" 
#include <EEPROM.h>
#include <SPI.h>
#include <SoftwareSerial.h>


ASRBClass ASRB;

SoftwareSerial mySerial(11, 12); // RX, TX

void ASRBClass::sensitivity()
{ 
  uint8 VOL;
  VOL=EEPROM.read(2);
  LD_WriteReg(0x35, VOL);
}

int ASRBClass::Initialise(int nn,char  (*p)[38],unsigned int dd[])
{
  nAsrStatus = LD_ASR_NONE;
  int kk;
  mySerial.begin(9600);
  SPI.begin(); 
  pinMode(SS, OUTPUT);
  pinMode(MISO, INPUT);
  pinMode(MOSI, OUTPUT);
  pinMode(SCK, OUTPUT);
  pinMode(RSTB, OUTPUT);
  SPI.setDataMode(SPI_MODE2);
  SPI.setClockDivider(SPI_CLOCK_DIV32);
  LD_reset();
  pinMode(RST,OUTPUT);
  pinMode(BLED,INPUT);
  pinMode(ASRLED,OUTPUT); 
  digitalWrite(RST,HIGH);   
  eeprom_read(nn,p,dd);
  delay(2000);
  vall=EEPROM.read(4);
  if(vall==0) send_SD(261);  
  else if(vall==111)send_SD(262);  
  else if(vall==112)send_SD(263);
  delay(3000);
  //Serial.println( "1");// 
  kk=EEPROM.read(5);
  if(kk==1) {Serial.begin(2400);send_SD(264);} 
  else if(kk==2) {Serial.begin(4800);send_SD(265); }
  else if(kk==3) {Serial.begin(9600);send_SD(266);}
  else if(kk==4) {Serial.begin(19200);send_SD(267);}
  else if(kk==5) {Serial.begin(38400);send_SD(268);}
  else if(kk==6) {Serial.begin(115200);send_SD(269);}
  delay(3000);
  //Serial.println( "2");//
  return vall;
}


void ASRBClass::LD_WriteReg(unsigned char address,unsigned char value)
{
  address_=address;
  value_=value;
	
  digitalWrite(SS,LOW);
  delay(5);
  SPI.transfer(0x04);
  SPI.transfer(address_);
  SPI.transfer(value_); 
  digitalWrite(SS,HIGH);
 }

unsigned char ASRBClass::LD_ReadReg(unsigned char address)
{ 
  address_=address;
  digitalWrite(SS,LOW);
  delay(5);
  SPI.transfer(0x05);
  SPI.transfer(address_);
  result = SPI.transfer(0x00);  
  digitalWrite(SS,HIGH);
  return(result);
 }

void ASRBClass::LD_reset()
{

  digitalWrite(RSTB,HIGH);
  delay(1);
  digitalWrite(RSTB,LOW);
  delay(1);
  digitalWrite(RSTB,HIGH);
  delay(1);
  digitalWrite(SS,LOW);
  delay(1);
  digitalWrite(SS,HIGH);
  delay(1);
}

void ASRBClass::LD_Init_Common()
{

	LD_ReadReg(0x06);  //
	LD_WriteReg(0x1F, 0x01); 
	delay(10);
	LD_WriteReg(0x1F, 0x00); 
	delay(10);
	LD_WriteReg(0x17, 0x35); 
	delay(10);
	LD_ReadReg(0x06);  //

	LD_WriteReg(0x89, 0x03);  
	delay(5);
	LD_WriteReg(0xcf, 0x43);  
	delay(5);
	LD_WriteReg(0xcb, 0x02);

	LD_WriteReg(0x11, LD_PLL_11);  
	LD_WriteReg(0x1e,0x00);
	LD_WriteReg(0x19, LD_PLL_ASR_19); 
	LD_WriteReg(0x1b, LD_PLL_ASR_1B);	
       LD_WriteReg(0x1d, LD_PLL_ASR_1D);

	delay(10);
	LD_WriteReg(0xcd, 0x04);
	LD_WriteReg(0x17, 0x4c); 
	delay(5);
	LD_WriteReg(0xb9, 0x00);
	LD_WriteReg(0xcf, 0x4f); 
}

void ASRBClass::LD_Init_ASR()
{
	nLD_Mode=LD_MODE_ASR_RUN;
	LD_Init_Common();

	LD_WriteReg(0xbd, 0x00);
	LD_WriteReg(0x17, 0x48);
	delay(10);

	LD_WriteReg(0x3c, 0x80);  
	LD_WriteReg(0x3e, 0x07);
	LD_WriteReg(0x38, 0xff);  
	LD_WriteReg(0x3a, 0x07);
	LD_WriteReg(0x40, 0);   
	LD_WriteReg(0x42, 8);
	LD_WriteReg(0x44, 0); 
	LD_WriteReg(0x46, 8); 
	delay(1);
}

void ASRBClass::ProcessInt0()
{ 
	uint8 nAsrResCount=0;
//detachInterrupt(0) ;
	ucRegVal = LD_ReadReg(0x2b);
	if(nLD_Mode == LD_MODE_ASR_RUN)
	{
		LD_WriteReg(0x29,0) ;
		LD_WriteReg(0x02,0) ;	
		if((ucRegVal & 0x10) &&
			LD_ReadReg(0xb2)==0x21 && 
			LD_ReadReg(0xbf)==0x35)
		{
            
			nAsrResCount = LD_ReadReg(0xba);
			if(nAsrResCount>0 && nAsrResCount<4) 
			{
                             
				nAsrStatus=LD_ASR_FOUNDOK;
			}
			else
		        {
                              
				nAsrStatus=LD_ASR_FOUNDZERO;
			}	
		}
		else
		{
			nAsrStatus=LD_ASR_FOUNDZERO;
		}
			
		LD_WriteReg(0x2b, 0);
    	        LD_WriteReg(0x1C,0);

		return;
	}
	
	delay(10);
	//detachInterrupt(1); 
}

unsigned char ASRBClass::LD_Check_ASRBusyFlag_b2()
{ 
	uint8 j;
	uint8 flag = 0;
	for (j=0; j<10; j++)
	{
		if (LD_ReadReg(0xb2) == 0x21)
		{
			flag = 1;
			break;
		}
		delay(10);		
	}
	return flag;
}

void ASRBClass::LD_AsrStart()
{
	LD_Init_ASR();

}

unsigned char ASRBClass::LD_AsrRun()
{
	//LD_WriteReg(0x35, MIC_VOL);
       sensitivity();

	LD_WriteReg(0x1c, 0x09);

	//LD_WriteReg(0xbd, 0x20);
	LD_WriteReg(0x08, 0x01);
	delay( 1);
	LD_WriteReg(0x08, 0x00);
	delay( 1);
	if(LD_Check_ASRBusyFlag_b2() == 0)
	{
		return 0;
	}

	LD_WriteReg(0xb2, 0xff);
       LD_WriteReg(0x37, 0x06);
	LD_WriteReg(0x37, 0x06);
	delay( 5 );
       //Serial.println( LD_ReadReg(0xbf),BYTE);//
       LD_WriteReg(0x1c, 0x0b);
	LD_WriteReg(0x29, 0x10);
	//LD_WriteReg(0xbd, 0x00);
	//detachInterrupt(1) ;
	return 1;
}

unsigned char ASRBClass::RunASR(int x,int y,char (*p)[38])
{
	int i=0;
	int ASRflag=0;
	for (i=0; i<5; i++)			//	防止由于硬件原因导致LD3320芯片工作不正常，所以一共尝试5次启动ASR识别流程
	{ 
		LD_AsrStart();


		delay(100);
              if (LD_AsrAddFixed(x,y,p)==0)
		{
		      LD_reset();			//	LD3320芯片内部出现不正常，立即重启LD3320芯片
		      delay(100);			//	并从初始化开始重新ASR识别流程
		      continue;	
		}
		delay(10);
		if (LD_AsrRun() == 0)
		{ 
			LD_reset();			//	LD3320芯片内部出现不正常，立即重启LD3320芯片
			delay(100);			//	并从初始化开始重新ASR识别流程
                    continue;
		}

		ASRflag=1;  
		break;					//	ASR流程启动成功，退出当前for循环。开始等待LD3320送出的中断信号
	}
	return ASRflag;
}

unsigned char ASRBClass::LD_AsrAddFixed(int x,int y,char (*p)[38])
{
  int k,flag;
  int nAsrAddLength;

	flag = 1;
	for (k=0; k<dig; k++)
	{	
		if(LD_Check_ASRBusyFlag_b2() == 0)
		{
			flag = 0;
			break;
		}
		
		LD_WriteReg(0xc1, k);
		LD_WriteReg(0xc3, 0 );
		LD_WriteReg(0x08, 0x04);
  
		delay(1);
		LD_WriteReg(0x08, 0x00);
		delay(1);

		for (nAsrAddLength=0; nAsrAddLength<y; nAsrAddLength++)
		{
			if (p[k][nAsrAddLength] == 0)
				break;
			LD_WriteReg(0x5, p[k][nAsrAddLength]); 
		}
		LD_WriteReg(0xb9, nAsrAddLength);
		LD_WriteReg(0xb2, 0xff);
              LD_WriteReg(0x37, 0x04);
		LD_WriteReg(0x37, 0x04);
	} 
    return flag;
}

unsigned char ASRBClass::LD_GetResult()
{ 
	return LD_ReadReg(0xc5 );
}

void ASRBClass::send_SD(int addr)
{
int data1 = (addr/100)+0x30;
int data2 = (addr/10%10)+0x30;
int data3 = (addr%10)+0x30;
uint8_t stop[] = {0x7e,0x03,0xab,0xae,0xef};
uint8_t buffer[] = {0x7e,0x07,0xa3,0x30,data1,data2,data3,byte(0x07+0xa3+0x30+data1+data2+data3),0xef}; 
mySerial.write(stop,5);
delay(50);
mySerial.write(buffer,9);
}


int ASRBClass::Asr(int x,int y,char  (*p)[38],unsigned int  dd[],int set)
{

	int z;
	switch(nAsrStatus)
		{
			case LD_ASR_RUNING: 
			case LD_ASR_ERROR:		
				break;
			case LD_ASR_NONE:
			{
				nAsrStatus=LD_ASR_RUNING;
           if (RunASR(x,y,p)==0)
				{
					nAsrStatus= LD_ASR_ERROR;
                                   // Serial.println( "ASR_ERROR");// 
				}
		   else
               digitalWrite(ASRLED, HIGH); 
                            //  Serial.println( "ASR_RUNING....");//
				break;
			}
			case LD_ASR_FOUNDOK:
			{
				nAsrRes =LD_GetResult();//	一次ASR识别流程结束，去取ASR识别结果	
                 z=finally(nAsrRes,p,dd,set); 
				nAsrStatus = LD_ASR_NONE;
 digitalWrite(ASRLED, LOW); 
				break;
			}
			case LD_ASR_FOUNDZERO:
			default:
			{
				
				nAsrStatus = LD_ASR_NONE;
 digitalWrite(ASRLED, LOW); 
				break;
			}
	         
	}// switc
    return z;
}

int ASRBClass::finally (int n,char  (*p)[38],unsigned int dd[],int tt)
{
	int t=0;
	int y1=254;
	int y2=252;
	int y3=253;
	if(tt==0)
	{
        if(n>=0)
		{
	     	Serial.println( dd[n]);
    t=dd[n];
   send_SD(t); 
return t;
		}
		
	

    else
 	     Serial.println( "error");

	}
	else if(n==2)
		return y1;
	else if(n==0) return y2;
	else if(n==1) return y3;
	

}


/*************************************************************************************************
请勿随意修改以上的程序，如需修改需对照LD3320数据手册进行修改；
**************************************************************************************************/




/*******************************读关键词*******************************************/

void ASRBClass::eeprom_read(int nn,char  (*p)[38],unsigned int dd[])//读eeprom，地址0用来存放最后一个数据+1的地址值
{
unsigned char value[43];
int address =6;
int i,j;
int t=3;
for(j=3;j<nn;j++)//从数组sRecog的第三行开始
{  
   for(i=0;i<43;i++)
     {   
       value[i] = EEPROM.read(address); 
       address = address + 1;   
       if(value[i]==0x2c){ dd[t++]=value[i-1]; p[j][i] =0; j--;break;}////判断逗号，是则将接收的前一个数放入音频文件名的数组fDigit
       else if(value[i]==0x0d) break;
       else if(value[i]==0) break; //注：此判断0为无数据后跳出，因此如果是从未将eeprom清零过或从未使用过则须清零，因为在默认情况下是255                
       else  p[j][i] =value[i];
       delay(10);
     }
   if(value[i]==0) {break;} 
 }
dig=t;   

}

/*******************************添加关键词*****************************************/

void ASRBClass::eeprom_write(int nn)//写eeprom
{
int addr;
int pp,kk;
char local[43]={0};
int t=0,r=0;
   pp=EEPROM.read(0);//读地址0
   kk=EEPROM.read(1);
   pp=pp+kk;
  if(dig<nn&&pp<500)
    { 
      if(pp==0)  addr=6;   //判断以用的地址值 
      else       addr=pp;   
     for(int j=0;j<43;j++)
      {
        local[j]= Serial.read();   
        if((local[j])==0x0a)  //判断回车
          {
           if((local[j-1])==0x0d)    
            r=j;  
            break;           
           }
           if(j==42) Serial.println("Key words too long");
         delay(10);
       }    
     for(int i=0;i<3;i++)//取音频文件名
      {   
       if(local[3]==0x2c)   t=t*10+local[i]-48;
       else Serial.println("error");
       }
     if(t>0&&255>t)
      {   
       EEPROM.write(addr,t);//写音频文件名
       addr = addr + 1;
       for(int k=3;k<r;k++)
        { 
          EEPROM.write(addr,local[k]);//写关键字
          addr = addr + 1;
          delay(10);
         }
         pp=addr; 
       if(pp>255)
        {
          kk=pp-255;
         EEPROM.write(0,255);
         EEPROM.write(1,kk);
         }
        else  EEPROM.write(0,pp);//将最后地址值写入地址0
       }
     else Serial.println("error");
     }
   else 
      Serial.println("Memory full");
      while(1)
      {
      if (Serial.available()<=0) break;
       int hh= Serial.read(); 
       }
}

/*******************************显示键词*******************************************/

void ASRBClass::display_kw(unsigned int dd[], char (*p)[38] ,int nn)
{
int i;
for(i=0;i<nn;i++) 
 { 
   if(dd[i]==0) break;
   Serial.print(i);
   Serial.print("\t");
   Serial.print(dd[i]);
   Serial.print("\t");
   Serial.println(p[i]);
 } 
}

/*******************************擦除关键词*****************************************/

void ASRBClass::clear_kw(unsigned int dd[],char pp[][38],int nn)
{
  int i,j,n;
 dig=3;
  EEPROM.write(0, 0);
  EEPROM.write(1, 0);
  for (i=6;i<512;i++)
  EEPROM.write(i, 0);
  for(j=3;j<nn;j++)
   {
     dd[j]=0;
      for(n=0;n<38;n++)
     pp[j][n]=0;
   }
}


/*******************************播放SD卡音频文件***********************************/

void ASRBClass::play(int x,int y,char  (*p)[38],unsigned int dd[],int set)
{          
   set=1;
   int r=0;
   char local[20]={0};
 for(int j=0;j<20;j++)
  {    
    local[j]= Serial.read();      
    if((local[j])==0x0a)  //判断回车
      {
        if((local[j-1])==0x0d)
          {
            r=j-1;
             break;
           }
       }
   } 
  //Serial.println(""); 
  if(r==3)//判断是否为3位数
    { 
      int t=0;r=0;
      for(int i=0;i<3;i++)
      t=t*10+local[i]-48;
      Serial.print("Now Playing ...");
      Serial.println(t);                            
      send_SD(t);
      delay(50); 
      Busy_SD();
      for(int i=0;i<8;i++)    
	  { int q=Asr(x,y,p,dd,set);
	  if(q>0) {delay(50);break;}
	  // delay(10);
	  }
     }
  else Serial.println("error"); 
  delay(50);
  set=0;
}


/*******************************MIC灵敏度设置**************************************/

void ASRBClass::MS()
{
int t=0;
int z=0;
char local[6]={0};
for(int j=0;j<6;j++)
 {
   local[j]= Serial.read();      
   if((local[j])==0x0a)  //判断回车
     {
       if((local[j-1])==0x0d)    
        { 
          z=j-1;                            
           break;
         }           
      }
   delay(10);
  } 
for(int i=0;i<z;i++)
  {            
    t=t*10+local[i]-48;                         
  }
 if(t<=127&&t>=0)
 EEPROM.write(2,t);
 else Serial.println("error"); 
}

/*******************************触发模式设置***************************************/

int ASRBClass::TM()
{
  char local[6]={0};
 for(int j=0;j<6;j++)
  {
    local[j]= Serial.read();      
    if((local[j])==0x0a)  //判断回车
      {
        if((local[j-1])==0x0d)                                         
          break;           
       }
    delay(10);
   } 
  if(local[0]==0x43&&local[1]==0x54) 
   {
     vall=0;
 EEPROM.write(4,vall);
	 send_SD(256);
     delay(50);
     Busy_SD();
    }//CT
   if(local[0]==0x50&&local[1]==0x54)
    {  
      vall=111;
 EEPROM.write(4,vall);
      send_SD(257);
      delay(50);
      Busy_SD();
     }//PT
   else 
       if(local[0]==0x42&&local[1]==0x54)
        {
          vall=112;
EEPROM.write(4,vall);
        send_SD(258);
          delay(50);
          Busy_SD();
         }//BT
	  // return vall;
}



/*******************************波特率设置*****************************************/

void ASRBClass::BAUD()
{  
unsigned long v=0;
int uu=0;
 char local[20]={0};
for(int j=0;j<20;j++)
  {    
   local[j]= Serial.read();    
   if((local[j])==0x0a)  //判断回车
     {
       if((local[j-1])==0x0d)
         {
           uu=j-1;
           break;
          }
      }
    }
 for(int i=0;i<uu;i++)
  v=v*10+local[i]-48;  
  
 if(v==2400)
 {  EEPROM.write(5,1);
    Serial.println("OK");
    Serial.end();
    delay(5);
    Serial.begin(2400);
    delay(1000);     
   }
 else if(v==4800)
 {   EEPROM.write(5,2);
     Serial.println("OK");
     Serial.end();
     delay(5);
     Serial.begin(4800);
     delay(1000); 
    }
 else if(v==9600)
   {EEPROM.write(5,3);
     Serial.println("OK");
     Serial.end();
     delay(5);
     Serial.begin(9600);
     delay(1000); 
    }
  else if(v==19200)
    {EEPROM.write(5,4);
      Serial.println("OK");
      Serial.end();
      delay(5);
      Serial.begin(19200);
      delay(1000); 
     }
  else if(v==38400)
     {EEPROM.write(5,5);
       Serial.println("OK");
       Serial.end();
       delay(5);
       Serial.begin(38400);
       delay(1000); 
      }
  else if(v==115200)
      {EEPROM.write(5,6);
        Serial.println("OK");
        Serial.end();
        delay(5);
        Serial.begin(115200);
        delay(1000); 
       }
  else Serial.println( "error");     
}

/*******************************播放语音是否关闭ASR********************************/

void ASRBClass::ASRIN()
{
  char local[4]={0};
  for(int j=0;j<4;j++)
   {
     local[j]= Serial.read();      
     if((local[j])==0x0a)  //判断回车
       {
         if((local[j-1])==0x0d) break;           
       }
      delay(10);
   }                       
EEPROM.write(3,local[0]); 
}

/*******************************模拟LED********************************************/

void ASRBClass::LED(int x,int y,char  (*p)[38],unsigned int dd[],int set)
{
  int j;
                        while(1)
                         {  
                           
                           set=1;
                            j=Asr(x,y,p,dd,set);
                            delay(5);
                            if(j==252)  
							{   
								send_SD(252);
                                Serial.println("AT+LED=1");
                                Serial.println("OK");
							}

                            if(j==253)  
							{     
								send_SD(253);
                                Serial.println("AT+LED=0");
                               Serial.println("OK");
							}
                            
                            Busy_SD();
                            if (Serial.available() > 0) {set=0; break;}                           
                          }
}

/*******************************模拟MP3********************************************/

void  ASRBClass::Analog_MP3(char (*p)[38],unsigned int dd[])
{
 char local[45]={0};
 char CH[4][7]={"return","play","next","last"};
 int k,t;
  anal=0;
  while(1)
  {   
    if (Serial.available() > 0) 
     { 
        local[0]= Serial.read();  
        delay(20);
        if(local[0]!=0x41)    
              {
                 for(int j=1;j<10;j++)
                   {    
                      local[j]= Serial.read();  
                       if((local[j])==0x0a)  //判断回车
                        {
                         if((local[j-1])==0x0d)
                             { 
                               local[j]=0;
                               local[j-1]=0;
                               for(k=0;k<4;k++)
                                {        
                                  if(strcmp(local,CH[k])==0) //AT命令比较
                                      Compare(k,p,dd);
	
                                 }
                                break;
                               }
                          }
                     }
                }
              else break;        
        }
    }     
}

void  ASRBClass::Compare(int g,char (*p)[38],unsigned int dd[])
{
switch(g)
 {
  case 0: 
             anal=0;
             Serial.println("OK");
             break;
  case 1:
             mp3(p,dd);
             break; 
  case 2:  
            if(anal<dig) 
            {   
              send_SD(dd[anal]);//播放SD
              Serial.println(p[anal]);
              delay(50);
              Busy_SD();
              Serial.println("OK");
              anal++;
             }
            break;
  case 3:
            if(anal!=0)
            { 
				--anal;
               send_SD(dd[anal]);
               Serial.println(p[anal]);
               delay(50);
               Busy_SD();
               Serial.println("OK");
            }
            break;
  default:
             Serial.println( "error");    
 }
}

void  ASRBClass::mp3(char (*p)[38],unsigned int dd[])
{
   int k;
   for(int i=0;i<dig;i++)   
    {  
      send_SD(dd[i]);    
      Serial.println(p[i]);
      delay(50);
      Busy_SD();
      delay(50);
      if (Serial.available() > 0) break;     
      }
     Serial.println("OK");
}

/****************************SD忙位控制********************************************/

void ASRBClass::Busy_SD()
{ 
int v=0;
v= EEPROM.read(3); 
 if(v==48) 
 {	
	while(digitalRead(BLED));//{delay(10);}
 }
}



int ASRBClass::choose(int n,int x,int y,char  (*p)[38],unsigned int dd[],int set)
{  
  switch(n)
    {
            case 0: //添加关键词
                       eeprom_write(x);  
                       delay(10);
                       eeprom_read(x,p,dd); 
                       Serial.println("OK");
                       delay(100);
                       break;                    
            case 1: //查询关键词
                       display_kw(dd,p,x);                    
                       Serial.println("OK");
                       break;           
            case 2: //播放SD卡音频文件
                       play(x,y,p,dd,set);
                       Serial.println("OK");
                       break;
            case  3: //波特率设置
                       BAUD();
                       delay(5000);
                       break;
            case  4: //擦除关键词
                       clear_kw(dd,p,x);               
                       Serial.println("OK");
                       break;
            case  5: //模拟LED
                        Serial.println("LED");
                        LED(x,y,p,dd,set);
                        Serial.println("OK");
                        break;
            case  6: //模拟MP3
				         
                        Serial.println("MP3");
                        Analog_MP3(p,dd);
                        Serial.println("OK"); 
                        break;
           case  7: //MIC灵敏度设置
                        MS();
                        Serial.println("OK");
                        break;
           case 8:  //播放语音是否关闭ASR
                        ASRIN();
                        Serial.println("OK");
                        break;                                      
           case 9: //触发模式设置
                        ASRB.TM();
                        Serial.println("OK");
                        break;
         default:
                         Serial.println( "error");
      }
}



int ASRBClass::AT_command(int x,int y,char  (*p)[38],unsigned int dd[],int set)        
{    char const local1[10][10]={ "AT+KW=","AT+KW?","AT+PLAY=","AT+BAUD=","AT+ERASE",
                      "AT+LED","AT+MP3", "AT+MS=","AT+ASR=","AT+TM="};
  char total[13]={0};
 if (Serial.available() > 0) 
  {   
     int i,k;
     delay(500);
     total[0]= Serial.read(); 
     delay(20);
     if(total[0]==0x41)//判断第一个数是否为A 是则继续接收串口数据
      { 
        for(i=1;i<12;i++)
         {
          total[i]= Serial.read(); 
         if(total[i]==0x3D) //判断AT命令等号1
             {  
              for(k=0;k<14;k++)
                {        
                  if(strcmp(total,local1[k])==0) //AT命令比较
                    choose(k,x,y,p,dd,set);    
				 
                 }
              break;    
               }
          else 
             if((total[i])==0x0a)  //AT命令无等号时判断回车
              { 
                if((total[i-1])==0x0d)    
                  {  
                     total[i]=0;
                     total[i-1]=0;
                    for(k=0;k<14;k++)
                     {                 
                       if(strcmp(total,local1[k])==0)
                      choose(k,x,y,p,dd,set);   
					  //return vall;
                      
                      }
                   }  
                  break;     
               }  
           }
         }
      else  
          if(total[0]==0x54) 
           {        
                total[1]=total[0];
                total[0]=0x41;
            for(i=2;i<12;i++)
              {
                total[i]= Serial.read(); 
                if(total[i]==0x3D) //判断AT命令等号
                 {  
                   for(k=0;k<14;k++)
                     {        
                       if(strcmp(total,local1[k])==0) //AT命令比较
                       choose(k,x,y,p,dd,set);  
					   //return vall;
                      }
                  break;    
                 }
                 else 
                     if((total[i])==0x0a)  //AT命令无等号时判断回车
                      { 
                        if((total[i-1])==0x0d)    
                          {
                            total[i]=0;
                            total[i-1]=0;
                            for(k=0;k<14;k++)
                             {                 
                              if(strcmp(total,local1[k])==0)
                              choose(k,x,y,p,dd,set);   
							  //return vall;
                              }
                           }  
                       break;     
                       }  
                 }
                }
     }
 return vall;
}