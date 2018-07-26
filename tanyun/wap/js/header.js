Vue.component('my-header', {
    props: ['active'],
    template: '<div class="nav">' +
                '<ul class="flex-item">'+
                '<li v-for="(data, index) in navList" class="flex" v-bind:class="{active:active == index}" @click="link(index+1)">{{data}}</li>'+
                '</ul>'+
                '</div>',
    data: function () {
        return {
            navList: ["饮食", "运动", "睡眠", "情绪"],
        }
    },
    methods: {
        link: function (num) {
                if (num == 1) {
                    location.href = "food.html";
                } else if (num == 2) {
                    location.href = "sport.html";
                } else if (num == 3) {
                    location.href = 'sleep.html';
                } else if (num == 4) {
                    location.href = "emotion.html";
                } 
        },
    }
})