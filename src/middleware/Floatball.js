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
    PanResponder,
    ScrollView,//页面滚动组件 （默认 一个页面长度大于手机的长度，使用这个组件）
} from 'react-native'

// Dimensions 用于获取设备宽、高、分辨率
const { width, height } = Dimensions.get('window')

// Actions表示要进行路由的JS操作了,可以跳特到新路由
import { Actions } from 'react-native-router-flux'
import ActionButton from 'react-native-action-button';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
    cont:{
        position: 'absolute',
        // top: 600,
        // left: 280,
        top: height*0.35,
        left: height*0.04,
        // right:height*0.04,
        width:width*0.15,
        height:height*0.55,
        zIndex: 99,
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
        this.state = {
            left: 10,
            top: -15
        }
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (e, gestureState) => {
                this.touchX = this.state.left;
                this.touchY = this.state.top;
            },
            onPanResponderMove: (e, g) => {
                let left = this.touchX + g.dx;
                let top = this.touchY + g.dy;
                console.log(left, top);
                if(left >= (width - 15)) {
                    left = (width - 15);
                }
                if(left <= -15) {
                    left = -15
                }
                if(top <= -15) {
                    top = -15;
                }
                if(top >= 185) {
                    top = 185
                }

                this.setState({
                    left: left,
                    top: top
                })
            },
            onPanResponderRelease: (e, g) => {
                this.touchX = this.state.left;
                this.touchY = this.state.top;
            }
        });
    }

    render() {
        return (
                // <View style={{
                //     width:width*0.3,
                //     height:height*0.5,
                //     position: "absolute",
                //     left: this.state.left,
                //     top: this.state.top,
                //     zIndex: 99,
                //     backgroundColor: 'red',
                //     }} {...this._panResponder.panHandlers}
                // >
                <View style={styles.cont} >
                    {/* 浮框 */}
                    {/* icon 地址 https://oblador.github.io/react-native-vector-icons/ */}
                    <ActionButton buttonColor='#17C6AC'
                        size={50}   
                        offsetY={3} 
                        offsetX={3} 
                        // onPress={() => { console.log('你点了我！')}}
                        renderIcon={() => (
                            <View style={styles.actionButtonView}>
                                <Icon name="plus" style={[styles.actionButtonIcon,{fontSize: 40,}]} />
                                {/* <Text style={{color:"#ffffff"}}>新增</Text> */}
                            </View>)
                        }
                    >
                        {/* CreateDynamic  title="编写分享"*/}
                        <ActionButton.Item buttonColor='#17C6AC' size={40}  onPress={() => { Actions.createdynamic() }}>
                            <Icon name="form" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        {/* Ranking List  title="动态"*/}
                        <ActionButton.Item buttonColor='#17C6AC' size={40}  onPress={() => { Actions.homeInfo() }}>
                            <Icons name="hotjar" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        {/* Ranking List  title="排行榜"*/}
                        <ActionButton.Item buttonColor='#17C6AC' size={40}  onPress={() => { Actions.rank() }}>
                            <Icon name="bars" style={styles.actionButtonIcon} />
                        </ActionButton.Item>                   
                        {/* Personal Direction title="个人统计"*/}
                        <ActionButton.Item buttonColor='#17C6AC' size={40}  onPress={() => { Actions.trend() }}>
                            <Icon name="linechart" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        {/* Personal Center title="个人中心"*/}
                        <ActionButton.Item buttonColor='#17C6AC' size={40}  onPress={() => { Actions.personaltwo() }}>
                            <Icon name="user" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                    </ActionButton>
                </View>
        )
    }

}