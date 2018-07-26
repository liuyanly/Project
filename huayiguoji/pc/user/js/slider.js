/**
 * Created by Administrator on 2017/11/16.
 */
Vue.component('my-slider', {
    template: '<div class="swiper-container">' +
        '<div class="swiper-wrapper">' +
        '<div class="swiper-slide" v-for="str in listImg" :style="{ backgroundImage: \'url( \'+str+\')\' }"></div>' +
        '</div>' +
        '<div class="swiper-pagination swiper-pagination-white"></div>' +
        '</div>',
    data: function() {
        return {
            listImg: []
        }
    },
    mounted: function() {
        this.getBanner()
    },
    methods: {
        getBanner: function() {
            var that = this
            console.log(123)
            axios.get(userApi + '/home')
                .then(function(res) {
                    console.log(res.data.data)
                    if (res.data.status == 200) {
                        for (var i = 0; i < res.data.data.length; i++) {
                            that.listImg.push(res.data.data[i].translates.cover_img)
                        }
                        if (that.listImg.length > 0) {
                            var swiper = new Swiper('.swiper-container', {
                                pagination: '.swiper-pagination',
                                paginationClickable: true,
                                loop: true,
                                speed: 600,
                                autoplay: 4000,
                                observer: true,
                                observeParents: true,
                                onTouchEnd: function() {
                                    swiper.startAutoplay()
                                }
                            });
                        }
                    }
                })
                .catch(function(err) {

                })
        },
    }
})