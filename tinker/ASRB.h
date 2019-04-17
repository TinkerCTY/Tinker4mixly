/*语音识别库文件

  版本：3.0

  board:Arduino leonardo

  公司：成都极趣科技有限公司

  网站：http://dfrobot.taobao.com/ 
*/
#ifndef ASRB_H
#define ASRB_H
//#include "utility/PinMap.h"
#include <EEPROM.h>
#include <SPI.h>
#include <SoftwareSerial.h>
#include <Arduino.h>

#define uint8 unsigned char
#define uint16 unsigned int
#define uint32 unsigned long
#define LD_MODE_IDLE		0x00
#define LD_MODE_ASR_RUN		0x08
#define LD_ASR_NONE	    	0x00	//	表示没有在作ASR识别
#define LD_ASR_RUNING		0x01	//	表示LD3320正在作ASR识别中
#define LD_ASR_FOUNDOK		0x10	//	表示一次识别流程结束后，有一个识别结果
#define LD_ASR_FOUNDZERO 	0x11	//	表示一次识别流程结束后，没有识别结果
#define LD_ASR_ERROR	 	0x31	//	表示一次识别流程中LD3320芯片内部出现不正确的状态
#define CLK_IN   	     	24
#define LD_PLL_11		(uint8)((CLK_IN/2.0)-1)
#define LD_PLL_MP3_19	0x0f
#define LD_PLL_MP3_1B	0x10
#define LD_PLL_MP3_1D   (uint8)(((90.0*((LD_PLL_11)+1))/(CLK_IN))-1)
#define LD_PLL_ASR_19 	(uint8)(CLK_IN*32.0/(LD_PLL_11+1) - 0.51)
#define LD_PLL_ASR_1B 	0x48
#define LD_PLL_ASR_1D 	0x1f
#define RESUM_OF_MUSIC	0x01
#define MASK_INT_SYNC	0x10
#define MASK_INT_FIFO	0x04
#define MASK_AFIFO_INT	0x01
#define MASK_FIFO_STATUS_AFULL		0x08 	 
//#define MIC_VOL                 	0x55	
extern uint8  nAsrStatus;
extern int button;
extern int vall;
const int LEDA=8; 

#define SS 10
#define MOSI 16
#define MISO 14   
#define SCK 15 
#define RSTB 9


#define MP3_RXD 11
#define MP3_TXD 12
#define RST A4 
#define BLED 8  
#define ASRLED 13



class ASRBClass {

public:
	int vall;
  int Initialise(int nn,char  (*p)[38],unsigned int dd[]);
  void LD_WriteReg(unsigned char address,unsigned char value);
  unsigned char LD_ReadReg(unsigned char address);
  void LD_reset();
  void LD_Init_Common();
  void sensitivity();
  void MIC_input();
  void LD_Init_ASR();
  void ProcessInt0();
  unsigned char LD_Check_ASRBusyFlag_b2();
  void LD_AsrStart();
  unsigned char LD_AsrRun();
  unsigned char RunASR(int x,int y,char  (*p)[38]);
  unsigned char LD_AsrAddFixed( int x,int y,char  (*p)[38]);
  unsigned char LD_GetResult();
  void send_SD(int addr);
  int Asr(int x,int y,char  (*p)[38],unsigned int dd[],int set);
  int finally (int n,char  (*p)[38],unsigned int dd[],int tt);
/***********************************************************************************/
  void LED(int x,int y,char  (*p)[38],unsigned int dd[],int set);
  void ASRIN();
  void BAUD();
  int  TM();
  void Busy_SD();
  void MS();
  void play(int x,int y,char  (*p)[38],unsigned int dd[],int set);
  void Compare(int g,char (*p)[38],unsigned int dd[]);
  void mp3(char (*p)[38],unsigned int dd[]);
  void Analog_MP3(char (*p)[38],unsigned int dd[]);
  void clear_kw(unsigned int dd[],char pp[][38],int nn);
  void display_kw(unsigned int dd[], char (*p)[38] ,int nn);
  void eeprom_write(int nn);
  void eeprom_read(int nn,char  (*p)[38],unsigned int dd[]);
  int choose(int n,int x,int y,char  (*p)[38],unsigned int dd[],int set);
  int AT_command(int x,int y,char  (*p)[38],unsigned int dd[],int set); 
private:

  uint8_t chipSelectPin_;
  void chipSelectHigh(void);
  void chipSelectLow(void);
  unsigned char address_;
  unsigned char value_;
  int RSTB_;
  uint8  nLD_Mode;
  unsigned char I;
  uint8  ucRegVal;
  unsigned char result;
  uint8 nAsrRes;
  uint8  nAsrStatus;
  int dig;
  int set;
  int anal;

};

extern ASRBClass ASRB;

#endif
