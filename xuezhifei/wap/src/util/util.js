import axios from 'axios';
  //全局变量与全局方法
const baseset = {
      baseurl:'http://xuezhifei.zpftech.com/public/',
      //日期格式化
      getNowFormatDate:function(date) {
        if(date==null){
            var date=new Date()
        }
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
        var hour = date.getHours();
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        var minute = date.getMinutes();
        if (minute >= 0 && minute <= 9) {
            minute = "0" + minute;
        }
        var sec = date.getSeconds();
        if (sec >= 0 && sec <= 9) {
            sec = "0" + sec;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1
            + strDate + " " + hour + seperator2 + minute
            + seperator2 + sec;
        return currentdate;
      },
      setInfo:function(key, value) {
          localStorage.setItem(key, JSON.stringify(value));
      },
      getInfo:function(key) {
          var result = JSON.parse(localStorage.getItem(key));
          if(result == null || result == "" || result == undefined || result == "null") {
              result = JSON.parse(localStorage.getItem(key));
          }
          return result;
      },
      setStr:function(key, value) {
          localStorage.setItem(key, value);
      },
      getStr:function(key) {
          var result = localStorage.getItem(key);
          if(result == null || result == "" || result == undefined || result == "null") {
              result = localStorage.getItem(key);
          }
          return result;
      },
    getQueryString: () => {
        if(window.location.href.indexOf('?') < 0) return false;
        const url = window.location.href.split('?')[1]; //?后面的url
        const strs = url.split('&'); //每一个参数[key=value]
        let params = {};
        for(let str of strs) {
            str = str.split('=');
            params[str[0]] = str[1];
        }
        return params;
    },
    isIOS() {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            return true;
        } else {
            return false;
        }
    },
    isAndroid() {
        if (/(Android|Adr)/i.test(navigator.userAgent)) {
            return true;
        } else {
            return false;
        }
    }
  };
const http = {
    get(url) {
        return axios({
            method: 'get',
            url: url
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error(error);
        });
    },
    post(url, data, contentType='application/json') {
        let condition = {};
        condition.method = 'post';
        condition.url = url;
        // condition.headers = { 'Content-Type':contentType };
        condition.data = data;
        // if(data != undefined) {
        //     condition.data = (contentType === 'application/json') ? JSON.stringify(data) : data;
        //     console.log(condition);
        // }
        return axios(condition)
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error(error);
        });
    },
    delete(url, data) {
        let condition = {};
        condition.method = 'delete';
        condition.url = url;
        condition.headers = { 'Content-Type': 'application/json' };
        if(data != undefined) {
            condition.data = data;
        }
        return axios(condition)
        .then(response => {
            console.log("删除： " + response.statusText);
            return response;
        })
        .catch(error => {
            console.log(error);
            return error;
        });
    },
    put(url, data) {
        let condition = {};
        condition.method = 'put';
        condition.url = url;
        condition.headers = { 'Content-Type': 'application/json' };
        if(data != undefined) {
            condition.data = JSON.stringify(data);
        }
        return axios(condition)
        .then(response => {
            console.log("更新： " + response.statusText);
            return response;
        })
        .catch(error => {
            console.error(error);
        });
    },
    patch(url, data) {
        return axios({
            method: 'patch',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error(error);
        });
    }
}
const util = {
    baseset: baseset,
    http: http
}

export default util;