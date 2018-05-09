/**
 * Created by cql on 2017/5/27.
 */

let d, d2;
d = [{                                      //听课评价记录表
    "content": "content111111111111", //记录内容
    "content_type": 0, //类型 0 :文本，1：手绘图片 , 2：音频 ，3：拍照图片
    "label": 0, //标签 0:优点，1：建议，2：普通
    "display_order": 2, //记录排序
    "time_length": "2" //语言时长
}, {
    "content": "//www.baidu.com/img/bd_logo1.png",
    "content_type": '1',
    "label": '0',
    "display_order": 1
}, {
    "content": "https://img30.360buyimg.com/sku/jfs/t6118/4/230866308/407863/fa5de253/5926a33eNd86e0313.jpg",
    "content_type": '3',
    "label": '1',
    "display_order": 1
}, {
    "content": "content111111111111",
    "content_type": 0,
    "label": 2,
    "display_order": 1
},
    {
        content: 'http://192.168.1.222:8002/Lestion/assets/dev/小熊舞曲.mp3',
        "content_type": 2, //类型 0 :文本，1：手绘图片 , 2：音频 ，3：拍照图片
        "label": 0, //标签 0:优点，1：建议，2：普通
        "display_order": 2, //记录排序
        "time_length": "2" //语言时长
    }]

d =     [
    {
        "content": "1.教学目标 横说竖说",
        "time_length": "",
        "t_id": 0,
        "course_id": 0,
        "display_order": 0,
        "label": 2,
        "content_type": 0
    },
        {
            "content": "点题\n精彩",
            "time_length": "",
            "t_id": 0,
            "course_id": 0,
            "display_order": 1,
            "label": 0,
            "content_type": 0
        },
        {
            "content": "不够深入",
            "time_length": "",
            "t_id": 0,
            "course_id": 0,
            "display_order": 2,
            "label": 1,
            "content_type": 0
        },
        {
            "content": "2.教学过程",
            "time_length": "",
            "t_id": 0,
            "course_id": 0,
            "display_order": 3,
            "label": 2,
            "content_type": 0
        },
        {
            "content": "http://i41.shenduxuetang.com/1496831584659.jpg",
            "time_length": "",
            "t_id": 0,
            "course_id": 0,
            "display_order": 4,
            "label": 2,
            "content_type": 1
        },
        {
            "content": "气氛好",
            "time_length": "",
            "t_id": 0,
            "course_id": 0,
            "display_order": 5,
            "label": 0,
            "content_type": 0
        },
        {
            "content": "主动性不够",
            "time_length": "",
            "t_id": 0,
            "course_id": 0,
            "display_order": 6,
            "label": 1,
            "content_type": 0
        },
    {
        "content": "主动性不够",
        "time_length": "",
        "t_id": 0,
        "course_id": 0,
        "display_order": 6,
        "label": 1,
        "content_type": 0
    },
    {
        "content": "http://i41.shenduxuetang.com/1496831584659.jpg",
        "time_length": "",
        "t_id": 0,
        "course_id": 0,
        "display_order": 4,
        "label": 2,
        "content_type": 1
    },
    {
        "content": "http://i41.shenduxuetang.com/1496831584659.jpg",
        "time_length": "",
        "t_id": 0,
        "course_id": 0,
        "display_order": 4,
        "label": 2,
        "content_type": 1
    },
    {
        "content": "http://i41.shenduxuetang.com/1496831584659.jpg",
        "time_length": "",
        "t_id": 0,
        "course_id": 0,
        "display_order": 4,
        "label": 2,
        "content_type": 1
    },
    {
        "content": "http://i41.shenduxuetang.com/1496831584659.jpg",
        "time_length": "",
        "t_id": 0,
        "course_id": 0,
        "display_order": 4,
        "label": 2,
        "content_type": 1
    }
    ]


window.webjs = {

    draw(){

        window.addPicture({
            content: 'https://img30.360buyimg.com/sku/jfs/t6118/4/230866308/407863/fa5de253/5926a33eNd86e0313.jpg',
            type: 1
        });

    },
    camera(){
        window.addPicture({
            content: '//www.baidu.com/img/bd_logo1.png',
            type: 3
        });
    },
    voice(){
        window.addAudio({
            content: 'http://192.168.1.222:8002/Lestion/assets/dev/小熊舞曲.mp3',
            time_length: 16
        });
    },
    saveData(d){
        console.log(JSON.parse(d))
    }
};

transmitData(d);

let html = `

<!--
     <div class="general" contenteditable="true"></div>
    <div class="merit" contenteditable="true" data-type="0">
        一天天的把一段路走过，所以慢慢的不再为路上的拥挤感到惊讶，
    </div>

    <div class="merit" contenteditable="true" data-type="1">
        <img src="//www.baidu.com/img/bd_logo1.png" width="100%">
    </div>

    <div class="suggest" contenteditable="true" data-type="0">
        反而觉得本该就是这样，
    </div>
    <div class="general" contenteditable="true" data-type="0">
        这里有这么多的人，即便每个人占有一尺的空间，很多的人也会把这个本来就不大的空间塞满。你要穿行在其间，你就必须学会习惯它的姿态，喜欢这种形式。这是一种对于时空的适应。
    </div>
-->
`