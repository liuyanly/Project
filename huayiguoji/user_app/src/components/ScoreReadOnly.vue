<template>
    <div class="score clear">
        <div class="left">
            <img src="../assets/images/g30_icon1.png" v-show="grade>=1" />
            <img src="../assets/images/g30_icon2.png" v-show="grade<1" />
            <img src="../assets/images/g30_icon1.png" v-show="grade>=2" />
            <img src="../assets/images/g30_icon2.png" v-show="grade<2" />
            <img src="../assets/images/g30_icon1.png" v-show="grade>=3" />
            <img src="../assets/images/g30_icon2.png" v-show="grade<3" />
            <img src="../assets/images/g30_icon1.png" v-show="grade>=4" />
            <img src="../assets/images/g30_icon2.png" v-show="grade<4" />
            <img src="../assets/images/g30_icon1.png" v-show="grade>=5" />
            <img src="../assets/images/g30_icon2.png" v-show="grade<5" />
        </div>
        <div class="left grade-num" v-if="gradeShow!=0">
            {{grade}}.0
        </div>
    </div>
</template>
<script>
    export default {
        props:['gradeNum','gradeShow'],
        data(){
            return{
                grade:this.gradeNum,
            }
        },
        methods:{

        }
    }
</script>
<style lang="scss">
    .score{
        height: .8rem;
        .left{
            float: left;
        }
        .grade-num{
            font-size: .8rem /* 30/40 */;
            color:#6fc3d5;
            line-height: .8rem;
            margin-left: .25rem;
            margin-top: .1rem /* 2/40 */;
        }
        img{
            width: .8rem /* 32/40 */;
            height: .8rem /* 32/40 */;
            margin:0 .05rem /* 10/40 */;
        }
    }
</style>
