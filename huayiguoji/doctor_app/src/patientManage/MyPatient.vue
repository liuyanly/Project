<template>
    <div class="my-patient">
        <headers headName='我的会员'></headers>
        <div class="contentScollr">
            <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill='false' ref="loadmore">
        <ul class="order-list already-complete">
            <li class="clear" @click="serviceList(data.id)" v-for="data in dataList">
                <div class="img-box left">
                    <img :src="data.translates.avatar_img" class="head-img" />
                    <!-- <img src="../images/a1_icon5.png" class="vip" /> -->
                </div>
                <div class="left info-box">
                    <p class="name">
                        {{data.realname}}
                    </p>
                    <p class="user-info">
                        性别：{{data.translates.sex}}&emsp;年龄：{{data.translates.age}}岁
                    </p>
                    <p class="status">
                        病症：{{data.illness}}
                    </p>
                </div>
                <!-- <p class="right tag">
                    分诊
                </p> -->
            </li>
        </ul>
        </mt-loadmore>
        </div>
    </div>
</template>
<script>
    //导入模板
    import headers from "../components/Header.vue";
    export default {
        data (){
            return{
                dataList:[],
                allLoaded:false,//是否为最后一页
                page:1,
                per_page:8,//每页最大数
                last:false,
            }
        },
        mounted(){
            this.BaseSet.getToken(this)
            this.getDataList()
        },
        methods:{
            serviceList(id){
                this.$router.push({name:'HealthManage',params:{id:id}});
            },
            loadBottom() {
                this.allLoaded = false;
                setTimeout(function() {
                    if (!this.last) {
                        this.getDataList()
                    } else {
                        this.allLoaded = true;
                    }
                    this.$refs.loadmore.onBottomLoaded();
                }, 500);
            },
            getDataList(){
                this.$ajax.get('/user/patient?per_page='+this.per_page+'&page='+this.page)
                .then((res) => {
                    console.log(res.data)
                    this.page++
                    let data = res.data.data;
                    if(res.data.status==200){
                        if(data.patient.length){
                            this.last = false;
                            for(let i = 0;i < data.patient.length;i++){
                                if(data.patient[i]){
                                    this.dataList.push(data.patient[i])
                                }
                            };
                            console.log(this.dataList)
                        }else{
                            this.last = true;
                        }
                    }
                })
                .catch((err)=>{
                    this.BaseSet.linkLogin(this)
                })
            }
        },
        components: {headers},
    }
</script>
<style lang="scss" scoped>
a{
    color:#fff;
}
    .my-patient{
        height: 100%;
        display: flex;
        flex-direction: column;
        .contentScollr{
            flex: 1;
            overflow: scroll;
            -webkit-overflow-scrolling:touch;
            position: relative;
        }
        .order-list{
            width: 100%;
            overflow: hidden;
            background: #fff;
            li{
                width: 100%;
                border-bottom: #e5e5e5 1px solid;
                overflow: hidden;
                box-sizing: border-box;
                padding: .75rem;
                font-size: 0;
                .left{
                    float: left;
                }
                .right{
                    float: right;
                }
                .img-box{
                    position: relative;
                    .head-img{
                        width: 2.5rem /* 50/20 */;
                        height: 2.5rem /* 50/20 */;
                        border-radius: 50%;
                    }
                    .vip{
                        position: absolute;
                        width: 0.9rem /* 18/20 */;
                        height: 1.1rem /* 21/20 */;
                        bottom:0.1rem /* 2/20 */;
                        right: 1px;
                    }
                }
                .info-box{
                    margin-left: 0.5rem /* 10/20 */;
                    .name{
                        font-size: 0.7rem /* 14/20 */;
                        color: #444;
                        line-height: 1rem /* 20/20 */;
                    }
                    .user-info{
                        font-size: 0.6rem /* 12/20 */;
                        color: #666;
                        line-height: 0.8rem /* 17/20 */;
                    }
                    .status{
                        font-size: 0.6rem /* 12/20 */;
                        color:#ff4646;
                        line-height: 0.8rem /* 17/20 */;
                    }
                }
                .right{
                    font-size: 0.6rem /* 12/20 */;
                    color: #666;
                    line-height: 2.5rem /* 50/20 */;
                }
            }
        }
    }
</style>
