const baseUrl = 'http://192.168.103.30:8080';
const CURRENT_TRACE_INTERVAL = 5000;    //绘制实时轨迹的请求时间间隔
const DRAW_TIME = 5000;                 //历史轨迹重放的动画时间

const config = {
    baseUrl: baseUrl,
    baiduMapKey: '5BsISuZqztzcBGM4bdz48EnGGMnAKKOe',
    trace: {
        interval: CURRENT_TRACE_INTERVAL,
        drawTime: DRAW_TIME
    }
}

export default config;