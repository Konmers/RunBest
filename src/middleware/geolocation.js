import React from "react";
import {
  init,
  Geolocation,
  setInterval,
  setNeedAddress,
  setLocatingWithReGeocode
} from 'react-native-amap-geolocation';
// if(Platform.OS == 'ios'){
//   this.getPosition();
// }else{
//   const permissions = [
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//   ]
//   const granteds = await PermissionsAndroid.requestMultiple(permissions);
//   if (granteds["android.permission.ACCESS_FINE_LOCATION"] === "granted") {
//      this.getPosition();
//   } else {
//      Toast.info("定位权限被禁止")
//   }
// }
// setInterval2000 = () => setInterval(2000);
// setInterval10000 = () => setInterval(10000);
// setNeedAddressTrue = () => setNeedAddress(true);
// setNeedAddressFalse = () => setNeedAddress(false);
// setLocatingWithReGeocodeTrue = () => setLocatingWithReGeocode(true);
// setLocatingWithReGeocodeFalse = () => setLocatingWithReGeocode(false);

//初始化sdk
const getLocationInit = async ()  =>{
     // 对于 Android 需要自行根据需要申请权限
    if (Platform.OS === "android") {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
    }
    //设置高德key
    await init({
        ios: "9bd6c82e77583020a73ef1af59d0c759",
        android: "197b73efee86541c847e91c6f8fa9620"
    });
}

//只获得一次当前地理位置
const getCurrentPosition = async () =>{
    //设置高德key
    await init({
        ios: "9bd6c82e77583020a73ef1af59d0c759",
        android: "197b73efee86541c847e91c6f8fa9620"
    });
    let getLocation = {}
    Geolocation.getCurrentPosition(position=>{
        getLocation = position
        console.log('getLocation-coords------- ',getLocation.coords)
        console.log('getLocation-location------- ',getLocation.location)
    });
    return getLocation.coords
}

//注册一个监听，它会每隔一段时间返回当前地理位置
const getWatchPosition = async (value) =>{
    //设置高德key
    await init({
        ios: "9bd6c82e77583020a73ef1af59d0c759",
        android: "197b73efee86541c847e91c6f8fa9620"
    });
    let getwatchLocation = {}
    Geolocation.watchPosition(position=>{
        getwatchLocation = position
        console.log('getwatchLocation-coords------- ',getwatchLocation.coords)
        console.log('getwatchLocation-location------- ',getwatchLocation.location)
    });
    return getwatchLocation.coords
}

export {
    getLocationInit,
    getCurrentPosition,
    getWatchPosition
  }

