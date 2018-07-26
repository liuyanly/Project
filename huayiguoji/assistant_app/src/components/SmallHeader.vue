<template>
    <ul class="small-header clear">
        <li :class="{current:type==index}" @click="changeType(index)" v-for='(data,index) in smallData'>{{data}}</li>
    </ul>
</template>
<script>
    export default{
        props:{parentType:'',smallData:Array},
        data(){
            return{
                type:this.parentType,
            }
        },
        mounted (){
            
        },
        methods: {
            changeType(num){
                this.type = num;
                this.$emit('changeView',num);
            },
        }
    }
</script>
<style lang="scss">
    .small-header{
        display: -webkit-box;
        height: 2.25rem;
        // padding: 0 .6rem /* 49/40 */;
        background: #fff;
        li{
           -webkit-box-flex:1;
            // width: 3.2rem /* 128/40 */;
            text-align: center;
            // margin: 0 1.3rem /* 52/40 */;
            line-height: 2.15rem /* 76/40 */;
            color: #666;
            font-size: .7rem /* 28/40 */;
            font-family: PingFangSC-Regular;
            // float: left;
        }
        .current{
            //color:#4CC6D8;
            border-bottom: .1rem /* 4/40 */ solid #4CC6D8,
        }
    }
</style>
