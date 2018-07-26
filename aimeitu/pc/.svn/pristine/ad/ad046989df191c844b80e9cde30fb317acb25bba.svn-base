<template>
    <div class="warpper">
        <!-- 导航部分 -->
        <div class="header">
            <div class="container clearfix">
                <div class="logo"><img src="../assets/images/logo.png" alt="爱美图"></div>
                <div class="nav">
                   <router-link :to="{name: 'home'}">首页</router-link><router-link :to="{name: 'picture'}">图片</router-link><router-link :to="{name: 'video'}">视频</router-link><router-link :to="{name: 'about'}">关于我们</router-link><router-link :to="{name: 'download'}">下载APP</router-link>
                </div>
            </div>
        </div>
        <div class="container companybox">
            <div class="company-title">
                {{title}}
            </div>
            <div class="company" v-html="content">
                <!-- <p class="info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p> -->
            </div>
        </div>
        <!-- 底部导航 -->
        <div class="footer">
            <div class="container">
                <div class="nav"><a href="#">网站地图</a><span>|</span><router-link :to="{name: 'modelInJoin'}">模特加入</router-link><span>|</span><router-link :to="{name:'copyright'}">版权说明</router-link></div>
                <p>爱美图@版权所有</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            content: ''
        }
    },
    created(){
        this.getData();
    },
    methods: {
        getData(){
            let url =this.$util.baseset.baseurl+'/platform/getClauseByTag?tag=pc_copyright';
            this.$ajax.get(url)
            .then((res) => {
                let data = res.data;
                if(data.ret === 1){
                        console.log(data.data);
                        this.title = data.data.title;
                        this.content = data.data.content;

                }
            })
            .catch(function(err) {
                console.log(err)
            });
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
    .header {
        height: 70px;
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
    .companybox {
        min-height: 710px;
    }
    .company-title{
        margin: 30px 0;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
    }
    .company {
        .info{
            font-size: 20px;
            line-height: 26px;
            margin-bottom: 40px;
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

