<template>
    <div class="warpper">
        <!-- 导航部分 -->
        <div class="header">
            <div class="container clearfix">
                <div class="logo"><img src="../assets/images/logo.png" alt="爱美图"></div>
                <div class="nav">
                    <router-link :to="{name: 'home'}">首页</router-link><router-link :to="{name: 'picture'}">图片</router-link><router-link :to="{name: 'video'}" class="active">视频</router-link><router-link :to="{name: 'about'}">关于我们</router-link><router-link :to="{name: 'download'}">下载APP</router-link>
                </div>
            </div>
        </div>
        <div class="crumbs">
            <div class="container">
                <router-link :to="{name: 'video'}">视频</router-link><a href="#">{{categoryVal}}</a><a href="#">{{picture.title}}</a>
            </div>
        </div>
        <div class="container">
            <div class="video-lg">
                <video-player  class="vjs-custom-skin vjs-big-play-centered"
                      ref="videoPlayer"
                     :options="playerOptions"
                     :playsinline="true"

                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
                     @ended="onPlayerEnded($event)"
                     @loadeddata="onPlayerLoadeddata($event)"
                     @waiting="onPlayerWaiting($event)"
                     @playing="onPlayerPlaying($event)"
                     @timeupdate="onPlayerTimeupdate($event)"
                     @canplay="onPlayerCanplay($event)"
                     @canplaythrough="onPlayerCanplaythrough($event)"
                     @ready="playerReadied"
                     @statechanged="playerStateChanged($event)">
              </video-player>
            </div>
            <div class="description">
                <div class="h4">{{picture.title}}</div>
                <div class="tagbox">
                    <!-- <router-link class="tag" v-for="label in labels" :to="{name:'videoTag',params: {tag:label.label}}">{{label.label}}</router-link> -->
                    <a class="tag" v-for="label in labels" @click="newTab(label)">{{label.label}}</a>
                </div>
                <div class="icons clearfix">
                    <div class="icon-item"><span class="icon like" @click="openDownloadLayer()"></span>{{picture.likeCount}}</div>
                    <div class="icon-item"><span class="icon heat" @click="openDownloadLayer()"></span>{{picture.collectCount}}</div>
                </div>
            </div>
            <div class="special">
                <div class="title">
                    精彩推荐
                </div>
                <ul class="video-items clearfix">
                    <li v-for="dynamic in dynamics">
                        <div class="video">
                            <a @click="dynamicClick(dynamic.id)">
                                <div class="pr">
                                    <img :src="dynamic.coverUrl" alt="">
                                    <span class="iconplay"></span>
                                </div>
                                <p>{{dynamic.title}}</p>
                            </a>
                        </div>
                        <div class="icons clearfix">
                            <div class="icon-item"><span class="icon like" @click="openDownloadLayer()"></span>{{dynamic.likeCount}}</div>
                            <div class="icon-item"><span class="icon heat" @click="openDownloadLayer()"></span>{{dynamic.collectCount}}</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="comment">
                <div class="title">评论<small>({{comment.total}})</small></div>
                <div class="comment-box">
                    <ul>
                        <li v-for="commentList in  commentLists">
                            <div class="author"><img :src="commentList.headPic"  alt=""></div>
                            <div class="evaluate">
                                <div class="h6">{{commentList.nickName}}</div>
                                <div class="time">{{$util.baseset.getFormat(commentList.createTime)}}</div>
                                <div class="info">{{commentList.content}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
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
                <div class="modal-title">查看完整内容，请下载爱美图官方APP</div>
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
  export default {
    data() {
      return {
        playerOptions: {
          // videojs options
          width: '1040',
          height: '520',
          muted: true,
          language: 'zh-CN',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: 'video/mp4',
            src: ''
          }],
          poster: '',
          notSupportedMessage: '此视频暂无法播放，请稍后再试',
        },
        id: this.$route.params.id,
        categorys: [], //所有分类
        categoryId: '', //分类ID
        categoryVal: '', //分类name
        picture: {},
        dynamics: [],
        labels: [],
        comment: {},
        commentLists: [],
      }
    },
    created(){
        this.getCategory();
        this.getData(this.id);
        this.getComment(this.id);
    },
    mounted() {
      console.log('this is current player instance object', this.player)
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      getCategory(){
        let url = this.$util.baseset.baseurl+'/dynamic/getCategoryByType?type='+2;
        this.$ajax.get(url)
        .then((res) => {
            let data = res.data;
            if(data.ret === 1){
                    console.log(data.data);
                    this.categorys = data.data;
            }
        })
        .catch(function(err) {
            console.log(err)
        });
    },
    // 图片详情的分类ID在所有分类中查找分类ID的分类name
    categoryName(val,arr){
        console.log(val);
        for (var i = 0; i < arr.length; i++) {
            if(val == arr[i].id){
             this.categoryVal = arr[i].name;
             console.log(this.categoryVal)
            }
        }
    },
    getData(id){
        let url = this.$util.baseset.baseurl+'/dynamic/getDynamicDetail?id='+id;
        this.$ajax.get(url)
        .then((res) => {
            var data = res.data;
            if(data.ret === 1){
                    console.log(data.data);
                    this.picture = data.data;
                    this.categoryId = this.picture.categoryId;
                    this.playerOptions.poster = this.picture.coverUrl;
                    this.playerOptions.sources[0].src = this.picture.url;
                    this.dynamics = this.picture.dynamics;
                    this.labels = this.picture.labels;
                    this.categoryName(this.categoryId,this.categorys);
            }

        })
        .catch(function(err) {
            console.log(err)
        });
    },
    getComment(id) {
        let url = this.$util.baseset.baseurl+'/dynamic/getDynamicComments?dynamicId='+id;
        this.$ajax.get(url)
        .then((res) =>{
            var data = res.data;
            if(data.ret === 1){
                    console.log(data.data);
                    this.comment = data.data;
                    this.commentLists = this.comment.list;

            }

        })
        .catch(function(err) {
            console.log(err)
        });
    },
    dynamicClick(id){
        this.$router.push({name: 'videoDetail', params: {id:id}});
        this.getData(id);
        this.getComment(id);

    },
    newTab(ele) {
        this.$router.push({name:'videoTag', params: {tag:ele.label}});
    },
    openDownloadLayer() {
        $(".modal").css("display","block");
    },
    closeDownloadLayer(){
        $(".modal").css("display","none");
    },
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        console.log('player Timeupdate!', player.currentTime());
        if(parseInt(player.currentTime()) == 10){
            player.pause();
            this.openDownloadLayer();
        }

      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        // seek to 10s
        // console.log('example player 1 readied', player)
        // player.currentTime(10)
        // console.log('example 01: the player is readied', player)
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
            a{
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
    .video-lg {
         height: 520px;
         margin-bottom: 30px;
         #my-video{
            width: 100%;
            height: 520px;
         }
    }
    .description {
        margin-bottom: 32px;
        .h4{
            font-size: 20px;
            margin-bottom: 10px;
        }
        .tagbox{
            margin-bottom: 19px;
            .tag{
                margin-right: 5px;
                padding: 0 9px;
                font-size: 11px;
                color: #999999;
                line-height: 20px;
                background: #f7f7f7;
                border-radius: 2px;
            }
        }
    }
    .title{
        font-size: 16px;
        line-height: 22px;
        small {
            font-size: 14px;
            color: #666666;
        }
    }
    .special{
        margin-bottom: 20px;
        .title {
            margin-bottom: 20px;
        }
    }
    .comment{
        margin-bottom: 64px;
        .title {
            margin-bottom: 20px;
        }
        .comment-box {
            .author {
                width: 40px;
                height: 40px;
                float: left;
                margin-right: 10px;
                border-radius: 100%;
                overflow: hidden;
                img{
                    width: 100%;
                }
            }
            .evaluate {
                margin-left: 50px;
            }
            li{
                padding-bottom: 20px;
            }
            .h6{
                font-size: 15px;
                margin-bottom:2px;
            }
            .time {
                font-size: 12px;
                color: #999999;
                line-height: 17px;
            }
            .info {
                font-size: 13px;
                line-height: 18px;
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
    .video-items {
        margin: 0 -8px;
        li{
            float: left;
            width: 250px;
            margin:0 7px 11px;
            .video {
                .iconplay {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    margin-top: -15px;
                    margin-left: -15px;
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    background: url("../assets/images/bofang.png");
                    background-size: 30px 30px;
                }
                .pr{
                    width: 250px;
                    height: 142px;
                    margin-bottom: 5px;
                    overflow: hidden;
                }
                img{
                    width: 100%;
                }
                p{
                    line-height: 20px;
                    margin-bottom: 5px;
                }
            }
        }
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