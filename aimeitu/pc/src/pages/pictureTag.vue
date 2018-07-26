<template>
    <div class="warpper">
        <!-- 导航部分 -->
        <div class="header">
            <div class="container clearfix">
                <div class="logo"><img src="../assets/images/logo.png" alt="爱美图"></div>
                <div class="nav">
                    <router-link :to="{name: 'home'}">首页</router-link><router-link :to="{name: 'picture'}" class="active">图片</router-link><router-link :to="{name: 'video'}">视频</router-link><router-link :to="{name: 'about'}">关于我们</router-link><router-link :to="{name: 'download'}">下载APP</router-link>
                </div>
            </div>
        </div>
        <div class="crumbs">
            <div class="container">
                <router-link :to="{name: 'picture'}">图片</router-link><span>{{label}}</span>
            </div>
        </div>
        <div class="container">
            <ul class="picture-items clearfix">
                <li v-for="picture in pictures">
                    <div class="picture">
                        <router-link :to="{name: 'pictureDetail', params: {id:picture.id}}">
                            <span>
                                <img :src="picture.coverUrl" alt="">
                            </span>
                            <p>{{picture.title}}</p>
                        </router-link>
                    </div>
                    <div class="icons clearfix">
                        <div class="icon-item"><span class="icon like" @click="openDownloadLayer()"></span>{{picture.likeCount}}</div>
                        <div class="icon-item"><span class="icon heat" @click="openDownloadLayer()"></span>{{picture.collectCount}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="pagebox">
            <!-- <div class="container">
                <div class="pagination">
                    <span class="prev"><i></i>上一页</span><span class="first">首页</span><span class="active">1</span><span>2</span><span>3</span><span>…</span><span>100</span><span class="last">最后一页</span><span class="next">下一页<i></i></span>
                </div>
            </div> -->
            <div class="pagebox">
                <mo-paging
                :page-index="currentPage"
                :total="count"
                :page-size="pageSize"
                @change="pageChange">
                </mo-paging>
            </div>
        </div>
        <!-- 底部导航 -->
        <div class="footer">
            <div class="container">
                <div class="nav"><a href="#">网站地图</a><span>|</span><router-link :to="{name: 'modelInJoin'}">模特加入</router-link><span>|</span><router-link :to="{name:'copyright'}">版权说明</router-link></div>
                <p>爱美图@版权所有</p>
            </div>
        </div>
        <!-- 提示下载APP -->
        <div class="modal">
            <div class="modal-dialog">
                <span class="close" @click="closeDownloadLayer()"></span>
                <div class="modal-title">请扫描二维码下载爱美图官方APP</div>
                <div class="modal-content">
                    <div class="tips">
                        <img src="../assets/images/wufafangwen.png" alt="">
                    </div>
                    <div class="codebox">
                        <div class="code"><img src="../assets/images/code.jpg" alt=""></div>
                        <p>扫码下载APP</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
require("../assets/js/jquery-1.11.0.min.js")
import MoPaging from '../components/paging'
export default {
    //显示的声明组件
    components : {
        MoPaging
    },
    data(){
        return {
            label:this.$route.params.label,
            pageSize : 20 , //每页显示20条数据
            currentPage : 1, //当前页码
            count : 0, //总记录数
            pictures: [],
        }
    },
    created(){
        this.getTempData();
    },
    methods:{
        getTempData() {
            let url = this.$util.baseset.baseurl+'/dynamic/getLabelDynamic?type='+1+'&label='+this.label;
            this.$ajax.get(url)
            .then((res) => {
                var data = res.data;
                if(data.ret === 1){
                        console.log(data.data);
                        this.pictures = data.data.list;
                        this.pageSize = data.data.pageSize;
                        this.count = data.data.total;
                }
            })
            .catch(function(err) {
                console.log(err)
            });
        },
        openDownloadLayer() {
            $(".modal").css("display","block");
        },
        closeDownloadLayer(){
            $(".modal").css("display","none");
        },
        //从page组件传递过来的当前page
        pageChange (page) {
            this.currentPage = page
            this.getTempData()
        }
    }
}
</script>

<style scoped lang="scss">
// @import "../assets/scss/index.scss";
.warpper {
    .container {
        width: 1040px;
        margin: 0 auto;
    }
    .modal {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1050;
            display: none;
            overflow: hidden;
            -webkit-overflow-scrolling: touch;
            outline: 0;
            background: rgba(0,0,0,0.40);
    }
    .modal-dialog {
        position: relative;
        width: 640px;
        height: 440px;
        margin: 240px auto;
        padding-top: 70px;
        text-align: center;
        background: rgba(252,252,252,.95);
        border-radius: 12px;
    }
    .close {
        position: absolute;
        top: 15px;
        right: 15px;
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url(../assets/images/f3quxiao.png);
        cursor: pointer;

    }
    .modal-title {
        margin-bottom: 40px;
        font-size: 25px;
        color: #5AA4AE;
    }
    .modal-content {
        .tips{
            margin-top: 45px;
            margin-right: 30px;
            display: inline-block;
            vertical-align: top;
        }
        .codebox {
            display: inline-block;
            width: 180px;
           .code{
                width: 180px;
                height: 180px;
                margin-bottom: 13px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
           p{
             font-size: 24px;
             color: #434C5C;
             font-weight: bold;
           }
        }
    }
    .header {
        height: 70px;
        border-bottom: 1px solid #EEEEEE;
        .logo {
            float: left;
            width: 80px;
            height: 52px;
            margin: 10px 26px 8px 0;
        }
        .nav {
            float: left;
            margin: 24px 0 17px;
            font-size: 17px;
            a{
                display: inline-block;
                height: 29px;
                margin: 0 35px;
                line-height: 22px;
                font-weight: bold;
                &.active,
                &:hover{
                    background: url("../assets/images/rectangle_13.png") no-repeat bottom center;
                    color: #FF68C8;
                }
            }
        }
    }
    .crumbs {
        height: 50px;
        padding-top: 15px;
        margin-bottom: 40px;
        background: #FCFAFB;
        box-shadow: 0 2px 4px #F7F7F7;
        .container {
            line-height: 19px;
            vertical-align: middle;
            a,span{
                display: inline-block;
                padding-right: 20px;
                margin-right: 10px;
                color: #999999;
                background: url("../assets/images/gengduo.png") no-repeat center right;
                &:first-child{
                    color: #333333;
                }
                &:last-child{
                    background: transparent;
                }
            }
        }
    }
    .icons {
        .icon-item{
            float: left;
            min-width: 64px;
            color: #666666;
            .icon{
                display: inline-block;
                width: 16px;
                height: 16px;
                margin-right: 6px;
                vertical-align: middle;
                cursor: pointer;
                &.like{
                    background: url("../assets/images/dianzan.png") no-repeat center center;
                }
                &.heat{
                    background: url("../assets/images/shoucang.png") no-repeat center center;
                }
            }
        }
    }
    .picture-items {
        margin: 0 -8px;
        li{
            float: left;
            width: 250px;
            margin:0 7px 22px;
            .picture {
                span{
                    display: inline-block;
                    width: 250px;
                    height: 353px;
                    border-radius: 4px;
                    margin-bottom: 10px;
                    overflow: hidden;
                }
                img{
                    width: 100%;
                }
                p{
                    width: 250px;
                    line-height: 19px;
                    margin-bottom: 12px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
    .pagebox {
        height:30px;
        margin:40px auto  42px;
        text-align: center;
        // .pagination{
        //     span{
        //         display: inline-block;
        //         width: 40px;
        //         height: 30px;
        //         margin-right: 5px;
        //         line-height: 30px;
        //         text-align: center;
        //         border: 1px solid #DDDDDD;
        //         cursor: pointer;
        //         &.active,
        //         &:hover{
        //             background: #EEEEEE;
        //         }
        //         &.first,
        //         &.last{
        //             width: 70px;
        //             margin-right: 10px;
        //         }
        //         &.last{
        //             margin-left: 5px;
        //         }
        //         &.prev,
        //         &.next{
        //             width: 90px;
        //             margin-right: 10px;
        //             i{
        //                 display: inline-block;
        //                 width: 14px;
        //                 height: 12px;
        //                 background: url("../assets/images/shangyiye.png") no-repeat;
        //                 vertical-align: middle;

        //             }
        //         }
        //         &.prev{
        //             i{
        //                 margin-right: 5px;
        //                 background: url("../assets/images/shangyiye.png") no-repeat;
        //             }
        //         }
        //         &.next{
        //             i{
        //                 margin-left: 5px;
        //                 background: url("../assets/images/xiayiye.png") no-repeat;
        //             }
        //         }
        //     }
        // }
    }
    .footer {
        min-height: 100px;
        margin-top: 20px;
        padding-top: 20px;
        text-align: center;
        background: #F7F7F7;
        .nav {
            margin-bottom: 25px;
            line-height: 19px;
            vertical-align: middle;
            a{
                display: inline-block;
                margin: 0 20px;
            }
            span{
                display: inline-block;
                color: #dddddd;
            }
        }
    }
}
</style>