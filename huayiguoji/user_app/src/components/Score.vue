<template>
    <div class="score">
        <img src="../assets/images/g30_icon1.png" v-show="grade>=1" @click="clickStar(1)" />
        <img src="../assets/images/g30_icon2.png" v-show="grade<1" @click="clickStar(1)" />
        <img src="../assets/images/g30_icon1.png" v-show="grade>=2" @click="clickStar(2)" />
        <img src="../assets/images/g30_icon2.png" v-show="grade<2" @click="clickStar(2)" />
        <img src="../assets/images/g30_icon1.png" v-show="grade>=3"  @click="clickStar(3)"/>
        <img src="../assets/images/g30_icon2.png" v-show="grade<3"  @click="clickStar(3)"/>
        <img src="../assets/images/g30_icon1.png" v-show="grade>=4"  @click="clickStar(4)"/>
        <img src="../assets/images/g30_icon2.png" v-show="grade<4"  @click="clickStar(4)"/>
        <img src="../assets/images/g30_icon1.png" v-show="grade>=5"  @click="clickStar(5)"/>
        <img src="../assets/images/g30_icon2.png" v-show="grade<5"  @click="clickStar(5)"/>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                grade:0
            }
        },
        methods:{
            clickStar(num){
                this.grade=num;
                this.$emit("getScore",this.grade)
            }
        }
    }
</script>
<style lang="scss">
    .score{
        img{
            width: 1rem /* 40/40 */;
            height: 1rem /* 40/40 */;
            margin:0 .2rem /* 15/40 */;
        }
    }
</style>
