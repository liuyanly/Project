/**
 * Created by Administrator on 2017/11/23.
 */
var imgUrl = '';
var imgId = '';

function getImageWidth(url, callback) {
    var img = new Image();
    img.src = url;

    // 如果图片被缓存，则直接返回缓存数据
    if (img.complete) {
        callback(img.width, img.height);
    } else {
        // 完全加载完毕的事件
        img.onload = function () {
            callback(img.width, img.height);
        }
    }

}

function setImagePreview(e, el) {

    var files = e.files[0], value = e.value;
    if (!value.match(/.jpg|.png|jpeg/i)) {
        $this.$alert('图片类型必须是jpeg,jpg,png中的一种', '提示', {
            confirmButtonText: '确定',
        })
        return;
    } else {
        // getImageWidth(window.URL.createObjectURL(files),function(w,h) {
        //     if (w > 500 || h >900||files.size>2097152) {
        //         console.log(w,h,files.size);
        //         $this.$alert('请上传900*500并且2M以下的图片', '提示', {
        //             confirmButtonText: '确定',
        //         })
        //         $(this).val('');
        //         return;
        //     }else{
        //         if (value) {
        //             getBase64(files, function (base64) {
        //                 el.attr('src',base64);
        //                 imgUrl=base64;
        //                 console.log(imgUrl,1)
        //             })
        //         } else {
        //             // IE 10 以下没有 e.files
        //             // IE 皆能拿到 input[file] 的value 且都为 完整路径
        //             el.attr('src',value);
        //             imgUrl=value;
        //         }
        //     }
        // })
        var dta = new FormData($("#formData")[0]);
        $.ajax({
            url: doctorApi + "/file",
            type: "post",
            dataType: "json",
            cache: false,
            data: dta,
            contentType: false,
            processData: false,
            async: true,
            success: function (dt) {

                if (dt.status == 200) {
                    console.log(dt.data[0].id)
                    $(".hiddenInput").val(dt.data[0].path);
                    if (value) {
                        getBase64(files, function (base64) {
                            el.attr('src', dt.data[0].path);
                        })
                    } else {
                        // IE 10 以下没有 e.files
                        // IE 皆能拿到 input[file] 的value 且都为 完整路径
                        el.attr('src', dt.data[0].path);
                    }
                    imgUrl = dt.data[0].path
                    imgId = dt.data[0].id
                    // Vue.$alert('头像上传成功！', '提示', {
                    //     confirmButtonText: '确定',
                    // })
                } else {
                    // Vue.$alert('头像上传失败！', '提示', {
                    //     confirmButtonText: '确定',
                    // })
                }
            }
        })
    }


}

/*获取图片base64*/
function getBase64(file, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        callback(this.result);
    }
};