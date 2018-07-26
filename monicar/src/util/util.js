import axios from 'axios';
import Message from 'iview/src/components/message';

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
};

const cors = (url, callback) => {       //cors跨域
    let xhr = new XMLHttpRequest();
    if (xhr.withCredentials === undefined) return false;
    xhr.open("get", url);
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        if (xhr.status === 200) {
            let res = JSON.parse(xhr.responseText);
            callback(res);
        } else {
            Message.error('查询失败！');
        }
    }
    xhr.send();
};

const http = {          //代理跨域
    get: (url) => {
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
    }
};

const util = {
    common: common,
    http: http,
    cors: cors
}

export default util;