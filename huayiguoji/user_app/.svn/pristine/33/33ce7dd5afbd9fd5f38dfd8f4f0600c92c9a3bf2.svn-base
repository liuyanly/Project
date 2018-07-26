<template>
    <div class="evaluate">
        <headers headName="用户评价"></headers>
        <div class="contentScollr">
        <div class="header-info clear">
            <img class="left" :src="data.translates.avatar_img" />
            <div class="user-info left">
                <p class="user-name">
                    {{data.realname}}<span class="c1">(医生)</span>
                </p>
                <p class="info-p">
                    {{data.translates.department_title}}
                </p>
                <p class="info-p">
                    {{data.translates.hospital_title}}
                </p>
            </div>
        </div>
        <div class="text-content">
            <textarea placeholder="请输入具体评价" @keyup="wordNum(1)" v-model="doctorWord" maxlength="200"></textarea>
            <span class="word-num">{{doctorWordNum}}/200</span>
        </div>
        <div class="score-box">
            <p class="title">
                服务态度
            </p>
            <p class=star-box>
                <score @getScore = "getNum"></score>
            </p>
        </div>
        <ul class="tag-list clear">
            <li v-for="(data,index) in tagList" :class="{active:doctorTagArr.indexOf(data.id)>-1}" @click="addTag(1,data.id)">{{data.tag}}</li>
            <!-- <li :class="{active:doctorTagArr.indexOf(1)>-1}" @click="addTag(1,1)">态度好</li> -->
        </ul>
        <!-- <div class="header-info clear">
            <img class="left" src="../assets/images/a_image1.png" />
            <div class="user-info left">
                <p class="user-name assistant-name">
                    毛杜拉<span class="c1">(医助)</span>
                </p>
            </div>
        </div>
        <div class="text-content">
            <textarea placeholder="请输入具体评价" @keyup="wordNum(2)" v-model="assistantWord" maxlength="200"></textarea>
            <span class="word-num">{{assistantWordNum}}/200</span>
        </div>
        <div class="score-box">
            <p class="title">
                服务态度
            </p>
            <p class=star-box>
                <score></score>
            </p>
        </div>
        <ul class="tag-list clear">
            <li :class="{active:assistantTagArr.indexOf(0)>-1}" @click="addTag(2,0)">服务好</li>
            <li :class="{active:assistantTagArr.indexOf(1)>-1}" @click="addTag(2,1)">态度好</li>
            <li :class="{active:assistantTagArr.indexOf(2)>-1}" @click="addTag(2,2)">服务好</li>
            <li :class="{active:assistantTagArr.indexOf(3)>-1}" @click="addTag(2,3)">态度好</li>
            <li :class="{active:assistantTagArr.indexOf(4)>-1}" @click="addTag(2,4)">服务好</li>
            <li :class="{active:assistantTagArr.indexOf(5)>-1}" @click="addTag(2,5)">态度好</li>
            <li :class="{active:assistantTagArr.indexOf(6)>-1}" @click="addTag(2,6)">服务好</li>
            <li :class="{active:assistantTagArr.indexOf(7)>-1}" @click="addTag(2,7)">态度好</li>
            <li :class="{active:assistantTagArr.indexOf(8)>-1}" @click="addTag(2,8)">服务好</li>
            <li :class="{active:assistantTagArr.indexOf(9)>-1}" @click="addTag(2,9)">态度好</li>
        </ul> -->
        <p class="sub-btn" @click="sub()">
            提交
        </p>
    </div>
    </div>
</template>
<script>
import score from "../components/Score";
import headers from "../components/Header";
    export default {
        data(){
            return{
                id:this.$route.params.id,
                orderable_id: this.$route.query.orderableId,
                data:'',
                tagList:[],
                doctorTagArr:[],
                assistantTagArr:[],
                doctorWord:'',
                doctorWordNum:0,
                doctorScore:0,
                assistantWord:'',
                assistantWordNum:0,
            }
        },
        mounted(){
            this.BaseSet.getToken(this)
            this.getDetail()
            this.getTag()
        },
        methods:{
            getNum(num){
                this.doctorScore = num
            },
            getTag(){
                var that = this
                that.$ajax.get('/comment/taglist')
                .then(function(res){
                    if(res.data.status == 200){
                        that.tagList = res.data.data
                    }
                })
                .catch(function(err){

                })
            },
            getDetail(){
                var that = this
                that.$ajax.get('/service/'+this.orderable_id)
                .then(function(res){
                    console.log(res.data)
                    if(res.data.status == 200){
                        that.data = res.data.data.doctor
                    }
                })
                .catch(function(err){

                })
            },
            addTag(type,num){
                if(type==1){
                    console.log(num)
                    if(this.doctorTagArr.length<10 && this.doctorTagArr.indexOf(num)==-1){
                        this.doctorTagArr.push(num);
                    }else if(this.doctorTagArr.indexOf(num)>-1){
                        this.doctorTagArr.splice(this.doctorTagArr.indexOf(num),1);
                    }else{
                        this.$toast('最多只能选择10个标签')
                    }
                }else{
                    if(this.assistantTagArr.length<10 && this.assistantTagArr.indexOf(num)==-1){
                        this.assistantTagArr.push(num);
                    }else if(this.assistantTagArr.indexOf(num)>-1){
                        this.assistantTagArr.splice(this.assistantTagArr.indexOf(num),1);
                    }else{
                        this.$toast('最多只能选择10个标签')
                    }
                }

            },
            wordNum(type){
                if(type==1){
                    this.doctorWordNum = this.doctorWord.length;
                }else{
                    this.assistantWordNum = this.assistantWord.length
                }
            },
            sub(){
                if(this.doctorWord == ''){
                    this.$toast('请输入具体评价')
                    return false
                }
                if(this.doctorScore == 0){
                    this.$toast('请对服务态度进行评价')
                    return false
                }
                var that = this
                that.$ajax.post('/comment',{
                    _me:'user-api',
                    commentable_type:'service',
                    commentable_id:that.orderable_id,
                    stars:that.doctorScore,
                    tags:'['+that.doctorTagArr+']',
                    content:that.doctorWord
                })
                .then(function(res){
                    if(res.data.status == 200){
                        that.$toast('评价成功')
                        that.$router.replace({name:'MyOrder'})
                    }else{

                    }
                })
                .catch(function(err){
                    that.$toast(err)
                    // that.BaseSet.linkLogin(that)
                })
            }
        },
        components: {score,headers},
    }
</script>
<style lang="scss">
    .evaluate{
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
        .header-info{
            padding: .8rem /* 30/40 */;
            background: #fff;
            border-bottom: 1px solid #e5e5e5;
            img{
                width: 2.5rem /* 100/40 */;
                height: 2.5rem /* 100/40 */;
                border-radius: 50%;
            }
            .user-info{
                margin-left: .6rem /* 22/40 */;
                .user-name{
                    font-size: .7rem /* 28/40 */;
                    color: #333;
                    line-height: .7rem /* 28/40 */;
                    .c1{
                        color: #4CC6D8;
                        font-size: .6rem /* 24/40 */;
                    }
                }
                .assistant-name{
                    margin-top: .9rem /* 37/40 */;
                }
                .info-p{
                    font-size: .6rem /* 24/40 */;
                    color: #666;
                    margin-top: .3rem /* 14/40 */;
                    line-height: .6rem /* 24/40 */;
                }
            }
        }
        .text-content{
            padding: .8rem /* 30/40 */;
            background: #fff;
            position: relative;
            border-bottom: 1px solid #e5e5e5;
            textarea{
                width: calc(100% - 1rem);
                height: 6.5rem /* 260/40 */;
                resize: none;
                background: #eee;
                border-radius: .3rem /* 10/40 */;
                font-size: .7rem /* 28/40 */;
                padding: .5rem /* 20/40 */;
            }
            .word-num{
                position: absolute;
                font-size: .6rem /* 22/40 */;
                color: #999;
                right: 1.3rem /* 50/40 */;
                bottom: 1.3rem /* 50/40 */;
            }
        }
        .score-box{
            background: #fff;
            .title{
                line-height: 2.1rem /* 84/40 */;
            }
            p{
                text-align: center;
                font-size: .6rem /* 24/40 */;
                color: #999;
            }
            .star-box{
                padding-bottom: 1.2rem /* 48/40 */;
                padding-top: .1rem /* 4/40 */;
            }
        }
        .tag-list{
            background: #fff;
            padding: 0 .8rem /* 30/40 */;
            padding-bottom: 1.6rem /* 63/40 */;
            margin-bottom: .5rem /* 20/40 */;
            li{
                float: left;
                width: 3.1rem /* 126/40 */;
                height: 1.5rem /* 60/40 */;
                font-size: .6rem /* 24/40 */;
                color:#999;
                text-align: center;
                line-height: 1.5rem /* 60/40 */;
                border: 1px solid #999;
                border-radius: .3rem /* 10/40 */;
                margin-right: .2rem /* 10/40 */;
                margin-bottom: .9rem /* 36/40 */;
                &:nth-of-type(5n){
                    margin-right: 0;
                }
                &.active{
                    background: #4CC6D8;
                    border-color: #4CC6D8;
                    color: #fff;
                }
            }
        }
        .sub-btn{
            width: 17.2rem /* 688/40 */;
            height: 2rem /* 82/40 */;
            margin: 0 auto;
            line-height: 2rem /* 82/40 */;
            text-align: center;
            background: #4CC6D8;
            border-radius: .3rem /* 10/40 */;
            font-size: .8rem /* 32/40 */;
            color: #fff;
            margin-top: 1rem /* 40/40 */;
            margin-bottom: 1.5rem /* 60/40 */;
        }
    }
</style>
