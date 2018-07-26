<style lang="scss" scoped>
    .item {
        display: flex;
        flex-direction: row;
        height: 100px;
        border-radius: 4px;
        .left {
            width: 25%;
            height:100%;
            border-radius:3px;
        }
        .right {
            width: 75%;
            height: 100%;
            padding: 1px;
            >div {
                height: 100%; 
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                border-top-right-radius:4px;
                border-bottom-right-radius:4px;
                background-color: #fff;
                .num {
                    text-align: center;
                    font-size: 30px;
                    font-weight: 700;
                }
                .text {
                    font-size: 12px;
                    font-weight: 500;
                    color: #c8c8c8;
                    text-align: center;
                }
            }
        }
    }
</style>

<template>
    <div class="item" :style="{background: background}">
        <div class="left"></div>
        <div class="right">
            <div>
                <p class="num" :style="{color: color}">{{num}}</p>
                <p class="text">{{text}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                color: this.backgroundColor,
                background: this.backgroundColor,
            }
        },
        name: 'statistics',
        props: {
            backgroundColor: {
                type: String,
                default: '#fff'
            },
            num: {
                type: String,
                default: '0'
            },
            text: {
                type: String,
                default: ''
            }
        }
    }
</script>