// 个人中心
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  TouchableHighlight,//选中跳转
  TouchableOpacity,
  ScrollView,//页面滚动组件 （默认 一个页面长度大于手机的长度，使用这个组件）
} from 'react-native'

//时间
import dayjs from 'dayjs'

// Actions表示要进行路由的JS操作了,可以跳特到新路由
import { Actions } from 'react-native-router-flux'

//tab component 选项卡
import ScrollableTabView,{DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';

// Dimensions 用于获取设备宽、高、分辨率
const { width,height } = Dimensions.get('window')
var ScreenWidth = Dimensions.get('window').width;

import Floatball from "../../middleware/Floatball.js"
import api from '../../server/api'
import storage from '../../server/storage'

// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';

//swiper banner滚动
import Swiper from 'react-native-swiper'

//计算时间
import {timeStamp} from '../../middleware/Computationtime.js';

import { Toast } from 'teaset'

const styles = StyleSheet.create({
    Title:{
      width,
      height: height*0.08,
      textAlign: 'center',
      lineHeight: height*0.06,
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    //   borderBottomStyle: 'solid',
    //   borderBottomWidth: 2,
    //   borderBottomColor: 'red'
    },
    Toptext:{
      textAlign: 'center',
      fontSize: 20,
      color: '#333',
    },
    Share:{
      position:'absolute',
      right: 15
    },
    content:{
        width,
        height,
        backgroundColor: '#f0f0f0'  //底色
    },
    weatherStyle:{
        width,
        height: '8%',
        backgroundColor: 'white'
    },
    weatherView:{
        position:'absolute',
        left: 0,
        width:'30%',
        height: '100%',
        padding:0,
        // flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor:'blue'
    },
    weatherImg:{
        width: 50,
        height: 50,
    },
    avatar:{
        width,
        height: height*0.3,
        alignItems: 'center',
        justifyContent:'center',
        //resizeMode.cover：图片居中显示，没有被拉伸，超出部分被截断；
        //resizeMode.contain：容器完全容纳图片，图片等比例进拉伸；
        //resizeMode.stretch： 图片被拉伸适应容器大小，有可能会发生变形。
        resizeMode:'contain',
        // backgroundColor:'rgba(0,0,0,100)'  
    //    backgroundColor: 'white',
    },
    ViewImg:{
        width: 80,
        height: 80,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        borderWidth:3,
        borderColor:'white',
        overflow: 'hidden'
    },
    ViewText:{
        marginTop:20,
        fontSize: 25,
        justifyContent:'center',
        // fontFamily:'MAK Freeset Bold',
        // fontFamily:'Coda-Heavy-webfont',
        fontFamily:'JockeyOne-Regular-webfont',
        // color: '#333'
        color: '#fff',
        // backgroundColor:'red'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    lineStyle: {
        width: ScreenWidth / 3,
        height: 5,
        backgroundColor:'#17C6AC'
    },
    tabStyle: {
        flex: 1,
        marginBottom: 40,
        backgroundColor:'#ddd'
    },
    //-------------
    contView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        marginVertical:5
    },
    contViews: {
        flex: 1,
        width: '90%',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        borderRadius:5,
    },
    userInfo: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    useTime: {
        fontSize: 16
    },
    userImg: {
        width: 35,
        height: 35,
        borderRadius: 20,
        borderWidth:1,
        borderColor:'#f1f1f1',
        marginRight: 10
    },
    userName: {
        color: '#000000',
        fontWeight:"bold",
        fontSize: 16
    },
    userAddress: {
        fontSize: 12,
        color: '#999999'
    },
    contentInfo: {
        flex: 1,
        width: width*0.9,
        flexDirection: 'column',
        marginTop: 3,
        paddingBottom:10,
        borderBottomWidth:1,
        borderBottomColor:'#CCC',
    },
    contentInfoTitle: {
        fontSize: 18,
        // fontStyle: 'italic',
        color: '#000000',
        marginVertical: 3,
    },
    contentInfoCons: {
        fontSize: 14,
        marginBottom: 5,
    },    
    wrapper: {
        // backgroundColor: 'black',
        height: height*0.3,
        borderRadius:5,
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
        // backgroundColor: 'white',
        flex: 1,
        marginLeft: 1,
        alignItems:'center',
    },
    footerBoxview: {
        width:width*0.1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'red',
        marginHorizontal:3
    },
    boxIcon: {
        color: '#333',
        paddingRight: 5
    },
    boxText: {
        fontSize: 14,
        color: '#333',
        // paddingLeft: 12,
        // marginTop: 2
    },
    up: {
        color: '#FF6666',
        paddingRight: 3,
    },
    down: {
        color: '#333',
        paddingRight: 3
    },
    endTxt:{
        marginVertical:5
    },
    footer: {
        flexDirection: 'row',
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
    },
    hidden:{
        display:'none'
    }
})

class Personal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userList:{},
            list:[],
            pageNo:1,      //控制页数
            showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            isRefreshing: false,//下拉控制
            totalPage:1,
            uid:'',
            likeList:[],
            communtList:[],
            dynamicList:[]
        }
        this.nowHour = dayjs().hour() 
    }

    // let nowDate = dayjs().format("YYYY-MM-DD HH:mm:ss")
    weather(){
        // console.warn('nowHour-------- ',this.nowHour)
        if(6 <= this.nowHour&&this.nowHour < 12)
        {
            return (<View style={styles.weatherView}>
                        <Image style={styles.weatherImg} source={require('../../public/Iamge/Else/sun.gif')} />
                        <Text>上午好~</Text>
                    </View>)
        }
        else if(12 <= this.nowHour&&this.nowHour < 19)
        {
            return (<View style={styles.weatherView}>
                        <Image style={styles.weatherImg} source={require('../../public/Iamge/Else/sun.gif')} />
                        <Text>下午好~</Text>
                    </View>)
        }
        else
        {
            return (<View style={styles.weatherView}>
                        <Image style={styles.weatherImg} source={require('../../public/Iamge/Else/moon.gif')} />
                        <Text>晚上好~</Text>
                    </View>)
        }
    }

    //初始化
    componentDidMount = async () =>{
        const user = {uid:await storage.get('uid')}
        api.user.loginInfo(user).then((data) => {
            console.log('data-----  ',data)
            console.log('userinfo msg-----  ',data.msg)
            if(data.type == 'success')
            {
                this.setState({userList:data.list});
            }
            else
            {
                console.log('2222')
            }
        }) 

        const formData = {
            uid:await storage.get('uid'),
            page:1,
            limit:3
        }

        await api.dynamic.userDynamicList(formData).then((data) => {
            // console.log('data 111--------  ',data)
            if(data.type == 'success')
            {
              this.setState({list:data.list,pageNo:data.page,totalPage:data.pages});
            }
            else
            {
              console.log('333')
            }
        }) 
    }

    render() { 
        return ( 
            <View style={{flex:1}}>
                <View style={styles.Title}>
                    {this.weather()}
                    <Text style={styles.Toptext}>Personal</Text>
                    <TouchableOpacity  style={styles.Share} onPress={this.onPress}> 
                        <Image style={{width:30,height: 30}} source={require('../../public/Iamge/Else/seting.png')} />
                    </TouchableOpacity >
                </View>
                <View style={styles.content}>
                    {/* <View style={styles.weatherStyle}>
                    {this.weather()}
                    </View> */}
                    <ImageBackground style={styles.avatar}  
                        source={require('../../public/Iamge/Banner/banner_4.jpg')}
                    >
                        <View style={styles.ViewImg}>
                            <Image style={{width:'100%',height:'100%'}} source={{uri:this.state.userList.avatar}} />
                        </View>
                        <Text onPress={() => this.getUserinfo('sdfsd')}  style={styles.ViewText}>{this.state.userList.username}<Image style={{width:20,height: 20}} source={require('../../public/Iamge/Else/edit_1.png')} /> </Text>
                    </ImageBackground>
                    <ScrollableTabView
                        style={styles.container}
                        renderTabBar={() => <DefaultTabBar />}
                        tabBarUnderlineStyle={styles.lineStyle}
                        tabBarActiveTextColor='#17C6AC' // choose color
                    >
                        <View style={styles.tabStyle} tabLabel='Dynamic'>
                            <FlatList
                                data={this.state.list}
                                renderItem={this._renderItemView}
                                //添加尾巴布局
                                ItemSeparatorComponent={this._separator}
                                ListFooterComponent={this._renderFooter.bind(this)}
                                //从下往上拉去的时候加载更多
                                onEndReached={this._onEndReached.bind(this)}
                                onEndReachedThreshold={0.2}
                                //关于下拉刷新
                                onRefresh={this._onRefresh.bind(this)}
                                refreshing={this.state.isRefreshing}
                            />
                        </View>
                        <View style={styles.tabStyle} tabLabel='Communtlike'>
                        </View>
                        <View style={styles.tabStyle} tabLabel='Like'>
                        </View>
                    </ScrollableTabView>
                </View>
                <Floatball/> 
            </View>
         );
    }

    onPress = () => {
        console.warn('ddddd') 
    };
    getUserinfo = (value) =>{
        // console.warn('wwwwwwwwwww')
        // Actions.videodetail({id:10}) //传参
        Actions.userinfo({id:value})// 空传参
        // Actions.radio() //空传参
        // Actions.datetimepicker() //空传参
    }

    //显示FlatList的布局
    _renderItemView=({ item })=>{
        // console.log('item---------- ',item)
        return(
            <View style={item   == '' ? styles.hidden :''}>
                {/* <View style={styles.cont}> */}
                    <View style={styles.contView} >
                        <View style={styles.contViews}>
                            <View style={styles.userInfo}>
                                {/* <Image style={styles.userImg} source={item.avatar} /> */}
                                <Image style={styles.userImg} source={{uri:item.avatar}} />
                                <View>
                                    <Text style={styles.userName}>{item.name}</Text>
                                    <Text style={styles.userAddress}>{item.address}</Text>
                                </View>
                            </View>
                            <Text style={styles.useTime}>{`${timeStamp(item.time)}`}</Text>
                        </View>
                        <View style={styles.contentInfo} >
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
                                        {`${item.content}`}
                                        {/* {item.content} */}
                                    </Text>) : null
                            }
                            {
                                item.contentImage[0] ? (
                                    <Swiper style={styles.wrapper} 
                                        // onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                                        dot={<View style={{backgroundColor:'rgba(255,255,255,.5)', width: 8, height: 8,borderRadius: 4,marginHorizontal:3,marginVertical:3,}} />}
                                        activeDot={<View style={{backgroundColor: '#17C6AC', width: 8, height: 8, borderRadius: 4,marginHorizontal:3,marginVertical:3}} />}
                                        paginationStyle={{
                                            bottom: 10,
                                        }}
                                        autoplay  //bool值  循环属性 
                                        autoplayTimeout = {7} //循环时间
                                    >
                                    {
                                        item.contentImage.map((items) =>
                                            // resizeMode enum('cover', 'contain', 'stretch', 'repeat', 'center')
                                            <Image resizeMode='cover' style={styles.contentInfoImg} source={{uri:items}} />
                                        )
                                    }
                                    </Swiper>
                                ) : null
                            }
                        </View>
                        
                        {/*浏览量&点赞&评论&分享*/}
                        <View style={styles.cellFooter} >
                            {/* 浏览量 */}
                            <View style={styles.footerBox} >
                                {/*浏览量文字*/}
                                <Text style={styles.boxText}>浏览量：{item.pageView}</Text>
                            </View>
                            <View style={[styles.footerBox,{justifyContent:'flex-end'}]}>
                                {/*点赞*/}
                                <View style={styles.footerBoxview} >
                                    { 
                                        <Icon
                                            name={ item.like == true ?"heart":"hearto"}
                                            size={15}
                                            onPress={() => this._likeCase(item.id,this.state.uid)}
                                            style={item.like == true ? styles.up : styles.down}
                                        />
                                    }
                                    {/*点赞文字*/}
                                <Text style={styles.boxText}>{item.likenumber}</Text>
                                </View>

                                {/*评论*/}
                                <View style={styles.footerBoxview}>
                                    <Icon name="message1"
                                        size={15}
                                        style={styles.boxIcon}
                                        onPress={() => this.getDynamicInfo(item.id,this.state.uid)}
                                    />
                                    {/* 评论文字*/}
                                    <Text style={styles.boxText}>{item.commentnumber}</Text> 
                                </View>
                                {/* 分享 */}
                                <View style={styles.footerBoxview,{marginHorizontal:0}}>
                                    <Icon name="sharealt"
                                        size={15}
                                        style={styles.boxIcon,{paddingRight: 10}}
                                    />
                                    {/*分享文字*/}
                                    {/* <Text style={styles.boxText}>评论</Text> */}
                                </View>
                            </View>
                        </View>
                    </View>
                {/* </View> */}
            </View>
        )
    }

    // 加载时加载动画
    _renderFooter() {
        console.log('renderFooter--------   ',this.state.showFoot)
        if (this.state.showFoot === 1) {
            return (
                <View style={styles.footer}>
                    <Text style={{ color: '#999999', fontSize: 14, marginVertical:6, }}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } 
        else if (this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } 
        else if (this.state.showFoot === 0) {
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }

    // 下拉方法
    _onRefresh=()=>{
        // 不处于 下拉刷新
        console.log('下拉刷新');
        if(!this.state.isRefresh){
            this.page = 1
            this._getHotList()
        }
    }

    _getHotList=()=>{
        let that=this;
        console.log('开始执行下拉刷新执行的函数');
        // that.state.pageNo=1;
        that.setState({
            list: [],
            showFoot: 0,
            isRefreshing: false,
        });
        that.componentDidMount();
    }
    
    // 上拉触底事件，进行判断
    _onEndReached = async ()=>{
        console.log('上拉加载');
        // 如果是正在加载中或没有更多数据了，则返回
        if (this.state.showFoot == 1) {
            console.log('1111----------  ',this.state.showFoot)
            return;
        } else {
            console.log('2222----------  ',this.state.showFoot)
            //底部显示正在加载更多数据
            this.setState({ showFoot: 2 });
            let pages=this.state.pageNo+1;
            this.setState({
                pageNo:pages
            });        
            //获取数据  
            this.fetchData(pages);
        }
    }

    //网络请求——获取第pageNo页数据
    fetchData = async (page) => {                
        console.log('333----------  ',this.state.showFoot)
        const dataList = this.state.list
        const formData = {
            uid:await storage.get('uid'),
            page:page,
            limit:3
        }
        await api.dynamic.userDynamicList(formData).then((data) => {
            if(data.type == 'success')
            {
                data.list.map(((item) =>{
                dataList.push(item)
                }))
                this.setState({list:dataList});
                data.page === data.pages ? this.setState({ showFoot: 1 }) : null
            }
            else
            {
                console.log('333')
            }
        }) 
    }
}

export default Personal;