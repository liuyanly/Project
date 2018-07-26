<template>
    <div class="disclaimer">
        <headers headName="服务费告知单"></headers>
        <div class="contentScollr">
        <div class="word-content">
            {{contentWord.content}}
            <!-- <img src="../assets/images/a_image1.png" /> -->
        </div>
    </div>
    </div>
</template>
<script>
    import headers from "../components/Header"
    export default {
        data(){
            return{
                contentWord:''
            }
        },
        mounted(){
            this.BaseSet.getToken(this)
            var that = this
            this.$ajax.get('/inform/1')
            .then(function(res){
                if(res.data.status == 200){
                    that.contentWord = res.data.data
                }else if(res.data.status == 401){
                    that.BaseSet.linkLogin(that)
                }else{
                    that.$toast(res.data.message)
                }
            })
            .catch(function(err){
                that.$toast(err)
            })
        },
        methods:{

        },
        components:{headers},
    }
</script>
<style lang="scss" scoped>
    .disclaimer{
        height: 100%;
        background: #fff;
        display: flex;
		height: 100%;
		flex-direction: column;
		.contentScollr{
			flex: 1;
			overflow: auto;
			-webkit-overflow-scrolling:touch;
		}
        .word-content{
            line-height: 1.2rem /* 48/40 */;
            font-size: .7rem /* 28/40 */;
            color:#333;
            padding: .5rem /* 20/40 */ .8rem /* 30/40 */;
            img{
                margin: .8rem /* 30/40 */ 0;
                width: 17.3rem /* 690/40 */;
                height: 9.2rem /* 367/40 */;
            }
        }
    }
</style>
