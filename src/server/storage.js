//必须在使用storage前注册，建议放在入口文件里，例如index.android.js
// import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

global.localStorage = AsyncStorage;   //全局变量

class Storage {
  //存储
  static add = (key, value) =>{
    console.log('key add---------  ',key)
    console.log('value add---------  ',value)
    return localStorage.setItem(key, JSON.stringify(value));
  }

  //获取
  static get = async (key) =>{
    return localStorage.getItem(key).then((value) => {
      console.log('value--------  ',value)
      console.log('JSON.parse(value)--------  ',JSON.parse(value))
      return JSON.parse(value);
    });
  }

  //修改
  static set = (key, value) =>{
    return get(key).then((item) => {
      value = typeof value === 'string' ? value : Object.assign({}, item, value);
      return localStorage.setItem(key, JSON.stringify(value));
    });
  }

  //删除
  static delete = (key) =>{
    return localStorage.removeItem(key);
  }
}

export default Storage
