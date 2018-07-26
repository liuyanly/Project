<style scope>
    .fly-line-container {
        width: 100%;
        height: 100%
    }
    canvas {
        position: absolute;
        left: 0;
        z-index: 9999;
    }
</style>
<template>
    <div class="fly-line-container">
        <canvas id="canvas" :width="width" :height="height"></canvas>
    </div> 
</template>

<script>
import Emap from './Emap';
import flyLine from './flyLine.js';

export default {
    name: 'FlyLine',
    components: {
        Emap
    },
    props: {
        sty: {
            type: Object,
            default: {},
        }
    },
    data() {
        return {
            width: '',
            height: '',
            beziers: flyLine.currentLine
        }
    },
    mounted() {
        let container = document.getElementsByClassName('fly-line-container');
        this.width = container[0].offsetWidth;
        this.height = this.sty.height.replace(/px/, '');
        this.end = {x: this.width*0.496, y: 335};

        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');

        for(let bezier of this.beziers) {
            bezier.end = this.end;
            bezier.start.x = bezier.end.x + bezier.offset;
            bezier.control = this.calcControlPoint(bezier.start, bezier.end, bezier.height);
        }

        let newBeziers = flyLine.addLine;

        for(let bezier of newBeziers) {
            this.addNewBezier(bezier, bezier.time);
        }
        this.anim(ctx);
    },
    methods: {
        addNewBezier(bezier, time) {
            setTimeout(() => {
                bezier.end = this.end;
                bezier.start.x = bezier.end.x + bezier.offset;
                bezier.control = this.calcControlPoint(bezier.start, bezier.end, bezier.height);
                this.beziers.push(bezier);
            }, time);
            },
            calcControlPoint(start, end, height) {  //计算贝塞尔曲线控制点
            let x, y;
            y = (start.y+end.y) / 2 - height / Math.sqrt( Math.pow( ((end.y-start.y) / (end.x-start.x)), 2) + 1 );
            x = (start.x+end.x) / 2 + height / Math.sqrt( Math.pow( ((end.x-start.x) / (end.y-start.y)), 2) + 1 );
            return {x: x, y: y};
        },
        setGradient(ctx, bezier) {   //设置线的渐进色
            const { start, control, end, gradient } = bezier;
            let s = gradient.start / 1000;
            let c = gradient.control / 1000;
            let e = gradient.end / 1000;
            let grd = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
            grd.addColorStop(s,"rgba(255,255,255,0)");
            grd.addColorStop(c,"#fff");
            grd.addColorStop(e,"#00ffe7");
            grd.addColorStop(e,"rgba(255,255,255,0)");
            ctx.strokeStyle  = grd;
            return ctx;
        },
        drawBezier(ctx, bezier) {  //绘制贝塞尔曲线
            const { start, control, end } = bezier;
            ctx = this.setGradient(ctx, bezier);
            ctx.beginPath();
            ctx.bezierCurveTo(start.x, start.y, control.x, control.y, end.x, end.y);
            ctx.stroke();
        },
        anim(ctx) {
            for(let bezier of this.beziers) {
                bezier.gradient.start   = bezier.gradient.start + bezier.gradient.add;
                bezier.gradient.control = bezier.gradient.control + bezier.gradient.add;
                bezier.gradient.end     = bezier.gradient.end + bezier.gradient.add;
                if(bezier.gradient.end > 1000) bezier.gradient.end = 1000
                if(bezier.gradient.control > 1000) bezier.gradient.control = 1000
                if(bezier.gradient.start > 1000) {
                bezier.gradient.start   = bezier.originalGradient.start;
                bezier.gradient.control = bezier.originalGradient.control;
                bezier.gradient.end     = bezier.originalGradient.end;
                }
                this.drawBezier(ctx, bezier);
            }
            this.requestAnimationFrame(this.anim, ctx);
        },
        requestAnimationFrame(callback, ctx) {
            let lastTime = 0;         
            let currTime = new Date().getTime();
            let timeToCall = Math.max(0,16.7-(currTime - lastTime));
            let id  = window.setTimeout(() => {
                ctx.clearRect(0,0,1000,600);
                callback(ctx);
            },timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        }
    }
  
}
</script>
