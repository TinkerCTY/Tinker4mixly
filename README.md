# 2019-4-22

- 小众模块新增ASR-M08语音识别命令；



# 2019-4-19

- 更新了MP3模块的Arduino库文件，并修改了相关代码；
- MP3模块新增积木块：播放指定目录中的指定mp3文件；



# 2019-4-18

- 注释掉了【三轴加速度】和【语音识别控制板】相关的命令（用得太少）；
- 【显示器】中新增单独设置亮度的积木块；
- 新增MP3模块，适配DFplayer Mini模块：
  - 初始化MP3模块
  - 音量设置
  - 音质设置
  - 播放歌单
  - 暂停播放
  - 结束播放
  - 开始播放
  - 播放上一首
  - 播放下一首
  - 随机播放



# 2019-4-17

### Tinker库结构树

- 显示器
  - LED
  - 亮度设置
  - RGB灯珠
  - WS2812灯带（x5）
- 执行器
  - 通用数字输出
  - 电机（x2）
- 传感器
  - 通用数字传感器
  - 通用模拟传感器
  - 摇杆（模拟）
  - 三轴加速度（模拟）
- 小众模块
  - 红外接收
  - 红外遥控键值
  - 多任务（x3）
  - 语音识别拓展板（x4）
  - 语音识别控制板（x3）

# 2019-2-1

- 精简之前开发的Imagine4mixly库；
- 修复部分模块的bug；
- 添加部分新模块；
- 推荐用于0.999以上版本的mixly；

### 开发原因

Imagine4mixly库中有大量代码功能相同，只是名字不同的积木块，对公司有利，但对个人来说，这样的库十分ugly；Imagine4mixly库中部分积木块存在bug，既有arduino源代码的问题，也有.h库的问题；又学习到一些有趣的模块，有必要添加进去；

### 开发进度

- [x] 积木块显示的名字修改；
- [x] 路径相关文件名修改；
- [x] Imagine4mixly精简：
  - [x] 显示器；
    - [x] 食人鱼；
    - [x] 液晶显示屏全部；
    - [x] LED点阵屏全部；
  - [x] 执行器；
    - [x] 改为通用数字输出模块：蜂鸣器、继电器、振动马达等；
    - [x] 播放声音和结束声音删去；
    - [x] 电机暂时只修改文字，在电机模块中细改；
    - [x] 舵机全部去除；
  - [x] 数字传感器；
    - [x] 全部可以整合为数字传感器，另外将超声波和DHT11删除；
  - [x] 模拟传感器；
    - [x] 全部可以整合为模拟传感器，只保留摇杆和三轴加速度
- [x] 修复已知bug的积木块；
  - [x] RGB全彩灯珠无法切换引脚；
  - [x] 播放声音模块添加0频率声音，决定不改动了，因为可以拖数字模块进去；
  - [x] 引脚不能放变量，通用数字输出模块已解决该问题；
  - [x] 修复了原版灯带积木块使用的不是Adafruit_NeoPixel.h库的问题
- [x] 灯带功能拓展；
- [x] 电机驱动模块；（待测试）
- [x] scoop模块；（mixly4IoTV1.03版中也有，暂时用自己的）
- [x] 语音识别模块；
- [x] 红外遥控（考虑，参考yfrobot）；
- [x] 颜色修改；
  - [x] 显示器：
  - [x] 执行器：
  - [x] 传感器：
  - [x] 小众模块：

### 遗留问题

- [ ] OLED模块（暂时不集成，做成单独的库即可，参考mixly4IoTV1.03）；
- [ ] mp3模块（暂时不考虑，需自开发）；















