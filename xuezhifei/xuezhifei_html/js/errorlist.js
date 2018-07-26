// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};

// 学科筛选

var courseId=0;

// 时间筛选
var startDateInit = new Date().Format('yyyy-MM-dd');//时间默认值
var endDateInit   = new Date().Format('yyyy-MM-dd');//时间默认值
$('#my-startDate').val(startDateInit);
$('#my-endDate').val(endDateInit);
var startDate = new Date();
var endDate = new Date();
var $alert = $('#my-alert');
$('#my-start').datepicker().
on('changeDate.datepicker.amui', function(event) {
    if (event.date.valueOf() > endDate.valueOf()) {
        $alert.find('p').text('开始日期应小于结束日期！').end().show();
    }
    else {
        $alert.hide();
        startDate = new Date(event.date);
        $('#my-startDate').val($('#my-start').data('date'));
    }
    $(this).datepicker('close');
});
$('#my-end').datepicker().
on('changeDate.datepicker.amui', function(event) {
    if (event.date.valueOf() < startDate.valueOf()) {
        $alert.find('p').text('结束日期应大于开始日期！').end().show();
    }
    else {
        $alert.hide();
        endDate = new Date(event.date);
        $('#my-endDate').val($('#my-end').data('date'));
    }
    $(this).datepicker('close');
});

$.post('http://xuezhifei.zpftech.com/public/index/index/error_topic_list',
    {course_id:courseId, start_time:startDateInit, end_time:endDateInit},
    function(res) {
        var data = $.parseJSON(res);
        console.log(data);
        if(data.code == 200){
            $('.topic_warpper').empty();//清除上次的数据
            $('.tips_box').remove();//清除上次的数据
            options(data.data.course_list);
            var dataItems = data.data.data;
            if(dataItems.length>0){
                getTopicItem(dataItems);
            }else{
                noData('暂无任何错题～')
            }
        }
    });
$('#btnSure').click(function(){
    $.post('http://xuezhifei.zpftech.com/public/index/index/error_topic_list',
        {course_id:courseId, start_time:startDate.Format('yyyy-MM-dd'), end_time:endDate.Format('yyyy-MM-dd')},
        function(res) {
            var data = $.parseJSON(res);
            console.log(data);
            if(data.code == 200){
                $('.topic_warpper').empty();//清除上次的数据
                $('.tips_box').remove();//清除上次的数据
                var dataItems = data.data.data;
                if(dataItems.length>0){
                    getTopicItem(dataItems);
                }else{
                    noData('暂无任何错题～')
                }
            }
        });
})
// option
function options(arr){
    var oSelect  = $('<select id="course_select" data-am-selected="{ btnStyle: \'secondary\'}"></select>');
    oSelect.append("<option value='0'>全部</option>");
    for (var i = 0; i < arr.length; i++) {
        oSelect.append("<option value="+arr[i].course_id+">"+arr[i].course_name+"</option>");
    }
    $('#course').append(oSelect);
    var courseSelect = $("#course_select");
    courseSelect.on("change",function(){
        courseId = $(this).val();
    });
    $('select').selected();
}
// 获取题目
function getTopicItem(arr){
    var topicWarpper = $('<div class="topic_warpper"></div>');
    for (var i = 0; i < arr.length; i++) {
        var topicItem = $('<div class="topic_item"></div>');
        var optionList = arr[i].option_html_list.split("|NTK|");
        var topicTitle = $('<div class="topic_title"></div>');
        var oA = $('<a href="my_error_detail.html'+'?topic_id='+arr[i].id+'&error_answer='+arr[i].error_answer+'"></a>');
        var topicTitleStatus = $('<span class="y_color_3f y_p_r_5"></span>').text("("+arr[i].question_type_name+")");
        var topicTitleInfo = $('<span></span>').html(arr[i].body_html);
        oA.append(topicTitleStatus,topicTitleInfo);
        topicTitle.append(oA);
        var topicList = $('<div class="topic_list"></div>');
        for (var j = 0; j < optionList.length; j++) {
            var oLabel = $('<label class="am-radio am-secondary"></label>');
            if(arr[i].error_answer == (optionList[j].split('、')[0])){
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
        var descriptionStrong = $('<strong class="y_p_r_20"></strong>').text('难度'+(arr[i].difficulty_value*100/10).toFixed(1));
        var descriptionSpan = $('<span class="y_color_3f"></span>').text(arr[i].question_from);
        topicDescriptionL.append(descriptionStrong,descriptionSpan);
        topicDescription.append(topicDescriptionL);
        // var collect = $('<span class="collect"></span>');

        // topicItem.append(topicTitle,topicList,topicDescription,collect);
        topicItem.append(topicTitle,topicList,topicDescription);
        topicWarpper.append(topicItem)
    }
    $('.m_container').append(topicWarpper);
    $("input[type='radio']").uCheck();

}
//暂无数据
function noData(msg){
    var tipsBox = $('<div class="tips_box"></div>');
    var tipsImg = $('<img src="/public/themes/simpleboot3/public/images/kongbai.png"/>');
    var tipsInfo = $('<div class="y_font_14 y_color_a3 y_margin_t_20"></div>').text(msg);
    tipsBox.append(tipsImg,tipsInfo);
    $('.m_container').append(tipsBox);
}