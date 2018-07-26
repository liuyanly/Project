var imgSrc = []; //图片路径
var imgFile = []; //文件流
var imgName = []; //图片名字
var imgIds = [];//图片ID
//选择图片
function imgUpload(obj) {
	var oInput = '#' + obj.inputId;
	var imgBox = '#' + obj.imgBox;
	var btn = '#' + obj.buttonId;
	$(oInput).on("change", function() {
        if(!limitNum(obj.num)){
            alert("最多上传"+obj.num+"张图片");
            return false;
        }else{
            var fileImg = $(oInput)[0];
            var fileList = fileImg.files;
            //用formDate对象上传
            var fd = new FormData($('#upBox')[0]);
            for(var i = 0; i < fileList.length; i++) {
                var imgSrcI = getObjectURL(fileList[i]);
                imgName.push(fileList[i].name);
                imgFile.push(fileList[i]);
            }
            for(var i=0;i<imgFile.length;i++){
                fd.append(obj.data+"[]",imgFile[i]);
            }
            submitPicture(obj.upUrl, fd);
			console.log(fd)
		}

	})
	/*$("#file").on('change', function() {
        console.log(111);
		if(!limitNum(obj.num)){
		  	alert("超过限制");
		  	return false;
		}
		//用formDate对象上传
		var fd = new FormData($('#upBox')[0]);
		for(var i=0;i<imgFile.length;i++){
			fd.append(obj.data+"[]",imgFile[i]);
		}
		submitPicture(obj.upUrl, fd);
	})*/
}
//图片展示
function addNewContent(obj) {
	$(imgBox).html("");
	for(var a = 0; a < imgSrc.length; a++) {
		var oldBox = $(obj).html();
		$(obj).html('<div class="imgContainer"><img title=' + imgName[a] + ' alt=' + imgName[a] + ' src=' + imgSrc[a] + ' onclick="imgDisplay(this)"><p onclick="removeImg(this,' + a + ','+imgIds[a]+')" class="imgDelete"><img src="images/e1_shanchu.png"></p></div>'+oldBox);
	}
}
//删除
function removeImg(obj, index,id) {
	imgSrc.splice(index, 1);
	imgFile.splice(index, 1);
	imgName.splice(index, 1);
	imgIds.splice(imgIds.indexOf(id),1);
	var boxId = "#" + $(obj).parent('.imgContainer').parent().attr("id");
	addNewContent(boxId);
}
//限制图片个数
function limitNum(num){
	if(!num){
		return true;
	}else if(imgFile.length>=num){
		return false;
	}else{
		return true;
	}
}

//上传(将文件流数组传到后台)
function submitPicture(url,data) {
    for (var p in data) {
	  	//console.log(p);
	}
	if(url&&data){
		$.ajax({
			type: "post",
			url: url,
			async: true,
			data: data,
			processData: false,
			contentType: false,
			success: function(dat) {
				if(dat.status == 200){
					imgSrc = []
					imgIds = []
					for(var i=0;i<dat.data.length;i++){
                        imgSrc.push(dat.data[i].path);
                        imgIds .push(dat.data[i].id);
                        addNewContent(imgBox);
					}
					console.log(imgIds)
				}
			}
		});
	}else{

	}
}
//图片灯箱
function imgDisplay(obj) {
	var src = $(obj).attr("src");
	var imgHtml = '<div style="width: 100%;height: 100vh;overflow: auto;background: rgba(0,0,0,0.5);text-align: center;position: fixed;top: 0;left: 0;z-index: 1000;"><img src=' + src + ' style="margin-top: 100px;width: 40%;margin-bottom: 100px;"/><p style="font-size: 50px;position: fixed;top: 30px;right: 30px;color: white;cursor: pointer;" onclick="closePicture(this)">×</p></div>'
	$('body').append(imgHtml);
}
//关闭
function closePicture(obj) {
	$(obj).parent("div").remove();
}

//图片预览路径
function getObjectURL(file) {
	var url = null;
	if(window.createObjectURL != undefined) { // basic
		url = window.createObjectURL(file);
	} else if(window.URL != undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file);
	} else if(window.webkitURL != undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}