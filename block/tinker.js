'use strict';

goog.provide('Blockly.Blocks.tinker');
goog.require('Blockly.Blocks');

// 依次为红、蓝、绿、紫 
var tinker1_bgc = '#675ba5';
var tinker2_bgc = '#39bae8'; 
var tinker3_bgc = '#47C5CA'; 
var tinker4_bgc = '#ff2e63'; 

/********************************************
*****           显示器部分               *****
********************************************/
Blockly.Blocks.tinker_led = {
  init: function() {
    this.setColour(tinker1_bgc);
    this.appendDummyInput("")
      .appendTitle(Blockly.MIXLY_TINKER_LED)
  this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.MIXLY_PIN)
        .setCheck(Number);
  this.appendDummyInput("")
    .appendTitle(Blockly.MIXLY_STAT)
        .appendTitle(new Blockly.FieldDropdown([[Blockly.MIXLY_ON, "HIGH"], [Blockly.MIXLY_OFF, "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.tinker_pwm_led = {
  init: function() {
    this.setColour(tinker1_bgc);
    this.appendDummyInput("")
      .appendField(Blockly.MIXLY_TINKER_PWM)
  this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_TINKER_PIN)
        .setCheck(Number);
    this.appendValueInput("NUM", Number)
        .appendField(Blockly.MIXLY_VALUE2)
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_ANALOG_WRITE);
  }
};

// RGB灯新版
Blockly.Blocks.tinker_rgb2 = {
  init: function() {
    this.setColour(tinker1_bgc);
    this.appendDummyInput()        
        .appendTitle(Blockly.TINKER_RGB)
    this.appendValueInput("PIN_R", Number)
          .appendField(Blockly.MIXLY_TINKER_PIN)
          .setCheck(Number);    
    this.appendValueInput('RGB_R')
        .setCheck(Number)
        .appendTitle(Blockly.TINKER_RGB_R);
    this.appendValueInput("PIN_G", Number)
          .appendField(Blockly.MIXLY_TINKER_PIN)
          .setCheck(Number);
    this.appendValueInput('RGB_G')
        .setCheck(Number)
        .appendTitle(Blockly.TINKER_RGB_G);
    this.appendValueInput("PIN_B", Number)
          .appendField(Blockly.MIXLY_TINKER_PIN)
          .setCheck(Number);
    this.appendValueInput('RGB_B')
        .setCheck(Number)
        .appendTitle(Blockly.TINKER_RGB_B);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

//WS2812新版
Blockly.Blocks.display_rgb_init = {
    init: function () {
        this.setColour(tinker2_bgc);
        this.appendDummyInput("")
            .appendField(Blockly.TINKER_WS2812)
        this.appendValueInput("PIN", Number)
           .setCheck(Number)
           .setAlign(Blockly.ALIGN_RIGHT)
           .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("LEDCOUNT")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_COUNT);
                  this.appendValueInput("Brightness")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("亮度");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};

// 新增亮度
Blockly.Blocks.display_rgb_brightness = {
    init: function () {
        this.setColour(tinker2_bgc);
        this.appendDummyInput("")
            .appendField(Blockly.TINKER_WS2812)
        this.appendValueInput("PIN", Number)
           .setCheck(Number)
           .setAlign(Blockly.ALIGN_RIGHT)
           .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("Brightness2")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("亮度");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};


Blockly.Blocks.display_rgb = {
    init: function () {
        this.setColour(tinker2_bgc);
        this.appendDummyInput("")
            .appendField(Blockly.TINKER_WS2812)
         this.appendValueInput("PIN", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_NUM);
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_B);

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};
Blockly.Blocks.display_rgb2 = {
    init: function () {
        this.setColour(tinker2_bgc);
        this.appendDummyInput("")
            .appendField(Blockly.TINKER_WS2812)
         this.appendValueInput("PIN", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_NUM);
        this.appendDummyInput("")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldColour("#ff0000"), "RGB_LED_COLOR");
        
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};
Blockly.Blocks.display_rgb_rainbow1 = {
    init: function () {
        this.setColour(tinker2_bgc);
        this.appendDummyInput("")
            .appendField(Blockly.TINKER_WS2812)
         this.appendValueInput("PIN", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("WAIT")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("七彩变换切换时间");
      
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// 新增彩虹轮转效果
Blockly.Blocks.display_rgb_rainbowCycle = {
    init: function () {
        this.setColour(tinker2_bgc);
        this.appendDummyInput("")
            .appendField(Blockly.TINKER_WS2812)
         this.appendValueInput("PIN", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("WAIT")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("七彩循环切换时间");
         
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// 新增彩虹追逐特效
Blockly.Blocks.display_rgb_rainbowChase = {
    init: function () {
        this.setColour(tinker2_bgc);
        this.appendDummyInput("")
            .appendField(Blockly.TINKER_WS2812)
         this.appendValueInput("PIN", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("WAIT")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("七彩追逐间隔时间");
         
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};



var DISPLAY_RAINBOW_TYPE = [
["普通", "normal"],
["渐变", "change"]
];

Blockly.Blocks.display_rgb_rainbow3 = {
    init: function () {
        this.setColour(tinker2_bgc);
        this.appendDummyInput("")
            .appendField(Blockly.TINKER_WS2812)
         this.appendValueInput("PIN", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_PIN);
              this.appendDummyInput("").appendField(new Blockly.FieldDropdown(DISPLAY_RAINBOW_TYPE), "TYPE");
        this.appendValueInput("rainbow_color")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("彩虹值");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};



/********************************************
*****           执行器部分               *****
********************************************/
// 电机提示0111
Blockly.Blocks.tinker.HUE = 0;
var TINKER_MS=[["P4；P5", "1"],["P7；P6", "2"]];

// 电机驱动0111
Blockly.Blocks.tinker_motor={
  init:function(){
    this.setColour(tinker3_bgc);
    this.appendDummyInput("")
      .appendTitle(Blockly.MIXLY_TINKER_MOTOR)
    .appendTitle("方向；速度(PWM)")
      .appendTitle(new Blockly.FieldDropdown(TINKER_MS), "PIN");
    this.appendValueInput('speed')
        .setCheck(Number)
        .appendTitle(Blockly.MIXLY_TINKER_MOTOR_SPEED);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};



// 电机停止0911
Blockly.Blocks.tinker_motor_stop={
  init:function(){
    this.setColour(tinker3_bgc);
    this.appendDummyInput("")
      .appendTitle(Blockly.MIXLY_TINKER_MOTOR)
    .appendTitle("方向；速度(PWM)")
      .appendTitle(new Blockly.FieldDropdown(TINKER_MS), "PIN")
    .appendTitle(Blockly.MIXLY_STOP);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


//执行器-电机转速
Blockly.Blocks.MAKER17_motorA = {
  init: function() {
    this.setColour(tinker3_bgc);
    this.appendDummyInput("").appendField(Blockly.MAKER17_MOTORA);

    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_MOTOR_SPEED_PIN);
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_MOTOR_DIR_PIN);
    this.appendValueInput('speed').setCheck(Number).appendField(Blockly.MAKER17_MOTOR_SPEED);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.MAKER17_motorB = {
  init: function() {
    this.setColour(tinker3_bgc);
    this.appendDummyInput("").appendField(Blockly.MAKER17_MOTORB);
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_MOTOR_SPEED_PIN);
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_MOTOR_DIR_PIN);
    this.appendValueInput('speed').setCheck(Number).appendField(Blockly.MAKER17_MOTOR_SPEED);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


// 通用数字输出模块2-a部分:有源蜂鸣器|继电器|震动马达0111
Blockly.Blocks['inout_highlow9'] = {
   init: function() {
    this.setColour(tinker2_bgc);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_HIGH, "HIGH"], [Blockly.MIXLY_LOW, "LOW"]]), 'BOOL')
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_HIGHLOW);
  }
};
// 通用数字输出模块2-b部分:有源蜂鸣器|继电器|震动马达0111
Blockly.Blocks.tinker_buzzer = {
  init: function() {
    this.setColour(tinker2_bgc);
    this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_TINKER_BUZZER)
        .setCheck(Number);
    this.appendValueInput("STAT")
        .appendField(Blockly.MIXLY_STAT)
        .setCheck([Number,Boolean]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_INOUT_DIGITAL_WRITE_TOOLTIP);
  }
};



/********************************************
*****           传感器部分               *****
********************************************/

Blockly.Blocks.tinker_btn = {
  init: function() {
    this.setColour(tinker3_bgc);
    this.appendDummyInput("")
        .appendTitle(Blockly.MIXLY_TINKER_BTN)
  this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.MIXLY_PIN)
        .setCheck(Number);
    this.setOutput(true, Boolean);
  this.setInputsInline(true);
    this.setTooltip('');
  }
};


// 电位器
Blockly.Blocks.tinker_potentiometer = {
  init: function() {
    this.setColour(tinker4_bgc);
    this.appendDummyInput("")
        .appendTitle(Blockly.MIXLY_TINKER_POTENTIOMETER)
  this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.MIXLY_PIN)
        .setCheck(Number);
  this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

// 摇杆（模拟）
Blockly.Blocks.tinker_joystick_a = {
  init: function() {
    this.setColour(tinker1_bgc);
    this.appendDummyInput("")
        .appendTitle(Blockly.MIXLY_TINKER_JOYSTICK_A)
    .appendTitle(new Blockly.FieldDropdown([["x", "x"], ["y", "y"]]), "STAT")
  this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.MIXLY_PIN)
        .setCheck(Number);
  this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

// 三轴加速度
// Blockly.Blocks.tinker_accelerometer = {
//   init: function() {
//     this.setColour(tinker2_bgc);
//     this.appendDummyInput("")
//         .appendTitle(Blockly.MIXLY_TINKER_ACCELEROMETER)
//     .appendTitle(new Blockly.FieldDropdown([["x", "x"], ["y", "y"], ["z", "z"]]), "STAT");
//   this.appendValueInput("PIN", Number)
//         .appendTitle(Blockly.MIXLY_PIN)
//         .setCheck(Number);
//   this.setInputsInline(true);
//     this.setOutput(true, Number);
//     this.setTooltip('');
//   }
// };



/********************************************
*****             小众模块部分           ******
*********************************************/
  //红外接收模块
  Blockly.Blocks.yf_ir_recv = {
    init: function() {
      this.setColour(tinker4_bgc);
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_YF_IR_RECEIVE)
          .appendField(" ")
          .appendField(new Blockly.FieldTextInput('ir_item'), 'VAR');
      this.appendValueInput("PIN", Number)
          .appendField(Blockly.MIXLY_PIN)
          .setCheck(Number);
      this.appendStatementInput('DO')
          .appendField(Blockly.MIXLY_IR_RECEIVE_YES);
      this.appendStatementInput('DO2')
          .appendField(Blockly.MIXLY_IR_RECEIVE_NO);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);
      this.setTooltip(Blockly.MIXLY_IR_RECIEVE_TOOLTIP);
    },
    getVars: function() {
      return [this.getFieldValue('VAR')]; },
    renameVar: function(oldName, newName) {
      if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
        this.setTitleValue(newName, 'VAR');
      }
    }
  };

  //红外mini遥控器键值
  var YF_IR_VAL=[  
    ['CH-', '0xFFA25D'],
    ['CH' , '0xFF629D'],
    ['CH+', '0xFFE21D'],
    ['<<' , '0xFF22DD'],
    ['>>' , '0xFF02FD'],
    ['>||', '0xFFC23D'],
    ['-'  , '0xFFE01F'],
    ['+'  , '0xFFA857'],
    ['EQ' , '0xFF906F'],
    ['0'  , '0xFF6897'],
    ['100', '0xFF9867'],
    ['200', '0xFFB04F'],
    ['1'  , '0xFF30CF'],
    ['2'  , '0xFF18E7'],
    ['3'  , '0xFF7A85'],
    ['4'  , '0xFF10EF'],
    ['5'  , '0xFF38C7'],
    ['6'  , '0xFF5AA5'],
    ['7'  , '0xFF42BD'],
    ['8'  , '0xFF4AB5'],
    ['9'  , '0xFF52AD'],
    ];
  Blockly.Blocks.yf_ir_val = {
    init: function() {
      this.setColour(tinker4_bgc);
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_YF_IR_VAL)
          .appendField(new Blockly.FieldDropdown(YF_IR_VAL), 'VAL');
      this.setOutput(true, Number);
      this.setTooltip(Blockly.MIXLY_IR_RECIEVE_TOOLTIP);
    }
  };

/***************************MP3**********************************/
// MP3初始化
Blockly.Blocks.MP3_init = {
    init: function () {
        this.setColour(tinker3_bgc);
        this.appendDummyInput("").appendField("初始化MP3模块");
        this.appendValueInput("RX")
            .appendField("RX#")
            .setCheck(Number);
        this.appendValueInput("TX")
            .appendField("TX#")
            .setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        // this.setTooltip(Blockly.MIXLY_TOOLTIP_DS1307_INIT);
    },
};


// MP3设置音量
Blockly.Blocks.MP3_volume = {
  init: function() {
    this.appendDummyInput()
        .appendField("音量设置为");
    this.appendValueInput('mp3_set_volume')
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(tinker3_bgc);
    this.setTooltip('音量范围0-30，通常放在初始化中');
  }
};


// MP3设置音质
Blockly.Blocks.MP3_EQ = {
  init: function() {
    this.appendDummyInput()
        .appendField("音质设置为");
    this.appendValueInput('mp3_set_eq')
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(tinker3_bgc);
    this.setTooltip('音质可选0/1/2/3/4/5，代表Normal/Pop/Rock/Jazz/Classic/Bass');
  }
};

// MP3开始播放
Blockly.Blocks.MP3_start = {
  init: function() {
    this.appendDummyInput()
        .appendField("开始播放");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(tinker3_bgc);
  }
};

// 上一首
Blockly.Blocks.MP3_prev = {
  init: function() {
    this.appendDummyInput()
        .appendField("播放上一首");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(tinker3_bgc);
  }
};

// 下一首
Blockly.Blocks.MP3_next = {
  init: function() {
    this.appendDummyInput()
        .appendField("播放下一首");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(tinker3_bgc);
  }
};

// 随机播放
Blockly.Blocks.MP3_random = {
  init: function() {
    this.appendDummyInput()
        .appendField("随机播放");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(tinker3_bgc);
  }
};

// 单曲循环
// Blockly.Blocks.MP3_loop = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField("单曲循环");
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
//     this.setColour(tinker3_bgc);
//   }
// };


// MP3播放歌单
Blockly.Blocks.MP3_play = {
  init: function() {
    this.appendDummyInput()
        .appendField("播放歌单");
    this.appendValueInput('mp3_play')
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(tinker3_bgc);
    this.setTooltip('播放歌单1表示播放tf卡中mp3目录下的0001.mp3');
  }
};

// MP3播放指定目录下的歌单
Blockly.Blocks.MP3_play_file_in_folder = {
  init: function() {
    this.appendDummyInput()
        .appendField("播放目录");
    this.appendValueInput('folder')
        .setCheck(Number);
    this.appendDummyInput()
        .appendField("歌单");
    this.appendValueInput('file')
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(tinker3_bgc);
    this.setTooltip('播放目录11歌单1，表示播放tf卡中的11/0001.mp3');
  }
};

// MP3暂停播放
Blockly.Blocks.MP3_pause = {
  init: function() {
    this.appendDummyInput()
        .appendField("暂停播放");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(tinker3_bgc);
  }
};

// MP3播放结束
Blockly.Blocks.MP3_stop = {
  init: function() {
    this.appendDummyInput()
        .appendField("结束播放");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(tinker3_bgc);
  }
};

/***************************多任务**********************************/
// 多任务
Blockly.Blocks['iscoop_task'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("任务名")
        .appendField(new Blockly.FieldTextInput("task1"), "ISCOOP_TASK_NAME");
    this.appendStatementInput("ISCOOP_TASK_STATEMENT")
        .setCheck(null);
    this.setColour(tinker1_bgc);
    this.setTooltip('定义任务，名字必须以字母开头');
  }
};

// 多任务延时
Blockly.Blocks['iscoop_delay'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("任务延时毫秒");
    this.appendValueInput('scoop_delay')
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(tinker1_bgc);
    this.setTooltip('任务延时毫秒（仅可以在任务中调用）');
  }
};

// 多任务启动
Blockly.Blocks['iscoop_start_task'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("任务开始");
    this.setColour(tinker1_bgc);
    this.setTooltip('开始任务，只需要调用一次');
    this.setHelpUrl('');
  }
};


/***************************语音识别扩展板**********************************/
  //ASR_M08
  Blockly.Blocks.ASR_M08 = {
    init: function() {
      this.setColour(tinker2_bgc);

      this.appendDummyInput()
          .appendField("初始化ASR-M08模块")
          .appendField(" ")
          .appendField(new Blockly.FieldTextInput('val'), 'VAR');

      this.appendValueInput("RX")
          .appendField("RX#")
          .setCheck(Number);
      this.appendValueInput("TX")
          .appendField("TX#")
          .setCheck(Number);

      this.appendStatementInput('DO')
          .appendField("有指令");
      this.appendStatementInput('DO2')
          .appendField("无指令");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);
      this.setTooltip('ASR_M08语音识别模块');
    },
    getVars: function() {
      return [this.getFieldValue('VAR')]; },
    renameVar: function(oldName, newName) {
      if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
        this.setTitleValue(newName, 'VAR');
      }
    }
  };



//语音识别初始化
Blockly.Blocks.df_VoiceRecognitionInit = {
  init:function(){
    this.setColour(tinker2_bgc);
    this.appendDummyInput("")
      .appendField(Blockly.MIXLY_VOICEINIT)
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
//开始语音识别
Blockly.Blocks.df_VoiceStart = {
  init:function(){
    this.setColour(tinker2_bgc);
    this.appendDummyInput("")
      .appendField(Blockly.MIXLY_VOICESTART)
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
//设置语音识别指令
Blockly.Blocks.df_VoiceAddCommand = {
  init: function() {
    this.setColour(tinker2_bgc);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_VOICEADDCOMMAND)
    this.appendValueInput("TEXT", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
  this.appendValueInput('index')
        .setCheck(Number)
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
//返回语音识别结果
Blockly.Blocks.df_VoiceRead = {
  init:function(){
    this.setColour(tinker2_bgc);
    this.appendDummyInput("")
      .appendField(Blockly.MIXLY_VOICEREAD)
    this.setInputsInline(true);
  this.setOutput(true, Number);
    /*this.setPreviousStatement(true);
    this.setNextStatement(true);*/
  }
};
/***************************语音识别控制板**********************************/
//初始化
// Blockly.Blocks.df_ASRInit = {
//   init: function() {
//     this.setColour(tinker3_bgc);
//   this.appendDummyInput("")
//         .appendField(Blockly.MIXLY_ASRINIT)      
//   this.setInputsInline(true);
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
//   }
// };

//返回语音识别结果
// Blockly.Blocks.df_ASRResult = {
//   init: function() {
//     this.setColour(tinker3_bgc);
//   this.appendDummyInput("")
//         .appendField(Blockly.MIXLY_ASRRESULT)
//   this.setInputsInline(true);
//   this.setOutput(true, Number);
//   }
// };

//判断语音识别是否忙碌
// Blockly.Blocks.df_ASRBusy = {
//   init: function() {
//     this.setColour(tinker3_bgc);
//   this.appendDummyInput("")
//         .appendField(Blockly.MIXLY_ASRBUSY)
//   this.setInputsInline(true);
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
//   }
// };