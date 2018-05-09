
## 改动记录

- 20171207 分开音频视频播放接口
 



## js 调用 app

通过webjs对象调用

```js
// 画板
webjs.draw()

// 拍照
webjs.camera()

// 录音
webjs.voice()

// 视频
webjs.video()

// 保存
// 有返回值，ios 可直接接收
webjs.saveData()

// 播放音频
webjs.playAudio('//Lestion/assets/dev/小熊舞曲.mp3')

// 播放视频
webjs.playVideo('//Lestion/assets/dev/小熊舞曲.mp4')

```

## app 调 js
可直接调用

```js


// 编辑情况调用，传入初始数据
transmitData (data)

// 保存
// android 专用
saveData()

// 增加文本标签
addTextBox({
   label: 1//标签 0:优点，1：建议，2：普通
})

// 拍照 或者 选择图片后调用
addPicture({
    content:'//www.baidu.com/img/bd_logo1.png',
    type:1 //类型 1：手绘图片 , 3：拍照图片
})

// 录音完成后调用
addAudio({
    content:'//Lestion/assets/dev/小熊舞曲.mp3',
    time_length:16
})

// 视频选择完后调用
addVideo({
    content:'//Lestion/assets/dev/小熊舞曲.mp4',
    time_length:16
})



```
