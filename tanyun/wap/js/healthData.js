        // var currentnow = new Date();
        $(function () {
            // 日周
            $(".energy .title span").click(function () {
                var that = $(this);
                tab(that)
            });
            // 早餐中餐晚餐
            $(".food .nav li").click(function () {
                var that = $(this);
                tab(that)
            });
            // date
            // calendar();
            // console.log(nowDate);
        })
        function tab(self) {
            $(self).addClass("active").siblings().removeClass("active");
            var that = "#" + $(self).attr("menu");
            $(that).removeClass("hide").siblings().addClass("hide");
        }
        // var clickNum=1;
        // function pre(){
        //   clickNum+=1;
        //   calendar();
        // }
        // function next(){
        //   clickNum-=1;
        //   calendar();
        // }
        // var nowDate = getFormat(currentnow.getTime());
        // function calendar(){
        //   console.log(currentnow.getTime());
        //   var firstTime = new Date(currentnow.setDate(currentnow.getDate() - (currentnow.getDay()+1)*clickNum));
        //   var str="";
        //   for(var i=0;i<7;i++){
        //     var temp=new Date(firstTime.setDate(firstTime.getDate()+1));
        //       console.log(temp.getTime());
        //     var year= temp.getFullYear();
        //     var month = (temp.getMonth() + 1) <= 9 ? "0" + (temp.getMonth() + 1) : (temp.getMonth() + 1);
        //     var day = temp.getDate() <= 9 ? "0" + temp.getDate() :temp.getDate();
        //     var date = year + "-" + month + "-" + day;
        //       str += "<li data-val='"+date+"' onclick='add(this)' class='"+(currentnow.getTime() == temp.getTime()?"active":"")+"'>";
        //       str+="<span>"+temp.getDate()+"</span>"
        //       str+="<small>"+(temp.getMonth()+1)+"月</small>"
        //       str+="</li>";
        //   }
        //   $("#datebox ul").html(str);
        // }
        // function add(e) {
        //     $(e).addClass('active').siblings().removeClass("active");
        //     nowDate = $(e).attr('data-val');
        //     console.log(nowDate);
        // }