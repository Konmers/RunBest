import React, {Component} from 'react';
import {AppRegistry,StyleSheet,View,Text,TouchableOpacity,DeviceEventEmitter} from 'react-native';
import Picker from 'react-native-picker';

class DatePicker extends Component{
   
    componentDidMount(){
      var self = this;
      //通知开始，获取到val  生日，调用setState 方法，刷新状态机，这时候实时的刷新了‘我的’图标
      this.listener = DeviceEventEmitter.addListener('birthday',function(val){
          self.setState({
            currentDate:val
          })
      });
    }
    //最后别忘了移除通知
    componentWillUnmount(){
        this.listener.remove();
    }


    constructor(props){
      super(props);
      this.state = {
        // currentDate:this._getCurrentDate(),// 获取当前时间
        currentDate:this.props.child// this.props.child 父级页面 默认传值
      }      
    }
    //获取当前日期  格式如 2018-12-15
    _getCurrentDate(){
      var currDate = new Date()
      var year = currDate.getFullYear()
      var month = (currDate.getMonth()+1).toString()
      month = month.padStart(2,'0')
      var dateDay = currDate.getDate().toString()
      dateDay = dateDay.padStart(2,'0')
      let time = year+'-'+month+'-'+dateDay
      return time;
    }
    //组装日期数据
    _createDateData(){
      let date = [];
      var currDate = new Date()
      var year = currDate.getFullYear()
      var month = currDate.getMonth()+1
      for(let i=1970;i<=year;i++){
          let month = [];
          for(let j = 1;j<13;j++){
              let day = [];
              if(j === 2){
                  for(let k=1;k<29;k++){
                      day.push(k+'日');
                  }
                  //Leap day for years that are divisible by 4, such as 2000, 2004
                  if(i%4 === 0){
                      day.push(29+'日');
                  }
              }
              else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                  for(let k=1;k<32;k++){
                      day.push(k+'日');
                  }
              }
              else{
                  for(let k=1;k<31;k++){
                      day.push(k+'日');
                  }
              }
              let _month = {};
              _month[j+'月'] = day;
              month.push(_month);
          }
          let _date = {};
          _date[i+'年'] = month;
          date.push(_date);
      }
      return date;
    }

    //打开日期选择 视图
    _showDatePicker() {
      var year = ''
      var month = ''
      var day = ''
      var dateStr = this.state.currentDate
      //console.log('dateStr',dateStr)
      year = dateStr.substring(0,4)
      month = parseInt(dateStr.substring(5,7))
      day = parseInt(dateStr.substring(8,10))
      Picker.init({
        pickerTitleText:'时间选择',
        pickerCancelBtnText:'取消',
        pickerConfirmBtnText:'确定',
        selectedValue:[year+'年',month+'月',day+'日'],
        pickerBg:[255,255,255,1],
        pickerData: this._createDateData(),
        pickerFontColor: [33, 33 ,33, 1],
        onPickerConfirm: (pickedValue, pickedIndex) => {
            var year = pickedValue[0].substring(0,pickedValue[0].length-1)
            var month = pickedValue[1].substring(0,pickedValue[1].length-1)
            month = month.padStart(2,'0')
            var day = pickedValue[2].substring(0,pickedValue[2].length-1)
            day = day.padStart(2,'0')
            let str = year+'-'+month+'-'+day
            this.setState({
              currentDate:str,
            })
        },
        //取消日期
        onPickerCancel: (pickedValue, pickedIndex) => {
            console.warn('11111111111111')
            let chooseDate = ''
            pickedValue.map((item,i)=>{
                chooseDate+=item
            })
            chooseDate=chooseDate.replace(/(\d{4}).(\d{1,2}).(\d{1,2})./, '$1-$2-$3');  
            // console.warn('onPickerCancel chooseDate------- ', chooseDate);
            // console.warn('onPickerCancel------- ', pickedValue, pickedIndex);
            this.setState({currentDate:chooseDate})
        },

        //选中 日期
        onPickerConfirm: (pickedValue, pickedIndex) => {
            console.warn('222222222222222')
            let chooseDate = ''
            pickedValue.map((item,i)=>{
                chooseDate+=item
            })
            chooseDate=chooseDate.replace(/(\d{4}).(\d{1,2}).(\d{1,2})./, '$1-$2-$3');  
            // console.warn('onPickerConfirm chooseDate------- ', chooseDate);
            // console.warn('onPickerConfirm------- ', pickedValue, pickedIndex);
            this.setState({currentDate:chooseDate})
        },
        //显示当前日期
        onPickerSelect: (pickedValue, pickedIndex) => {
          console.warn('333333333333333')
            let chooseDate = ''
            pickedValue.map((item,i)=>{
                chooseDate+=item
            })
            chooseDate=chooseDate.replace(/(\d{4}).(\d{1,2}).(\d{1,2})./, '$1-$2-$3');  
            // console.warn('onPickerSelect chooseDate------- ', chooseDate);
            // console.warn('onPickerSelect----- ', pickedValue, pickedIndex);
            this.setState({currentDate:chooseDate})
        }
      });
      Picker.show();
    }
    render(){
      console.log('this.state.currentDate--------  ',this.state.currentDate)
      return(
        <View style={styles.container}>
          <View style={styles.content}>
            {/* <Text style={styles.textStyle}>选择日期</Text> */}
            <TouchableOpacity onPress={()=>this._showDatePicker()}>
              <Text style={styles.textStyle}>{this.state.currentDate}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
  const styles = StyleSheet.create({
    textStyle:{
      fontFamily: 'DIN alternate',
      fontSize: 15,
      color: '#999999' 
    },
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    content:{
      width:'100%',
      flexDirection:'row'
    }
   
  })
  
  export default DatePicker;
