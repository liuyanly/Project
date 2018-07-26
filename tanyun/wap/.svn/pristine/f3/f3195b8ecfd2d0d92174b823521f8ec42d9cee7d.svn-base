//设置动态计算rem
window.rootFont = function () {
    var doc = document;
    var win = window;
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = doc.body.clientWidth;
            /*clientWidth = $(window).width();*/
            if (!clientWidth) return;
            docEl.style.fontSize = 40 * (clientWidth / 750) + 'px';
        };

    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
}();

var baseurl = "http://apitanyun.zpftech.com";
// 过滤对象
// function objFilter(item){
//     var reg = /^items/, obj = {};
//     for (var i in item) {
//         if (!reg.test(i)) {
//             obj[i] = item[i]
//         }
//     }
//     return obj;
// }
// 遍历对象的获取value添加到数组
function objVal(data) {
    var arr = [];
    for (var p in data) {
        arr.push(data[p])
    }
    return arr; 
}
function addAttr(data){
// 数组的每个对象添加属性百分比;
    // var arr = [];
    for (var i = 0; i < data.length; i++) {
        var key = "percent";
        var value = data[i].val / data[i].reference
        data[i][key] = parseInt(value * 100);
    }
    // arr.push(data)
    return data;
}
// 为情绪饼图数组的每个对象添加百分比;
function addAttr2(data,total) {
    for (var i = 0; i < data.length; i++) {
        var key = "value";
        var value = data[i].count / total;
        data[i][key] = parseInt(value * 100);
        var key1 = "selected";
        var value2 = true;
        data[0][key1] = value2;
    }
    return data;
}
//时间戳转日期格式
function getFormat(date) {
    var date = new Date(date)
    var seperator1 = "-"
    var seperator2 = ":"
    var month = date.getMonth() + 1
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    var strDate = date.getDate();
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1
        + strDate;
    return currentdate;
}