$(function(){
    /**
     * 模拟select
     **/
     console.log($(".select-menu"));
    $(".select-menu").click(function(){
        // $(this).parent().siblings(".select-menu").find(".select-dropdown").hide();
        $(this).parent().parent().find(".sub-select-dropdown").hide();
        if($(this).siblings(".select-dropdown").is(":hidden")){
            $(this).addClass("active");
            $(this).parents().siblings(".modal").show();
            $(this).siblings(".select-dropdown").show();
        }
        else{
            $(this).removeClass("active");
            $(this).parents().siblings(".modal").hide();
            $(this).siblings(".select-dropdown").hide();
        }
    });
    $(".select-dropdown a").on("click",function(){
        console.log($(this));
        $(this).addClass("active");
        var len = $(this).children(".sub-select-dropdown").length;
        if(len > 0){
            if($(this).find(".sub-select-dropdown").is(":hidden")){
                console.log(111)
                $(this).find(".sub-select-dropdown").show();
                $(".sub-select-dropdown a").on("click",function(){
                    // if($(this).parent().parent().hasClass("active")){
                        console.log(333)
                        // $(this).addClass("active");
                        $(this).parent().parent().parent().siblings(".select-menu").text($(this).text()).end().hide();
                        $(this).parent().parent().parent().siblings(".active").removeClass("active");
                        // $(this).parent().parent().find(".active").removeClass("active");
                    // }
                    // else{
                    //     console.log(444)
                    //     $(this).parent().parent().find(".active").removeClass("active");
                    // }
                })
            }
            else{
                console.log(222)
                $(this).find(".sub-select-dropdown").hide();
                $(this).removeClass("active");
            }
        }else{
            $(this).removeClass("active");
            $(this).parent().siblings(".active").removeClass("active");
            $(this).parent().siblings(".select-menu").text($(this).text()).end().hide();
            $(this).parents().siblings(".modal").hide();
        }
    });
    // $(document).click(function(){
    //     $(".select-dropdown").hide();
    // });
});
