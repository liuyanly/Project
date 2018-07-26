var params = getQueryString()
console.log(params);
$.post('http://xuezhifei.zpftech.com/public/index/index/error_topic_list',
  {topic_id:params.topic_id, error_answer:params.error_answer},
  function(res) {
    var data = $.parseJSON(res);
    console.log(data);
    if(data.code == 200){
        var dataItems = data.data;
        getTopicItem(dataItems);
    }
});
// 获取题目
function getTopicItem(arr){
       var optionList = arr.option_html_list.split("|NTK|");
       var topicItem = $('<div class="topic_item"></div>');
       var topicTitle = $('<div class="topic_title"></div>');
       var topicTitleStatus = $('<span class="y_color_3f y_p_r_5"></span>').text("("+arr.question_type_name+")");
       var topicTitleInfo = $('<span></span>').html(arr.body_html);
       topicTitle.append(topicTitleStatus,topicTitleInfo);
       var topicList = $('<div class="topic_list"></div>');
       for (var j = 0; j < optionList.length; j++) {
            var oLabel = $('<label class="am-radio am-secondary"></label>');
            if(arr.error_answer == (optionList[j].split('、')[0])){
              var oInput = $('<input type="radio" name="radio1" data-am-ucheck checked="checked" disabled>').val(optionList[j].split('、')[0]);
            }else{
              var oInput = $('<input type="radio" name="radio1" data-am-ucheck disabled>').val(optionList[j].split('、')[0]);
            }
            var oSpan = $('<span></span>').html(optionList[j]);
           oLabel.append(oInput,oSpan);
           topicList.append(oLabel);
       }
       var topicDescription = $('<div class="topic_description clearfix"></div>');
       var topicDescriptionL = $('<div class="y_f_l"></div>');
       var descriptionStrong = $('<strong class="y_p_r_20"></strong>').text('难度'+(arr.difficulty_value*100/10).toFixed(1));
       var descriptionSpan = $('<span class="y_color_3f"></span>').text(arr.question_from);
       topicDescriptionL.append(descriptionStrong,descriptionSpan);
       topicDescription.append(topicDescriptionL);
       topicItem.append(topicTitle,topicList,topicDescription);
       $('.m_container').append(topicItem);
       $("input[type='radio']").uCheck();

       var errorBox = $('<div class="error_box"></div>');
       var errorContent = $('<div class="error_content"></div>');
       var errorTitle = $('<div class="error_title">解析</div>');
       var errorInfo = $('<div></div>').html(arr.anylysis_html)
       errorContent.append(errorTitle,errorInfo);
       errorBox.append(errorContent);
       $('.m_container').append(errorBox);
}
function getQueryString(){
    if(window.location.href.indexOf('?') < 0) return false;
    var url = window.location.href.split('?')[1]; //?后面的url
    var strs = url.split('&'); //每一个参数[key=value]
    var params = {};
    for(var str of strs) {
        str = str.split('=');
        params[str[0]] = str[1];
    }
    return params;
}