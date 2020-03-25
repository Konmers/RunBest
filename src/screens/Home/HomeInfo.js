//首页
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

import SplashScreen from 'react-native-splash-screen'

// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';


import Floatball from "../../middleware/Floatball.js"

import Share from 'react-native-share';

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        alignContent: 'center',
    },
    contView: {
        flex: 1,
        // width: '90%',
        flexDirection: 'column',
        //     borderRadius:5,
        //     shadowColor:'#000000',
        //     shadowOpacity:0.9,
        //     shadowRadius:10,
        //     elevation: 5,//设置此项Android显示阴影，只能是灰色阴影，不支持其他颜色设置（Android） 
        backgroundColor: 'white',
        // marginVertical: 10,
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor:'#c1c1c1',
        // paddingBottom: 10,
    },
    contViews: {
        flex: 1,
        width: '90%',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
    },
    userInfo: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    useTime: {
        fontSize: 20
    },
    userImg: {
        width: 35,
        height: 35,
        borderRadius: 5,
        marginRight: 10
    },
    userName: {
        fontSize: 16
    },
    userAddress: {
        fontSize: 12,
        // color: '#D2D2D2'
        color: '#999999'
    },
    contentInfo: {
        flex: 1,
        width: '90%',
        flexDirection: 'column',
        marginTop: 3,
        // marginVertical: 10,
        // marginHorizontal: 5,
        // alignItems: 'center',
        // alignContent: 'center',
        // paddingHorizontal: 10,
        // backgroundColor: 'rgba(0,0,0,.5)'
    },
    contentInfoTitle: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#000000',
        marginVertical: 3,
    },
    contentInfoCons: {
        fontSize: 14,
        marginBottom: 5,
    },
    contentInfoImg: {
        width: width * 0.9,
        height: height * 0.3,
        borderRadius:5,
    },
    cellFooter: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: '#dddddd',
        // marginTop:5
        marginVertical:10
    },
    footerBox: {
        flexDirection: 'row',
        backgroundColor: 'white',
        flex: 1,
        marginLeft: 1,
        alignItems:'center',
    },
    boxIcon: {
        color: '#333',
        paddingRight: 25
    },
    boxText: {
        fontSize: 14,
        color: '#333',
        // paddingLeft: 12,
        // marginTop: 2
    },
    up: {
        color: '#FF6666',
        paddingRight: 25
    },
    down: {
        color: '#333',
        paddingRight: 25
    }
})

class HomeInfo extends Component {
    componentDidMount() {
        //3秒后关闭启动页
        setTimeout(() => { SplashScreen.hide() }, 1000)
    };
    constructor(props) {
        super(props)
        this.state = {
            list: [
                {
                    id:'111111',
                    name: '张三',
                    address: '重庆',
                    time: 3,
                    avatar: require('../../public/Iamge/Head/10.jpg'),
                    title: '震惊！！撒谎记得发哈史蒂夫婚纱',
                    content: '受到警方还撒谎地方客设计的风口浪尖啊上岛咖啡是否健康搭街坊立刻据了解撒旦户介绍的方式快点发货开杀毒和飞机撒肯定恢复计划时间到货付款',
                    contetnImage: require('../../public/Iamge/Banner/banner_1.jpg'),
                    pageView: 0,//浏览量
                    like: 1,//点赞 1.true  0.flase 
                    comment: 'sdfsadf'//评论
                },
                {
                    id:'111112',
                    name: '李四',
                    address: '四川',
                    time: 6,
                    avatar: require('../../public/Iamge/Head/12.jpg'),
                    title: '震惊！！撒谎哒哒哒哒哒哒',
                    content: '',
                    contetnImage: require('../../public/Iamge/Banner/banner_4.jpg'),
                    pageView: 0,//浏览量
                    like: 0,//点赞 1.true  0.flase 
                    comment: 'sdfsadf'//评论
                },
                {
                    id:'111113',
                    name: '王五',
                    address: '成都',
                    time: 31,
                    avatar: require('../../public/Iamge/Head/4.jpg'),
                    title: '',
                    content: '受到警方还撒谎地方客户介绍的方式快点发货开杀毒和飞机撒肯定恢复计划时间到货付款',
                    contetnImage: '',
                    pageView: 0,//浏览量
                    like: 1,//点赞 1.true  0.flase 
                    comment: 'sdfsadf'//评论
                },
                {
                    id:'111114',
                    name: '赵六',
                    address: '北京',
                    time: 3,
                    avatar: require('../../public/Iamge/Head/11.png'),
                    title: '震惊！！撒谎记得发哈史蒂夫婚纱',
                    content: '受到警方还撒谎地方客户介绍司法鉴定喀什假大空犯了杀戒弗兰克的方式快点发货开杀毒和飞机撒肯定恢复计划时间到货付款',
                    contetnImage: require('../../public/Iamge/Banner/banner_7.jpg'),
                    pageView: 0,//浏览量
                    like: 0,//点赞 1.true  0.flase 
                    comment: 'sdfsadf'//评论
                },
                {
                    id:'111115',
                    name: '田七',
                    address: '上海',
                    time: 3,
                    avatar: require('../../public/Iamge/Head/13.jpg'),
                    title: '震惊！！撒谎记得发哈史蒂夫婚纱',
                    content: '',
                    contetnImage: require('../../public/Iamge/Banner/banner_6.jpeg'),
                    pageView: 0,//浏览量
                    like: 1,//点赞 1.true  0.flase 
                    comment: 'sdfsadf'//评论
                }
            ]
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.cont}>
                        {
                            this.state.list.map((item, i) =>
                                <View style={styles.contView} key={i}>
                                    <View style={styles.contViews}>
                                        <View style={styles.userInfo}>
                                            <Image style={styles.userImg} source={item.avatar} />
                                            <View>
                                                <Text style={styles.userName}>{item.name}</Text>
                                                <Text style={styles.userAddress}>{item.address}</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.useTime}>{item.time}h</Text>
                                    </View>
                                    <TouchableOpacity style={styles.contentInfo} onPress={() => this.getVideoList(i)}>
                                        {
                                            item.title ? (<Text style={styles.contentInfoTitle}>{item.title}</Text>) : null
                                        }
                                        {
                                            item.content ? (
                                                <Text
                                                    style={styles.contentInfoCons}
                                                    numberOfLines={2} //行数
                                                    ellipsizeMode='tail' //末尾 ...
                                                >
                                                    {/* &emsp;&emsp;{`${item.content}`} */}
                                                    {item.content}
                                                </Text>) : null
                                        }
                                        {
                                            item.contetnImage ? (<Image style={styles.contentInfoImg} source={item.contetnImage} />) : null
                                        }
                                    </TouchableOpacity>

                                    {/*浏览量&点赞&评论&分享*/}
                                    <View style={styles.cellFooter} >
                                        {/* 浏览量 */}
                                        <View style={styles.footerBox} >
                                            {/*浏览量文字*/}
                                            <Text style={styles.boxText}>浏览量：{item.pageView}</Text>
                                        </View>
                                        <View style={[styles.footerBox,{justifyContent:'flex-end'}]}>
                                            {/*点赞*/}
                                            {/* <View style={styles.footerBox} > */}
                                                <Icon
                                                    name={item.like == 1 ? "heart": "hearto"}
                                                    size={20}
                                                    onPress={() => this._likeCase(item.id,item.like)}
                                                    style={item.like == 1 ? styles.up : styles.down}
                                                />
                                                {/*点赞文字*/}
                                                {/* <Text style={styles.boxText} onPress={this._up}>点赞</Text> */}
                                            {/* </View> */}

                                            {/*评论*/}
                                            {/* <View style={styles.footerBox}> */}
                                                <Icon name="message1"
                                                    size={20}
                                                    style={styles.boxIcon}
                                                    // onPress={() => this._Share(item)}
                                                />
                                                {/*评论文字*/}
                                                {/* <Text style={styles.boxText}>评论</Text> */}
                                            {/* </View> */}

                                            {/* 分享 */}
                                            {/* <View style={styles.footerBox}> */}
                                                <Icon name="sharealt"
                                                    size={20}
                                                    style={styles.boxIcon,{paddingRight: 10}}
                                                />
                                                {/*分享文字*/}
                                                {/* <Text style={styles.boxText}>评论</Text> */}
                                            {/* </View> */}
                                        </View>
                                    </View>

                                </View>
                            )
                        }
                    </View>
                </ScrollView>
                <Floatball/> 
            </View>
        )
    }

    getVideoList = () => {
        // console.warn('wwwwwwwwwww')
        // Actions.videodetail({id:10}) //传参
        Actions.videodetail()// 空传参
    }

    getVideoListsz = () => {
        // console.warn('wwwwwwwwwww')
        // Actions.videodetail({id:10}) //传参
        Actions.videodetail()// 空传参
    }

    //点赞
    _likeCase = (id,value) =>{
        console.log('dddddd')
        console.log('id----  ',id,'val----- ',value)
        const listData = [...this.state.list] //复制数组--浅拷贝
        //修改对象中某元素值
        this.setState({
            list:listData.map((item,index) => item.id === id ?{...item, like: value ? 0 : 1 } : item ),
        })
    }

    //Share
    _Share = (user) =>{
        console.warn('user-------   ',user)
        Actions.createdynamic({user})
    }
}

export default HomeInfo; 