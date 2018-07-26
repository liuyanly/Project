<template>
    <ul class="small-header-doctor clear">
        <li :class="{current:type==index}" @click="changeType(index)" v-for='(data,index) in smallData' :key='index'>{{data}}</li>
    </ul>
</template>
<script>
export default {
    props:{parentType:'',smallData:Array},
    data: function () {
        return {
            type:this.parentType,
        }
    },
    mounted (){

    },
    methods: {
        changeType(num){
            this.type = num;
            this.$emit('changeView',num);
        }
    }
}
</script>
<style lang="scss">
    .small-header-doctor{
        background: #fff;
        li{
            width: 50% /* 128/40 */;
            text-align: center;
            line-height: 1.9rem /* 76/40 */;
            color: #666;
            font-size: .7rem /* 28/40 */;
            font-family: PingFangSC-Regular;
            float: left;
            border-bottom: .1rem solid #dcdcdc;
        }
        .current{
            color:#4CC6D8;
            border-bottom: .1rem /* 4/40 */ solid #4CC6D8,
        }
    }
</style>
