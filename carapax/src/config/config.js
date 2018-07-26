import info from './info';
import menuList from './menuList';

const demoBaseUrl = {
    keyauth: 'http://192.168.207.20:6749',
    gateway: 'http://192.168.207.33:8080',
    valuka: 'http://192.168.207.32:8080',
    dispatchCenter: 'http://192.168.207.18:8080',
    dataMonitor: 'http://192.168.103.30:8080'
};

const testBaseUrl = {
    keyauth: 'http://192.168.103.26:6749',
    gateway: 'http://192.168.103.13:8080',
    valuka: 'http://192.168.207.32:8080',   //暂时没用
    dispatchCenter: 'http://192.168.103.35:8080',
    dataMonitor: 'http://192.168.103.30:8080'
};



const timer = {
    DEVICE: 1000,
    PROXY: 5000
}

const config = {
    baseUrl: testBaseUrl,
    menuList: menuList,
    info: info,
    timer: timer,
};

export default config;
