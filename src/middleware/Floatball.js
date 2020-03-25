//页面 菜单浮标
import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableHighlight,//选中跳转
    TouchableOpacity,
    ScrollView,//页面滚动组件 （默认 一个页面长度大于手机的长度，使用这个组件）
} from 'react-native'

// Dimensions 用于获取设备宽、高、分辨率
const { width, height } = Dimensions.get('window')

// Actions表示要进行路由的JS操作了,可以跳特到新路由
import { Actions } from 'react-native-router-flux'
import ActionButton from 'react-native-action-button';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
    cont:{
        zIndex:99,
        position: 'absolute',
        // top: 600,
        // left: 280,
        top: height*0.5,
        // left: height*0.43,
        right:-height*0.01,
        width:width*0.2,
        height:height*0.52,
        // backgroundColor: 'red',
        // backgroundColor: 'transparent',
    },
    ActionButtonView:{
        // backgroundColor:'transparent',
        // backgroundColor:'#000000'
    },
    actionButtonIcon: {
        backgroundColor:'transparent',
        position:'relative',
        fontSize: 25,
        color: 'white',
    },
})


export default class Floatball extends Component {
    constructor (props) {
        super(props)  
        this.state = {}
    }
    render() {
        return (
            <View style={styles.cont}>
                {/* 浮框 */}
                {/* icon 地址 https://oblador.github.io/react-native-vector-icons/ */}
                <ActionButton buttonColor='#17C6AC' size={50}  
                    //  onPress={() => { alert('你点了我！')}}
                    renderIcon={() => (
                        <View style={styles.actionButtonView}>
                            <Icon name="plus" style={styles.actionButtonIcon} />
                            {/* <Text style={{color:"#ffffff"}}>新增</Text> */}
                        </View>)
                    }
                >
                    {/* CreateDynamic  title="编写分享"*/}
                    <ActionButton.Item buttonColor='#17C6AC'  onPress={() => { Actions.createdynamic() }}>
                        {/* //md-create */}
                        {/* <Icon name="md-list" style={styles.actionButtonIcon} /> */}
                        <Icon name="form" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    {/* Ranking List  title="排行榜"*/}
                    <ActionButton.Item buttonColor='#17C6AC'  onPress={() => { Actions.rank() }}>
                        {/* //md-create */}
                        {/* <Icon name="md-list" style={styles.actionButtonIcon} /> */}
                        <Icon name="bars" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    {/* Personal Direction title="个人统计"*/}
                    <ActionButton.Item buttonColor='#17C6AC'  onPress={() => { Actions.trend() }}>
                        {/* <Icon name="md-notifications-off" style={styles.actionButtonIcon} /> */}
                        <Icon name="linechart" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    {/* Personal Center title="个人中心"*/}
                    <ActionButton.Item buttonColor='#17C6AC'  onPress={() => { Actions.personal() }}>
                        {/* <Icon name="md-person" style={styles.actionButtonIcon} /> */}
                        <Icon name="user" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        )
    }

}