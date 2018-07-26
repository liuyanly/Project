//表格
$(".public-jy-table td,.public-jy-table th").dblclick(function() {
	if ($(this).hasClass('biaotou-th')) {
		return;
	}
	var content = $(this).text();
	var input = $("<input type='text' class='input' />");
	$(this).html(input);
	$(input).focus().val(content);
	$(input).blur(function() {
		$(this).parent().text($(this).val());
		// 这里可以ajax上传到服务器 $(this).val()
		// $.ajxa();
	});
});
//表单验证
$(function() {
	$.Tipmsg.r=null;
	$(".formValidator").Validform({
		tiptype:function(msg){
			layer.msg(msg);
		},
		tipSweep:true,
	});
})
//icon换颜色
$(".change-color").toggle(function() {
	$(this).find('i').css('color',eval($(this).attr('data-toggle-color'))[1]);
}, function() {
	$(this).find('i').css('color',eval($(this).attr('data-toggle-color'))[0]);
});
//提示下载APP
$('.notice_app').click(function(){
	alert('下载APP进行评论');
});