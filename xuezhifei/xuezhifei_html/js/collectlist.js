$.post('http://xuezhifei.zpftech.com/public/index/index/favorites', function(res) {
    var data = $.parseJSON(res);
    console.log(data);
    if(data.code == 200){
        var dataItems = data.data;
        if(dataItems.length>0){
            getTopicItem(dataItems);
            isCollect(dataItems);
        }else{
            noData('暂无任何收藏内容～')
        }
    }
});
// 获取题目
function getTopicItem(arr){
  var topicWarpper = $('<div></div>');
   for (var i = 0; i < arr.length; i++) {
      var topicItem = $('<div class="topic_item"></div>');
       var optionList = arr[i].option_html_list.split("|NTK|");
       var topicTitle = $('<div class="topic_title"></div>');
       var topicTitleStatus = $('<span class="y_color_3f y_p_r_5"></span>').text("("+arr[i].question_type_name+")");
       var topicTitleInfo = $('<span></span>').html(arr[i].body_html);
       topicTitle.append(topicTitleStatus,topicTitleInfo);
       var topicList = $('<div class="topic_list"></div>');
       for (var j = 0; j < optionList.length; j++) {
            var oLabel = $('<label class="am-radio am-secondary"></label>');
            var oInput = $('<input type="radio" name="radio1" data-am-ucheck>').val(optionList[j].split('、')[0]);
            var oSpan = $('<span></span>').html(optionList[j]);
           oLabel.append(oInput,oSpan);
           topicList.append(oLabel);
       }
       var topicDescription = $('<div class="topic_description clearfix"></div>');
       var topicDescriptionL = $('<div class="y_f_l"></div>');
       var descriptionStrong = $('<strong class="y_p_r_20"></strong>').text('难度'+(arr[i].difficulty_value*100/10).toFixed(1));
       var descriptionSpan = $('<span class="y_color_3f"></span>').text(arr[i].question_from);
       topicDescriptionL.append(descriptionStrong,descriptionSpan);
       topicDescription.append(topicDescriptionL);
       var collect = $('<span class="collect"></span>');

       topicItem.append(topicTitle,topicList,topicDescription,collect);
       topicWarpper.append(topicItem);

   }
    $('.m_container').append(topicWarpper);
    $("input[type='radio']").uCheck();
}
//暂无数据
function noData(msg){
    var tipsBox = $('<div class="tips_box"></div>');
    var tipsImg = $('<img src="images/kongbai.png"/>');
    var tipsInfo = $('<div class="y_font_14 y_color_a3 y_margin_t_20"></div>').text(msg);
    tipsBox.append(tipsImg,tipsInfo);
    $('.m_container').append(tipsBox);
}
// 是否收藏
function isCollect(arr){
    for (var i = 0; i < arr.length; i++) {
           if(arr[i].is_favorite == 1){
                $('.collect').addClass(' collected')
           }
           $('.collect').on('click', function () {
                if($(this).hasClass('collected')){
                    $(this).removeClass('collected')
                }else{
                    $(this).addClass('collected');
                    var topicId = arr[i].id;
                    $.post("http://xuezhifei.zpftech.com/public/index/index/favorite_topic", {topic_id: topicId },
                      function(res) {
                        var data = res.data;
                        if(data.code == 200){
                            alert(data.message);
                        }
                    });
                }
           });
       }
}