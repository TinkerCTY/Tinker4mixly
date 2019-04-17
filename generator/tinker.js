'use strict';

goog.provide('Blockly.Arduino.tinker');
goog.require('Blockly.Arduino');


/********************************************
*****           显示器部分               *****
********************************************/
Blockly.Arduino.tinker_led = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_stat = this.getTitleValue('STAT');
  Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n'
  return code;
};

Blockly.Arduino.tinker_pwm_led = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'analogWrite(' + dropdown_pin + ',' + value_num + ');\n';
    return code;
};

// RGB灯新版
Blockly.Arduino.tinker_rgb2=function(){
   var dropdown_pin_r = Blockly.Arduino.valueToCode(this, 'PIN_R', Blockly.Arduino.ORDER_ATOMIC);
   var dropdown_pin_g = Blockly.Arduino.valueToCode(this, 'PIN_G', Blockly.Arduino.ORDER_ATOMIC);
   var dropdown_pin_b = Blockly.Arduino.valueToCode(this, 'PIN_B', Blockly.Arduino.ORDER_ATOMIC);
   var RGB_R = 255 - Blockly.Arduino.valueToCode(this, 'RGB_R',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var RGB_G = 255 - Blockly.Arduino.valueToCode(this, 'RGB_G',Blockly.Arduino.ORDER_ASSIGNMENT) || '0'; 
   var RGB_B = 255 - Blockly.Arduino.valueToCode(this, 'RGB_B',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var code = 'analogWrite(' + dropdown_pin_r + ',' + RGB_R + ');\n';
        code += 'analogWrite(' + dropdown_pin_g + ',' + RGB_G + ');\n';
        code += 'analogWrite(' + dropdown_pin_b + ',' + RGB_B + ');\n';
   return code;
};


// WS2812新版
  Blockly.Arduino.display_rgb_init=function(){
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var value_ledcount = Blockly.Arduino.valueToCode(this, 'LEDCOUNT', Blockly.Arduino.ORDER_ATOMIC);
    var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness',Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(' + value_ledcount + ','+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
    Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\nrgb_display_' + dropdown_rgbpin + '.setBrightness('+Brightness+');';
    return '';
  };

// 新增亮度
  Blockly.Arduino.display_rgb_brightness=function(){
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var Brightness2 = Blockly.Arduino.valueToCode(this, 'Brightness2',Blockly.Arduino.ORDER_ATOMIC);
    // Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    // Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(' + value_ledcount + ','+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
    // Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\nrgb_display_' + dropdown_rgbpin + '.setBrightness('+Brightness+');';
    var code = 'rgb_display_' + dropdown_rgbpin + '.setBrightness('+Brightness2+');\n'
    return code;
  };

  Blockly.Arduino.display_rgb=function(){
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
    var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
    var value_rvalue = Blockly.Arduino.valueToCode(this, 'RVALUE', Blockly.Arduino.ORDER_ATOMIC);
    var value_gvalue = Blockly.Arduino.valueToCode(this, 'GVALUE', Blockly.Arduino.ORDER_ATOMIC);
    var value_bvalue = Blockly.Arduino.valueToCode(this, 'BVALUE', Blockly.Arduino.ORDER_ATOMIC);
    var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness',Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
      Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(4,'+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
      Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
    }
    var code = 'rgb_display_'+dropdown_rgbpin+'.setPixelColor('+value_led+'-1, '+'rgb_display_' + dropdown_rgbpin+'.Color('+value_rvalue+','+value_gvalue+','+value_bvalue+'));\n';
    code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
    return code;
  };

  Blockly.Arduino.display_rgb2=function(){
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
    var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
    var colour_rgb_led_color = this.getFieldValue('RGB_LED_COLOR');
    var color = goog.color.hexToRgb(colour_rgb_led_color);
    
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
      Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(4,'+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
      Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\n';
    }
    var code = 'rgb_display_'+dropdown_rgbpin+'.setPixelColor('+value_led+'-1, '+color+');\n';
    code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
    return code;
  };
  //彩虹1
  Blockly.Arduino.display_rgb_rainbow1=function(){
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
    var wait_time = Blockly.Arduino.valueToCode(this, 'WAIT',Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
   if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
    Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(4,'+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
    Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\n';
    }
    var funcName2 = 'Wheel';
    var code2  = 'uint32_t Wheel(byte WheelPos) {\n';
    code2 += 'if(WheelPos < 85) \n{\nreturn rgb_display_'+dropdown_rgbpin+'.Color(WheelPos * 3, 255 - WheelPos * 3, 0);\n} \n';
    code2 += 'else if(WheelPos < 170) \n{\nWheelPos -= 85; \nreturn rgb_display_'+dropdown_rgbpin+'.Color(255 - WheelPos * 3, 0, WheelPos * 3);\n}\n ';
    code2 += 'else\n {\nWheelPos -= 170;\nreturn rgb_display_'+dropdown_rgbpin+'.Color(0, WheelPos * 3, 255 - WheelPos * 3);\n}\n';
    code2 += '}\n';
    Blockly.Arduino.definitions_[funcName2] = code2;
    var funcName3 = 'rainbow';
    var code3  = 'void rainbow(uint8_t wait) {\n uint16_t i, j;\n';
    code3 += 'for(j=0; j<256; j++) {\n';
    code3 += 'for(i=0; i<rgb_display_'+dropdown_rgbpin+'.numPixels(); i++)\n {\n';
    code3 += 'rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, Wheel((i+j) & 255));\n}\n';                    
    code3 += 'rgb_display_'+dropdown_rgbpin+'.show();\n';
    code3 += 'delay(wait);\n}\n}\n';
    Blockly.Arduino.definitions_[funcName3] = code3;
    var code = 'rainbow('+ wait_time+');\n'
    return code;
    };
  //彩虹2
  Blockly.Arduino.display_rgb_rainbow2=function(){
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
    var wait_time = Blockly.Arduino.valueToCode(this, 'WAIT',Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
      Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(4,'+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
      Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\n';
    }
    var funcName2 = 'Wheel';
    var code2  = 'uint32_t Wheel(byte WheelPos) {\n';
    code2 += 'if(WheelPos < 85)\n {\nreturn rgb_display_'+dropdown_rgbpin+'.Color(WheelPos * 3, 255 - WheelPos * 3, 0);} \n';
    code2 += 'else if(WheelPos < 170)\n {\nWheelPos -= 85; return rgb_display_'+dropdown_rgbpin+'.Color(255 - WheelPos * 3, 0, WheelPos * 3);}\n ';
    code2 += 'else {\nWheelPos -= 170;return rgb_display_'+dropdown_rgbpin+'.Color(0, WheelPos * 3, 255 - WheelPos * 3);}\n';
    code2 += '}\n';
    Blockly.Arduino.definitions_[funcName2] = code2;
    var funcName3 = 'rainbow';
    var code3  = 'void rainbow(uint8_t wait) { uint16_t i, j;\n';
    code3 += 'for(j=0; j<256; j++) {               \n';
    code3 += 'for(i=0; i<rgb_display_'+dropdown_rgbpin+'.numPixels(); i++)\n{\n';
    code3 += 'rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, Wheel((i+j) & 255));\n}\n';                    
    code3 += 'rgb_display_'+dropdown_rgbpin+'.show();\n';
    code3 += 'delay(wait);\n}\n}\n';
    Blockly.Arduino.definitions_[funcName3] = code3;
    var funcName4 = 'rainbowCycle';
    var code4  = 'void rainbowCycle(uint8_t wait) \n{\nuint16_t i, j;\n';
    code4 += 'for(j=0; j<256*5; j++) {\n';
    code4 += 'for(i=0; i< rgb_display_'+dropdown_rgbpin+'.numPixels(); i++) \n{\n';
    code4 += 'rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, Wheel(((i * 256 / rgb_display_'+dropdown_rgbpin+'.numPixels()) + j) & 255));}\n';
    code4 += 'rgb_display_'+dropdown_rgbpin+'.show();\n';
    code4 += 'delay(wait);\n}\n}\n';
    Blockly.Arduino.definitions_[funcName4] = code4;
    var code = 'rainbowCycle('+ wait_time+');\n'
    return code;
  };
  //彩虹3
  Blockly.Arduino.display_rgb_rainbow3=function(){
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
    var rainbow_color = Blockly.Arduino.valueToCode(this, 'rainbow_color',Blockly.Arduino.ORDER_ATOMIC);
    var type = this.getFieldValue('TYPE');
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
      Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(4,'+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
      Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\n';
    }
    var funcName2 = 'Wheel';
    var code2  = 'uint32_t Wheel(byte WheelPos) {\n';
    code2 += 'if(WheelPos < 85)\n {\nreturn rgb_display_'+dropdown_rgbpin+'.Color(WheelPos * 3, 255 - WheelPos * 3, 0);} \n';
    code2 += 'else if(WheelPos < 170)\n {\nWheelPos -= 85; return rgb_display_'+dropdown_rgbpin+'.Color(255 - WheelPos * 3, 0, WheelPos * 3);}\n ';
    code2 += 'else {\nWheelPos -= 170;return rgb_display_'+dropdown_rgbpin+'.Color(0, WheelPos * 3, 255 - WheelPos * 3);}\n';
    code2 += '}\n';
    Blockly.Arduino.definitions_[funcName2] = code2;
    if(type=="normal")
     var code3  = 'for (int i = 0; i < rgb_display_' + dropdown_rgbpin + '.numPixels(); i++)\n{rgb_display_' + dropdown_rgbpin + '.setPixelColor(i, Wheel('+rainbow_color+' & 255));\n}\nrgb_display_' + dropdown_rgbpin + '.show();\n';
   else 
     var code3  = 'for (int i = 0; i < rgb_display_' + dropdown_rgbpin + '.numPixels(); i++)\n {rgb_display_' + dropdown_rgbpin + '.setPixelColor(i, Wheel(((i * 256 / rgb_display_' + dropdown_rgbpin + '.numPixels()) + '+rainbow_color+') & 255));\n}\nrgb_display_' + dropdown_rgbpin + '.show();\n';
   
   return code3;
  };


/********************************************
*****           执行器部分               *****
********************************************/
Blockly.Arduino.tinker_motor=function(){
   var dropdown_pin = this.getTitleValue('PIN');
   var speed = Blockly.Arduino.valueToCode(this, 'speed',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var code='setMotor('+dropdown_pin+', '+speed+');\n';
   Blockly.Arduino.setups_['setup_output_4'] = 'pinMode(4, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_5'] = 'pinMode(5, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_6'] = 'pinMode(6, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_7'] = 'pinMode(7, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_w4'] = 'digitalWrite(4, LOW);';
   Blockly.Arduino.setups_['setup_output_w5'] = 'digitalWrite(5, LOW);';
   Blockly.Arduino.setups_['setup_output_w6'] = 'digitalWrite(6, LOW);';
   Blockly.Arduino.setups_['setup_output_w7'] = 'digitalWrite(7, LOW);';
   var funcName='setMotor';
   var code2='void '+funcName+'(int motorId, int speed) {\n' 
    + '  int speedPin, directionPin;\n'
    + '  if (motorId == 1){\n'
    + '   speedPin = 5;\n'
    + '   directionPin = 4;\n'
    + '  } else {\n'
    + '   if (motorId == 2){\n'
    + '     speedPin = 6;\n'
    + '     directionPin = 7;\n'
    + '   } else {\n'
    + '     return;\n'
    + '   }\n'
    + '  }\n'
    + '  if (speed == 0){\n'
    + '   digitalWrite(speedPin, LOW);\n'
    + '  }\n'
    + '  if (speed > 0){\n'
    + '   digitalWrite(directionPin, HIGH);\n'
    + '   analogWrite(speedPin, speed);\n'
    + '  } else {\n'
    + '   digitalWrite(directionPin, LOW);\n'
    + '   analogWrite(speedPin, -speed);\n'
    + '  }\n'
    + '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
   return code;
};

Blockly.Arduino.tinker_motor_stop=function(){
   var dropdown_pin = this.getTitleValue('PIN');
   var code='setMotor('+dropdown_pin+', 0);\n';
   Blockly.Arduino.setups_['setup_output_4'] = 'pinMode(4, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_5'] = 'pinMode(5, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_6'] = 'pinMode(6, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_7'] = 'pinMode(7, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_w4'] = 'digitalWrite(4, LOW);';
   Blockly.Arduino.setups_['setup_output_w5'] = 'digitalWrite(5, LOW);';
   Blockly.Arduino.setups_['setup_output_w6'] = 'digitalWrite(6, LOW);';
   Blockly.Arduino.setups_['setup_output_w7'] = 'digitalWrite(7, LOW);';
   var funcName='setMotor';
   var code2='void '+funcName+'(int motorId, int speed) {\n' 
    + '  int speedPin, directionPin;\n'
    + '  if (motorId == 1){\n'
    + '   speedPin = 5;\n'
    + '   directionPin = 4;\n'
    + '  } else {\n'
    + '   if (motorId == 2){\n'
    + '     speedPin = 6;\n'
    + '     directionPin = 7;\n'
    + '   } else {\n'
    + '     return;\n'
    + '   }\n'
    + '  }\n'
    + '  if (speed == 0){\n'
    + '   digitalWrite(speedPin, LOW);\n'
    + '  }\n'
    + '  if (speed > 0){\n'
    + '   digitalWrite(directionPin, HIGH);\n'
    + '   analogWrite(speedPin, speed);\n'
    + '  } else {\n'
    + '   digitalWrite(directionPin, LOW);\n'
    + '   analogWrite(speedPin, -speed);\n'
    + '  }\n'
    + '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
   return code;
};

//执行器-电机转动
Blockly.Arduino.MAKER17_motorA = function() {
  var SPEED_PIN = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var DIR_PIN = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = 'setMotorA(' + SPEED_PIN + ', '+DIR_PIN+',' + speed + ');\n';
  Blockly.Arduino.setups_['setup_output_A_S'] = 'pinMode('+SPEED_PIN+', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_A_D'] = 'pinMode('+DIR_PIN+', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_A_S_W'] = 'digitalWrite('+SPEED_PIN+', LOW);';
  Blockly.Arduino.setups_['setup_output_A_D_W'] = 'digitalWrite('+DIR_PIN+', LOW);';
  var funcName = 'setMotorA';
  var code2 =' void setMotorA(int speedpin,int dirpin, int speed)\n {\nif (speed == 0)\n{\n   digitalWrite(speedpin, LOW);\n  } \n else if (speed > 0)\n{\n   digitalWrite(dirpin, LOW);\nanalogWrite(speedpin, speed);\n  } \nelse \n{\n digitalWrite(dirpin, HIGH);\n   analogWrite(speedpin, (0-speed));  \n}\n}\n';
  Blockly.Arduino.definitions_[funcName] = code2;
  return code;
};
Blockly.Arduino.MAKER17_motorB = function() {
  var SPEED_PIN = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var DIR_PIN = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = 'setMotorB(' + SPEED_PIN + ', '+DIR_PIN+',' + speed + ');\n';
  Blockly.Arduino.setups_['setup_output_B_S'] = 'pinMode('+SPEED_PIN+', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_B_D'] = 'pinMode('+DIR_PIN+', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_B_S_W'] = 'digitalWrite('+SPEED_PIN+', LOW);';
  Blockly.Arduino.setups_['setup_output_B_D_W'] = 'digitalWrite('+DIR_PIN+', LOW);';
  var funcName = 'setMotorB';
  var code2 =' void setMotorB(int speedpin,int dirpin, int speed)\n {\nif (speed == 0)\n{\n   digitalWrite(speedpin, LOW);\n  }\n else if (speed > 0)\n{\n   digitalWrite(dirpin, LOW);\nanalogWrite(speedpin, speed);\n  } \nelse \n{\n digitalWrite(dirpin, HIGH);\n   analogWrite(speedpin, (0-speed));  \n}\n}\n';
  Blockly.Arduino.definitions_[funcName] = code2;
  return code;
};

// 通用数字输出模块2-a部分:有源蜂鸣器|继电器|震动马达0111
Blockly.Arduino.inout_highlow9 = function () {
    // Boolean values HIGH and LOW.
    var code = (this.getFieldValue('BOOL') == 'HIGH') ? 'HIGH' : 'LOW';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 通用数字输出模块2-b部分:有源蜂鸣器|继电器|震动马达0111
Blockly.Arduino.tinker_buzzer = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_stat = Blockly.Arduino.valueToCode(this, 'STAT', Blockly.Arduino.ORDER_ATOMIC);
    var code = "";
    if (window.isNaN(dropdown_pin)) {
        code = code + 'pinMode(' + dropdown_pin + ', OUTPUT);\n';
    } else {
        if (Blockly.Arduino.setups_['setup_input_' + dropdown_pin])
            delete Blockly.Arduino.setups_['setup_input_' + dropdown_pin];
        Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';

    }
    code += 'digitalWrite(' + dropdown_pin + ',' + dropdown_stat + ');\n'
    return code;
};


/********************************************
*****           传感器部分               *****
********************************************/
Blockly.Arduino.tinker_btn = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 电位器
Blockly.Arduino.tinker_potentiometer = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 摇杆（模拟）
Blockly.Arduino.tinker_joystick_a = Blockly.Arduino.tinker_potentiometer;

// 三轴加速度
// Blockly.Arduino.tinker_accelerometer = Blockly.Arduino.tinker_potentiometer;


/********************************************
*****           小众模块部分              *****
********************************************/
  //红外接收模块更新
  Blockly.Arduino.yf_ir_recv = function() {
    var variable = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.definitions_['var_declare'+variable] = 'long '+variable+';';
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var branch2 = Blockly.Arduino.statementToCode(this, 'DO2');
    var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
    //Blockly.Arduino.definitions_['var_declare'+varName] = 'long '+varName+';\n';
    Blockly.Arduino.definitions_['var_ir_recv'+dropdown_pin] = 'IRrecv irrecv_'+dropdown_pin+'('+dropdown_pin+');\ndecode_results results_'+dropdown_pin+';\n';
    Blockly.Arduino.setups_['setup_ir_recv_'+dropdown_pin] = 'irrecv_'+dropdown_pin+'.enableIRIn();';
    var code="if (irrecv_"+dropdown_pin+".decode(&results_"+dropdown_pin+")) {\n"
    code += '  '+variable+'=results_'+dropdown_pin+'.value;\n';
    code += '  String type="UNKNOWN";\n';
    ////////////////////////////////////////////////////////////////
    code += '  String typelist[14]={"UNKNOWN", "NEC", "SONY", "RC5", "RC6", "DISH", "SHARP", "PANASONIC", "JVC", "SANYO", "MITSUBISHI", "SAMSUNG", "LG", "WHYNTER"};\n';
    code += '  if(results_'+dropdown_pin+'.decode_type>=1&&results_'+dropdown_pin+'.decode_type<=13){\n';
    code += '    type=typelist[results_'+dropdown_pin+'.decode_type];\n'
    code += '  }\n';
    code += '  Serial.print("IR TYPE:"+type+"  ");\n';
    code += branch;
    code +='  irrecv_'+dropdown_pin+'.resume();\n'
    code +='} else {\n';
    code +=branch2;
    code +='}\n';
    return code;
  };



  //红外接收模块
  // Blockly.Arduino.yf_ir_recv = function() {
  //   var variable = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  //   Blockly.Arduino.definitions_['var_declare'+variable] = 'long '+variable+';';
  //   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  //   var branch = Blockly.Arduino.statementToCode(this, 'DO');
  //   var branch2 = Blockly.Arduino.statementToCode(this, 'DO2');
  //   var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE);
  //   Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
  //   //Blockly.Arduino.definitions_['var_declare'+varName] = 'long '+varName+';\n';
  //   Blockly.Arduino.definitions_['var_ir_recv'+dropdown_pin] = 'IRrecv irrecv_'+dropdown_pin+'('+dropdown_pin+');\ndecode_results results_'+dropdown_pin+';\n';
  //   Blockly.Arduino.setups_['setup_ir_recv_'+dropdown_pin] = 'irrecv_'+dropdown_pin+'.enableIRIn();';
  //   var code="if (irrecv_"+dropdown_pin+".decode(&results_"+dropdown_pin+")) {\n"
  //   code += '  '+variable+'=results_'+dropdown_pin+'.value;\n';
  //   code += '  String type="UNKNOWN";\n';
  //   ////////////////////////////////////////////////////////////////
  //   code += '  String typelist[14]={"UNKNOWN", "NEC", "SONY", "RC5", "RC6", "DISH", "SHARP", "PANASONIC", "JVC", "SANYO", "MITSUBISHI", "SAMSUNG", "LG", "WHYNTER"};\n';
  //   code += '  if(results_'+dropdown_pin+'.decode_type>=1&&results_'+dropdown_pin+'.decode_type<=13){\n';
  //   code += '    type=typelist[results_'+dropdown_pin+'.decode_type];\n'
  //   code += '  }\n';
  //   code += '  Serial.print("IR TYPE:"+type+"  ");\n';
  //   code += branch;
  //   code +='  irrecv_'+dropdown_pin+'.resume();\n'
  //   code +='} else {\n';
  //   code +=branch2;
  //   code +='}\n';
  //   return code;
  // };

  //红外mini遥控器键值
  Blockly.Arduino.yf_ir_val = function() {
    var code = (this.getFieldValue('VAL'));
    var order = code < 0 ?
        Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
    return [code, order];
  };


/***************************MP3**********************************/
// MP3初始化
Blockly.Arduino.MP3_init = function () {
  var RX = Blockly.Arduino.valueToCode(this, 'RX', Blockly.Arduino.ORDER_ATOMIC);
  var TX = Blockly.Arduino.valueToCode(this, 'TX', Blockly.Arduino.ORDER_ATOMIC);
  // var RTCName = this.getFieldValue('RTCName');
  Blockly.Arduino.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['include_MP3'] = '#include <Mini_Mp3.h>';
  Blockly.Arduino.definitions_['var_MP3'] = 'SoftwareSerial ' + 'mp3Serial' + '(' + RX + ',' + TX + ');';
  Blockly.Arduino.setups_['MP3_setups'] = 'mp3Serial.begin(9600);\n'+'  mp3_set_serial(mp3Serial);\n';
  return "";
}



// MP3设置音量
Blockly.Arduino.MP3_volume = function() {
  var number_mp3_volume_value = Blockly.Arduino.valueToCode(this, 'mp3_set_volume',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '1';
  // Blockly.Arduino.definitions_['define_i2c'] = '#include \"SCoop.h\"';
  var code = 'mp3_set_volume('+number_mp3_volume_value+');\n';
  return code;
};

// MP3设置音质
Blockly.Arduino.MP3_EQ = function() {
  var number_mp3_eq_value = Blockly.Arduino.valueToCode(this, 'mp3_set_eq',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '1';
  // Blockly.Arduino.definitions_['define_i2c'] = '#include \"SCoop.h\"';
  var code = 'mp3_set_EQ('+number_mp3_eq_value+');\n';
  return code;
};

// MP3开始播放
Blockly.Arduino.MP3_start = function() {
  var code = 'mp3_play();\n';
  return code;
};

// 上一首
Blockly.Arduino.MP3_prev = function() {
  var code = 'mp3_prev();\n';
  return code;
};

// 下一首
Blockly.Arduino.MP3_next = function() {
  var code = 'mp3_next();\n';
  return code;
};

// 随机播放
Blockly.Arduino.MP3_random = function() {
  var code = 'mp3_random_play();\n';
  return code;
};

// 随机播放
// Blockly.Arduino.MP3_loop = function() {
//   var code = 'mp3_single_loop(1);\n';
//   return code;
// };


// MP3播放歌单
Blockly.Arduino.MP3_play = function() {
  var number_mp3_play_value = Blockly.Arduino.valueToCode(this, 'mp3_play',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '1';
  // Blockly.Arduino.definitions_['define_i2c'] = '#include \"SCoop.h\"';
  var code = 'mp3_play('+number_mp3_play_value+');\n';
  return code;
};

// MP3暂停播放
Blockly.Arduino.MP3_pause = function() {
  var code = 'mp3_pause();\n';
  return code;
};

// MP3播放结束
Blockly.Arduino.MP3_stop = function() {
  var code = 'mp3_stop();\n';
  return code;
};


/***************************多任务**********************************/
// 多任务
Blockly.Arduino['iscoop_task'] = function(block) {
  var text_iscoop_task_name = block.getFieldValue('ISCOOP_TASK_NAME');
  var statements_iscoop_task_statement = Blockly.Arduino.statementToCode(block, 'ISCOOP_TASK_STATEMENT');
  Blockly.Arduino.definitions_['define_i2c'] = '#include \"SCoop.h\"';
  var code = 'defineTaskLoop' +'('+text_iscoop_task_name + ') {\n' + statements_iscoop_task_statement + '}\n';
  Blockly.Arduino.definitions_[text_iscoop_task_name] = code;
  if(Blockly.Arduino.taskflag==false)
  {
    Blockly.Arduino.taskflag=true;
  }
  return '';
};

// 多任务延时
Blockly.Arduino['iscoop_delay'] = function(block) {
  var number_iscoop_delay_value = Blockly.Arduino.valueToCode(this, 'scoop_delay',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.definitions_['define_i2c'] = '#include \"SCoop.h\"';
  var code = 'sleep('+number_iscoop_delay_value+');\n';
  return code;
};

// 多任务启动
Blockly.Arduino['iscoop_start_task'] = function(block) {
  Blockly.Arduino.definitions_['define_i2c'] = '#include \"SCoop.h\"';
  Blockly.Arduino.setups_['iscoop_task_start'] = 'mySCoop.start();';
  var code = 'yield();\n';
  return code;
};

/***************************语音识别扩展板**********************************/
//语音识别初始化
Blockly.Arduino.df_VoiceRecognitionInit = function() {
  Blockly.Arduino.definitions_['define_VoiceRecognition'] = '#include "VoiceRecognition.h"';
  
  Blockly.Arduino.definitions_['var_control'] = 'VoiceRecognition Voice;';
  
  Blockly.Arduino.setups_['setup_df_VoiceInit'] = 'Voice.init();';
  
  var code = '';
  return code;
};

//设置语音识别指令
Blockly.Arduino.df_VoiceAddCommand = function() {
  var str1 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  var index = Blockly.Arduino.valueToCode(this, 'index',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   
  var code = 'Voice.addCommand('+str1+','+index+');\n'
  return code;
};

//开始语音识别
Blockly.Arduino.df_VoiceStart = function() {   
  var code = 'Voice.start();\n'
  return code;
};

//返回语音识别结果
Blockly.Arduino.df_VoiceRead = function() {
  var code = 'Voice.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/***************************语音识别控制板**********************************/
//语音识别控制板初始化
// Blockly.Arduino.df_ASRInit = function() {         
//   Blockly.Arduino.definitions_['define_ASRB1'] = '#include "ASRB.h"';
//   Blockly.Arduino.definitions_['define_ASRB2'] = '#include "EEPROM.h"';
//   Blockly.Arduino.definitions_['define_ASRB3'] = '#include "SPI.h"';
//   Blockly.Arduino.definitions_['define_ASRB4'] = '#include "SoftwareSerial.h"';
  
//   Blockly.Arduino.definitions_['var_ASR_sRecog'] = 'char sRecog['+35+']['+38+'] = {'+'"'+"kai deng"+'"'+','+'"'+"guan deng"+'"'+','+'"'+"zhun bei"+'"'+'};\n';
//   Blockly.Arduino.definitions_['var_ASR_fDigit'] = 'unsigned int fDigit['+35+'] = {'+252+','+253+','+254+'};\n';
  
  
//   Blockly.Arduino.setups_['setup_ASRB_INIT'] = 'ASRB.Initialise(35,sRecog,fDigit);';
  
//   var funcName='ExtInt0Handler';

//   var code='void '+funcName+'()'+'{\n'
//   +'  ASRB.ProcessInt0();\n'
//   +'}\n';
//   Blockly.Arduino.definitions_[funcName] = code;
//   Blockly.Arduino.setups_['setup_attachInterrupt'] = 'attachInterrupt(0,'+funcName+',LOW);';
  
//   return '';
// };

//返回语音识别结果
// Blockly.Arduino.df_ASRResult = function(){
//   var code = 'ASRB.Asr'+'(35,38,sRecog,fDigit,0)'
//   return [code, Blockly.Arduino.ORDER_ATOMIC];
// };

//判断语音识别是否忙碌
// Blockly.Arduino.df_ASRBusy = function(){  
//   var code = 'ASRB.Busy_SD();\n'
//     return code;
// };