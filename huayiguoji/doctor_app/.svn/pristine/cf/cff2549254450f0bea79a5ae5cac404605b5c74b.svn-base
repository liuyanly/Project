<template>
    <div class="choose-template">
        <headers headName="选择模板"></headers>
        <div class="contentScollr">
        <ul class="template-list">
            <li :class="{current:moreId==data.category_id}" v-for="data in dataList">
                <p class="title">
                    {{data.category_title}}
                </p>
                <div class="content clear">
                    <div class="content-word left" :class="{warp:moreId!=data.category_id}" @click="chooseThis(data.category_id,data.content,data.category_title)" v-html="data.content">
                    </div>
                    <img v-if="moreId!=data.category_id" class="right xiala-img" src="../images/a22_xiala@2x.png" @click="viewMore(data.category_id)"/>
                    <img v-if="moreId==data.category_id" class="right xiala-img" src="../images/a22_xiala_p@2x.png" @click="viewMore(0)"/>
                </div>
            </li>
        </ul>
    </div>
    </div>
</template>
<script>
    import headers from "../components/Header"
    export default {
        data(){
            return{
                moreId:0,
                id:this.$route.params.id,
                dataList:[],
            }
        },
        methods:{
            viewMore(id){
                this.moreId=id;
            },
            chooseThis(id,content,title){
                this.BaseSet.setInfo('interventionContent',content)
                this.$router.push({name:'PublishIntervention',params:{id:id,title:title}})
            },
            getList(){
                this.$ajax.get('/intervene/temp/'+this.id)
                .then((res)=>{
                    console.log(res.data)
                    if(res.data.status == 200){
                        this.dataList = res.data.data
                    }
                })
                .catch((err)=>{

                })
            },
        },
        mounted(){
            this.getList()
        },
        components:{headers,},
    }
</script>
<style lang="scss">
    .choose-template{
        height: 100%;
    	display: flex;
    	flex-direction: column;
    	.contentScollr{
    		flex: 1;
    		overflow: scroll;
    		-webkit-overflow-scrolling:touch;
    		position: relative;
    	}
        .template-list{
            border-top: 1px solid #e5e5e5;
            background: #fff;
            .left{
                float: left;
            }
            .right{
                float: right;
            }
            li{
                padding: .8rem /* 30/40 */;
                border-bottom: 1px solid #e5e5e5;
                font-size: .6rem /* 24/40 */;
                color: #999;
                .title{
                    color: #333;
                    margin-bottom: .4rem /* 16/40 */;
                }
                .content-word{
                    width: 15.6rem /* 622/40 */;
                    line-height: 1.4rem /* 58/40 */;
                }
                .xiala-img{
                    width: .7rem /* 26/40 */;
                    height: .3rem /* 14/40 */;
                    margin-top: .4rem /* 17/40 */;
                }
            }
            .current{
                .title{
                    color: #4CC6D8;
                }
            }
            .warp{
                height: 1.4rem /* 58/40 */;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
    }
</style>
