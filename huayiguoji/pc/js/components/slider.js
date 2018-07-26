/**
 * Created by Administrator on 2017/11/16.
 */
Vue.component('my-slider',{
    template:'<div class="swiper-container">'+
                '<div class="swiper-wrapper">'+
                    '<div class="swiper-slide" v-for="str in listImg" :style="{ backgroundImage: \'url( \'+str+\')\' }"></div>'+
                '</div>'+
                '<div class="swiper-pagination swiper-pagination-white"></div>'+
            '</div>',
    data:function () {
        return {
            listImg:['images/a1_banner.jpg','images/a1_banner.jpg','images/a1_banner.jpg']
        }
    },
    mounted:function () {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            loop: true,
            speed: 600,
            autoplay: 4000,
            onTouchEnd: function() {
                swiper.startAutoplay()
            }
        });
    }
})