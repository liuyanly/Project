<template>
    <div class="doctor-data">
        <headers headName=""></headers>
        <div class="contentScollr">
        <div class="head-top">
            <p class="bg-top">

            </p>
            <div class="doctor-info">
                <img :src="headImg" class="head-img" />
                <p class="name">
                    {{dataInfo.realname}}
                </p>
                <p class="hospital">
                    {{translates.hospital_title}}
                </p>
                <p class="department">
                    {{translates.department_title+' '+dataInfo.jobtitle}}
                </p>
            </div>
        </div>
        <div class="evaluate-one">
            <p class="title">
                擅长
            </p>
            <div class="evaluate-content">
                <p class="content-word">
                    从事综合内科工作10余年，对内科冠心病、心力衰竭、
                    心肌梗死、心律失常、上呼吸道感染、肺炎、慢性支气
                    管炎、泌尿道感染、胃炎、胃溃疡、幽门螺旋杆菌感染、
                    肝硬化、对糖尿病药物及糖尿病胰岛素泵治疗、甲状腺
                    疾病（妊娠甲状腺疾病）、高尿酸血症、骨质疏松及代
                    谢疾病有独到见解。
                </p>
            </div>
        </div>
        <div class="evaluate-one">
            <p class="title">
                医学教育背景
            </p>
            <div class="evaluate-content">
                <p class="content-word">
                    2004年毕业于北京医科大学，研究生学历。十余年来一
                    直从事内科工作，尤其擅长内科疾病。
                </p>
            </div>
        </div>
        <div class="evaluate-one">
            <p class="title">
                学术研究成果、获奖
            </p>
            <div class="evaluate-content">
                <p class="content-word">
                    完成多项市级科技成果二、三等奖，发表国家期刊十余篇。
                </p>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
    import headers from '../components/Header'

    export default {
        data(){
            return{
                id:this.$route.params.id,
                dataInfo:'',
                headImg:'',
                translates:{},
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            getData(){
                that.$ajax.get('/doctor/'+that.id)
                .then(function(res){
                    console.log(res.data)
                    if(res.data.status==200){
                        that.dataInfo=res.data.data
                        that.headImg=res.data.data.translates.avatar_img
                        that.translates=res.data.data.translates
                    }else if(res.data.status==401){
                        that.BaseSet.linkLogin()
                    }else{
                        that.$toast(res.data.message)
                    }
                })
                .catch(function(err){
                    that.$toast(err)
                    that.BaseSet.linkLogin()
                })
            },
        },
        components:{headers},
    }
</script>
<style lang="scss">
    .doctor-data{
        display: flex;
		height: 100%;
		flex-direction: column;
		.contentScollr{
			flex: 1;
			overflow: auto;
			-webkit-overflow-scrolling:touch;
		}
        .head-top{
            .bg-top{
                background: #4CC6D8;
                height: 3.1rem;
            }
            .doctor-info{
                position: relative;
                height: 5.9rem /* 237/40 */;
                background: #fff;
                text-align: center;
                margin-bottom: .5rem /* 20/40 */;
                .head-img{
                    width: 4rem /* 158/40 */;
                    height: 4rem /* 158/40 */;
                    border-radius: 50%;
                    border: .1rem /* 6/40 */ solid #fff;
                    margin: 0 auto;
                    margin-top: -2rem;
                    margin-bottom: .5rem /* 18/40 */;
                }
                .name{
                    font-size: .7rem /* 28/40 */;
                    color: #333;
                    line-height: .7rem /* 28/40 */;
                    margin-bottom: .3rem /* 12/40 */;
                }
                p{
                    text-align: center;
                    font-size: .6rem /* 24/40 */;
                    color: #666;
                    line-height: .6rem;
                }
                .hospital{
                    margin-bottom: .3rem /* 14/40 */;
                }
            }
        }
        .evaluate-one{
            background: #fff;
            margin-bottom: .5rem;
            .title{
                line-height: 2rem /* 80/40 */;
                padding: 0 .8rem /* 30/40 */;
                color: #4CC6D8;
                font-size: .7rem /* 28/40 */;
                border-bottom: 1px solid #e5e5e5;
            }
            .evaluate-content{
                padding: .5rem /* 20/40 */ .8rem /* 30/40 */;
                .content-word{
                    font-size: .7rem /* 28/40 */;
                    color: #333;
                    line-height: 1.2rem /* 48/40 */;
                }
            }
        }
    }
</style>
