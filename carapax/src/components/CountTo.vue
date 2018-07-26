<template>
    <p :style="mainStyle" :class="mainClass">
        <slot name="leftText"></slot>
        <span :style="countStyle" :class="countClass"><span :id="countId">{{ initCount }}</span><span>{{ unitText }}</span></span>
        <slot name="rightText"></slot>
    </p>
</template>

<script>
import CountUp from 'countup';
export default {
    name: 'CountTo',
    data () {
        return {
            counter: {},
            unitText: '',
            countId: 'count' + parseInt(Math.random() * 1000000)
        };
    },
    props: {
        mainClass: String,
        countClass: String,
        mainStyle: {
            type: Object,
            default: () => {
                return {
                    fontSize: '16px',
                    fontWeight: 500,
                    color: 'gray'
                };
            }
        },
        countStyle: Object,
        initCount: {
            type: Number,
            default: 0
        },
        startVal: {
            type: Number,
            default: 0
        },
        endVal: {
            type: Number,
            required: true
        },
        simplify: {         //是否简写： 3000 3K， 配置unit
            type: Boolean,
            default: false
        },
        duration: {         //渐变的持续时间
            type: Number,
            default: 2
        },
        delay: {            //延时加载时间
            type: Number,
            default: 200
        },
        uneasing: {
            type: Boolean,
            default: false
        },
        ungroup: {
            type: Boolean,
            default: false
        },
        separator: {        //间隔符号
            type: String,
            default: ','
        },
        decimals: {         //保留几位小数
            type: Number,
            default: 0
        },
        decimal: {          //小数符号
            type: String,
            default: '.'
        },
        unit: {         //简写配置
            type: Array,
            default: () => {
                return [[3, 'K+'], [6, 'M+'], [9, 'B+']];
            }
        }
    },
    methods: {
        transformValue (val) {
            let endVal = 0;
            let unit = '';
            let len = this.unit.length;
            if (val < Math.pow(10, this.unit[0][0])) {
                endVal = val;
            } else {
                for (let i = 1; i < len; i++) {
                    if (val >= Math.pow(10, this.unit[i - 1][0]) && val < Math.pow(10, this.unit[i][0])) {
                        endVal = parseInt(val / Math.pow(10, this.unit[i - 1][0]));
                        unit = this.unit[i - 1][1];
                    }
                }
            }
            if (val > Math.pow(10, this.unit[len - 1][0])) {
                endVal = parseInt(val / Math.pow(10, this.unit[len - 1][0]));
                unit = this.unit[len - 1][1];
            }
            return {
                val: endVal,
                unit: unit
            };
        }
    },
    mounted () {
        this.$nextTick(() => {
            setTimeout(() => {
                let endVal = 0;
                let res = {};
                if (this.simplify) {
                    res = this.transformValue(this.endVal);
                    endVal = res.val;
                    this.unitText = res.unit;
                } else {
                    endVal = this.endVal;
                }
                let counter = {};
                this.counter = counter = new CountUp(this.countId, this.startVal, endVal, this.decimals, this.duration, {
                    useEasing: !this.uneasing,
                    useGrouping: !this.ungroup,
                    separator: this.separator,
                    decimal: this.decimal
                });
                if (!counter.error) {
                    counter.start();
                }
            }, this.delay);
        });
    },
    watch: {
        endVal (val) {
            let endVal = 0;
            if (this.simplify) {
                let res = this.transformValue(this.endVal);
                endVal = res.val;
                this.unitText = res.unit;
            } else {
                endVal = this.endVal;
            }
            this.counter.update(endVal);
        }
    }
};
</script>
