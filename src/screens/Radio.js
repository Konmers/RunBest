import React,{Component} from 'react'
import {
	View,
	StyleSheet,
	Navigator,
	TouchableHighlight,
	Text,
	ScrollView,
	Image,
    ListView,
    Dimensions,
} from 'react-native'
var width=Dimensions.get('window').width;
var height=Dimensions.get('window').height;
import RadioModal from 'react-native-radio-master';
var datas= [
            {
              "selecteId": 13,
              "content": "Apple",
              "selected": false
            },
            {
              "selecteId": 14,
              "content": "Banana",
              "selected": false
            },
            {
              "selecteId": 15,
              "content": "Orange",
              "selected": false
            },
            {
              "selecteId": 16,
              "content": "Watermelon",
              "selected": true
            },
            {
              "selecteId": 17,
              "content": "Grape",
              "selected": false
            }
          ]	  

class RadioDemo extends Component{
	constructor(props){
		super(props);
		this.state = {
            language:datas[3].selecteId,
            item:datas[3].content,
            initItem:'选项a',
            initId:'0'
        };
	}
	render(){
        console.warn('datas[3]--------  ',datas[3])
        console.warn('datas[3].content--------  ',datas[3].content)
        console.warn('datas[3].selecteId--------  ',datas[3].selecteId)
		return (
			<View style={{padding:20,flex:1,flexDirection:'column'}}>
			    <Text style={{backgroundColor:'#ffffff',color:'#414141',padding:5,}}>
			      The selected:<Text style={{color:'#ff0000'}}>{this.state.item}</Text>	 
			    </Text>	 
			    <Text style={{backgroundColor:'#ffffff',color:'#414141',padding:5,}}>	 
	                       Unique identification：<Text style={{color:'#ff0000'}}>{this.state.language}</Text>
			    </Text>
			    <RadioModal
				options={{id:'selecteId',value:'content',disabled:'selected'}}
				innerStyle={{width:(width-80)/2}}
				txtColor={'#000000'}
				noneColor={'#efefef'}
				selectedValue={this.state.language}
				onValueChange={(id,item) => this.setState({language: id,item:item})}
				seledImg={require('../public/Iamge/Check/chooseChange.png')}
				selImg={require('../public/Iamge/Check/choose.png')}
				// selnoneImg={require('./imgs/selectnone.png')}
				dataOption={datas}
				style={{ flexDirection:'row',
					flexWrap:'wrap',
					alignItems:'flex-start',
					flex:1,
					backgroundColor:'#ffffff',padding:5,marginTop:10
				}} 
			     />
		   </View>

		);
	}
}

export default RadioDemo;