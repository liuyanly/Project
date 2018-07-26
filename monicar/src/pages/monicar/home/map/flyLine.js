const currentLine = [
    {
        label: "克拉玛依",
        offset: -180,
        start: {x: 90, y: 210},    //起点  start: {x: 360, y: 175}
        height: 100,                //二次贝塞尔曲线的高度
        gradient: {start: 0, control:200, end: 220, add: 4},  //用于渐近线的渐变
        originalGradient: {start: 0, control:200, end: 220}   //默认渐进配置， 循环时读取
    },{
        label: '大同',
        offset: 95,
        start: {x: 600, y: 240},
        height: 50,
        gradient: {start: 0, control:200, end: 210, add: 4},
        originalGradient: {start: 0, control:200, end: 210}
    },{
        label: '武汉',
        offset: 133,
        start: {x: 510, y: 335},
        height: 40,
        gradient: {start: 0, control:120, end: 160, add: 3},
        originalGradient: {start: 0, control:120, end: 160}
    },{
        label:'内江',
        offset: 10,
        start: {x: 485, y: 350},
        height: 5,
        gradient: {start: 0, control:200, end: 220, add: 3},
        originalGradient: {start: 0, control:200, end: 220},
    },{
        label:'巴中',
        offset: 30,
        start: {x: 485, y: 320},
        height: 5,
        gradient: {start: 0, control:200, end: 220, add: 3},
        originalGradient: {start: 0, control:200, end: 220},
    },{
        label:'甘孜',
        offset: -45,
        start: {x: 470, y: 325},
        height: 20,
        gradient: {start: 0, control:120, end: 160, add: 3},
        originalGradient: {start: 0, control:120, end: 160}
    },{
        label:'理塘县',
        offset: -43,
        start: {x: 488, y: 340},
        height: 0,
        gradient: {start: 0, control:200, end: 220, add: 3},
        originalGradient: {start: 0, control:200, end: 220},
        time: 2200
    },{
        label:'凉山',
        offset: -20,
        start: {x: 485, y: 360},
        height: 0,
        gradient: {start: 0, control:200, end: 220, add: 3},
        originalGradient: {start: 0, control:200, end: 220}
    },{
        label:'康定',
        offset: -22,
        start: {x: 485, y: 340},
        height: 0,
        gradient: {start: 0, control:200, end: 220, add: 3},
        originalGradient: {start: 0, control:200, end: 220}
    },{
        label:'达州',
        offset: 40,
        start: {x: 485, y: 330},
        height: 0,
        gradient: {start: 0, control:200, end: 220, add: 3},
        originalGradient: {start: 0, control:200, end: 220}
    },{
        label:'宜宾',
        offset: 0,
        start: {x: 488, y: 350},
        height: 0,
        gradient: {start: 0, control:200, end: 220, add: 4},
        originalGradient: {start: 0, control:200, end: 220}
    },{
        label:'昆明',
        offset: -17,
        start: {x: 488, y: 400},
        height: 0,
        gradient: {start: 0, control:200, end: 220, add: 3},
        originalGradient: {start: 0, control:200, end: 220}
    },{
        label:'香格里拉',
        offset: -60,
        start: {x: 488, y: 370},
        height: 20,
        gradient: {start: 0, control:160, end: 180, add: 3},
        originalGradient: {start: 0, control:160, end: 180}
    }
];

const addLine = [
    {
        label: "西藏",
        offset: -153,
        start: {x: 375, y: 340},
        height: 60,
        gradient: {start: 0, control:200, end: 220, add: 4},
        originalGradient: {start: 0, control:200, end: 220},
        time: 2500
    },{
        label: "西藏",
        offset: -153,
        start: {x: 375, y: 340},
        height: 60,
        gradient: {start: 0, control:200, end: 220, add: 4},
        originalGradient: {start: 0, control:200, end: 220},
        time: 1500
    },{
        label: "灵芝",
        offset: -113,
        start: {x: 375, y: 340},
        height: 40,
        gradient: {start: 0, control:200, end: 220, add: 4},
        originalGradient: {start: 0, control:200, end: 220},
        time: 3500
    },{
        label: "灵芝",
        offset: -113,
        start: {x: 375, y: 340},
        height: 40,
        gradient: {start: 0, control:200, end: 220, add: 4},
        originalGradient: {start: 0, control:200, end: 220},
        time: 1000
    },{
        label: "昌都",
        offset: -80,
        start: {x: 375, y: 344},
        height: 40,
        gradient: {start: 0, control:200, end: 220, add: 4},
        originalGradient: {start: 0, control:200, end: 220},
        time: 3000
    },{
        label:'宜宾',
        offset: 0,
        start: {x: 488, y: 350},
        height: 0,
        gradient: {start: 0, control:200, end: 220, add: 4},
        originalGradient: {start: 0, control:200, end: 220},
        time: 3000
    },{
        label:'凉山',
        offset: -20,
        start: {x: 485, y: 360},
        height: 0,
        gradient: {start: 0, control:200, end: 220, add: 3},
        originalGradient: {start: 0, control:200, end: 220},
        time: 2200
    },{
        label:'内江',
        offset: 10,
        start: {x: 485, y: 350},
        height: 5,
        gradient: {start: 0, control:200, end: 220, add: 3},
        originalGradient: {start: 0, control:200, end: 220},
        time: 2500
    },{
        label:'泸州',
        offset: 15,
        start: {x: 485, y: 358},
        height: 5,
        gradient: {start: 0, control:200, end: 220, add: 3},
        originalGradient: {start: 0, control:200, end: 220},
        time: 800
    },{
        label:'攀枝花',
        offset: -30,
        start: {x: 485, y: 385},
        height: 0,
        gradient: {start: 0, control:200, end: 220, add: 3},
        originalGradient: {start: 0, control:200, end: 220},
        time: 800
    },{
        label:'达州',
        offset: 40,
        start: {x: 485, y: 330},
        height: 0,
        gradient: {start: 0, control:200, end: 220, add: 3},
        originalGradient: {start: 0, control:200, end: 220},
        time: 1800
    },{
        label:'达州',
        offset: 40,
        start: {x: 485, y: 330},
        height: 0,
        gradient: {start: 0, control:200, end: 220, add: 3},
        originalGradient: {start: 0, control:200, end: 220},
        time: 1800
    },{
        label:'昆明',
        offset: -17,
        start: {x: 488, y: 400},
        height: 0,
        gradient: {start: 0, control:200, end: 220, add: 3},
        originalGradient: {start: 0, control:200, end: 220},
        time: 2000
    },{
        label:'昆明',
        offset: -17,
        start: {x: 488, y: 400},
        height: 0,
        gradient: {start: 0, control:200, end: 220, add: 3},
        originalGradient: {start: 0, control:200, end: 220},
        time: 4000
    },{
        label:'香格里拉',
        offset: -60,
        start: {x: 488, y: 370},
        height: 20,
        gradient: {start: 0, control:160, end: 180, add: 3},
        originalGradient: {start: 0, control:160, end: 180},
        time: 2500
    },{
        label:'香格里拉',
        offset: -60,
        start: {x: 488, y: 370},
        height: 20,
        gradient: {start: 0, control:160, end: 180, add: 3},
        originalGradient: {start: 0, control:160, end: 180},
        time: 4500
    },{
        label: '南昌',
        offset: 152,
        start: {x: 510, y: 355},
        height: 40,
        gradient: {start: 0, control:120, end: 160, add: 4},
        originalGradient: {start: 0, control:120, end: 160},
        time: 400
    }
];

const flyLine = {
    currentLine: currentLine,
    addLine: addLine
}

export default flyLine;