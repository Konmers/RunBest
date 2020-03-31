//  onpress 防止多次点击 https://www.jianshu.com/p/e8ae1c9372ab
const preventDoublePress = {
    lastPressTime: 1,  //  上次点击时间  
    onPress(callback,wait=500) {
        let curTime = Date.now();
        if (curTime - this.lastPressTime > wait) {
            this.lastPressTime = curTime;
            callback();
        }
    },
};
export{
    preventDoublePress
}