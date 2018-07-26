<template>
    <div class="evaluate-list">
        <headers headName="评价详情"></headers>
        <div class="contentScollr">
        <div class="evaluate-content">
            <p class="clear line1">
                <img src="" class="left" />
                <span class="name left">阿拉丁</span>
                <span class="left score-span"><scoreReadOnly gradeNum="4" gradeShow="0"></scoreReadOnly></span>
                <span class="right time">2017-05-28</span>
            </p>
            <p class="content-word">
                完成多项市级科技成果二、三等奖，发表国家期刊十余
                篇. 厉害厉害！完成多项市级科技成果二、三等奖，发
                表国家期刊十余篇. 厉害厉害！
            </p>
            <ul class="tag-list clear">
                <li>
                    态度好
                </li>
                <li>
                    认真仔细
                </li>
            </ul>
        </div>
        <div class="img-box">
            <img src="" />
            <img src="" />
        </div>
    </div>
    </div>
</template>
<script>
    import headers from '../components/Header'
    import scoreReadOnly from '../components/ScoreReadOnly'

    export default {
        data(){
            return{

            }
        },
        components:{headers,scoreReadOnly}
    }
</script>
<style lang="scss" scoped>
    .evaluate-list{
        background: #fff;
        display: flex;
		height: 100%;
		flex-direction: column;
		.contentScollr{
			flex: 1;
			overflow: auto;
			-webkit-overflow-scrolling:touch;
		}
        .left{
            float: left;
        }
        .right{
            float: right;
        }
        .img-box{
            text-align: center;
            img{
                width: 17.3rem /* 690/40 */;
                height: 9.2rem /* 366/40 */;
                margin: 0 auto;
                margin: .2rem 0/* 8/40 */;
            }
        }
        .evaluate-content{
            padding: .5rem /* 20/40 */ .8rem /* 30/40 */;
            .line1{
                margin-bottom: .3rem /* 10/40 */;
                >img.left{
                    width: 1.8rem /* 70/40 */;
                    height: 1.8rem /* 70/40 */;
                    border-radius: 50%;
                    margin-right: .4rem /* 17/40 */;
                }
                .name{
                    font-size: .6rem /* 24/40 */;
                    color: #333;
                    margin-right: .6rem /* 25/40 */;
                    line-height: 1.8rem;
                }
                .score-span{
                    margin-top: .5rem;
                }
                .time{
                    font-size: .6rem /* 24/40 */;
                    color: #999;
                    line-height: 1.8rem;
                }
            }
            .content-word{
                font-size: .7rem /* 28/40 */;
                color: #333;
                line-height: 1.2rem /* 48/40 */;
            }
        }
        .tag-list{
            margin: .3rem /* 13/40 */ 0;
            li{
                float: left;
                padding: 0 .3rem /* 14/40 */;
                line-height: .9rem /* 38/40 */;
                border: 1px solid #666;
                color: #666;
                text-align: center;
                margin-right: .5rem /* 20/40 */;
                font-size: .6rem /* 24/40 */;
                border-radius: .3rem /* 10/40 */;
            }
        }
    }
</style>
