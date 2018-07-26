import axios from 'axios';
import router from '../router/index';

const common = {
    /**
     * 将一维数组等分为二维数组
     * @param  {[array]} array [需要格式化的数组]
     * @param  {[Num]}   num   [按照num数量等分]
     * @return {[array]}       [格式化后的二维数组]
     */
    splitArray: (array, num) => {
        let result = [];
        for(let i=0; i<array.length; i+=num){
           result.push(array.slice(i,i+num));
        }
        return result;
    },
    /**
     * @param  {String} timestamp 时间戳
     * @return {String}    格式化后的日期
     */
    formatDateTime: (timestamp, all = 1) => {
        if(timestamp === null || timestamp === undefined || timestamp === 0) {
            return ;
        }
        timestamp = timestamp.toString();
        if(timestamp.length === 10) {
            timestamp = timestamp + '000';
        }
        timestamp = parseInt(timestamp, 10);
        let date = new Date(timestamp);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let h = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        m = m < 10 ? ('0' + m) : m;
        d = d < 10 ? ('0' + d) : d;
        h = h < 10 ? ('0' + h) : h;
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return all ? (y + '-' + m + '-' + d+' '+h+':'+minute+':'+second) : (m + '-' + d+' '+h+':'+minute);
    },
    downloadFile: (dom, fileName, content) => {
        let blob = new Blob(content,{type:"text/plain"});
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, false);   //initEvent 不加后两个参数在FF下会报错
        dom.download = fileName;
        dom.href = URL.createObjectURL(blob);
        dom.dispatchEvent(evt);
        dom.click();
        // URL.revokeObjectUrl(dom.href);
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
    }
}

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
        condition.headers = { 'Content-Type':contentType };
        if(data != undefined) {
            condition.data = (contentType === 'application/json') ? JSON.stringify(data) : data;
        }
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
    common: common,
    http: http,

    /**
     * 获取table中选中行的数据
     * @param  {Obj}      data         table中的数据
     * @param  {Obj}      selection    选中项的数据
     * @param  {String}   name         选中项的name
     * @return {Array}  返回选中项的行数集合
     */
    getSelectList: (data, selection, id) => {
        let index = [];
        for(let item of selection) {
            for(let i=0; i<data.length; i++) {
                if(item[id] === data[i][id]) {
                    index.push(i);
                }
            }
        }
        return index;
    },
    /**
     * 获取table中编辑的行号
     * @param  {Obj}        data            总数据
     * @param  {String}     id              指定的数据中的id
     * @param  {String}     nameId          在data里面id名称
     * @return {Num}        返回编辑的行数
     */
    getEditRowNum: (data, id) => {
        let editRow = 0;
        for(let item of data) {
            if(item.id === id) {
                return editRow
            } else {
                editRow++;
            }
        }
        return editRow;
    },
    getEditNum: (data, nameId, id) => {
        let editRow = 0;
        for(let item of data) {
            if(item[nameId] === id) {
                return editRow
            } else {
                editRow++;
            }
        }
        return editRow;
    },
}

export default util;
