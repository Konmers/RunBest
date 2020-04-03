//首页
import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    FlatList,
    BackHandler,
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

//swiper banner滚动
import Swiper from 'react-native-swiper'

import Floatball from "../../middleware/Floatball.js"

//计算时间
import {timeStamp} from '../../middleware/Computationtime.js';

import { Toast } from 'teaset'

import api from '../../server/api'
import storage from '../../server/storage'

import Share from 'react-native-share';

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        // backgroundColor: 'transparent',

    },
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
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'red',
        marginHorizontal:5
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
    //----------------------
    footer: {
        flexDirection: 'row',
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    zanwu:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
    },
    hidden:{
        display:'none'
    }, 
    animating:{
        flexDirection:'row',
        flex:1,
        justifyContent:'center',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
})

class HomeInfo extends Component {
    async componentDidMount() {
       console.log('token home------------  ',await storage.get('token'))

        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        //3秒后关闭启动页
        setTimeout(() => { SplashScreen.hide() }, 1000)
        const formData = {
            uid:await storage.get('uid'),
            page:1,
            limit:3
        }
        await api.dynamic.dynamiclist(formData).then((data) => {
            // console.log('data--------  ',data)
            if(data.type == 'success')
            {
              this.setState({list:data.list,pageNo:data.page,totalPage:data.pages});
            }
            else
            {
              console.log('333')
            }
        }) 
        this.setState({uid:await storage.get('uid')})
        // console.log('this.state ----------  ',this.state)
    };

    componentWillUnmount() {
        this.backHandler.remove()
    }

    handleBackPress = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            BackHandler.exitApp();//退出整个应用
            return false
        }
    
        this.lastBackPressed = Date.now();
        console.log('再按一次要退出了')
        // Toast.sad('再按一次退出应用');
        // Toast.show({
        //     text:'再按一次退出应用',
        //     icon: <ActivityIndicator/>,
        //     position: 'center',
        //     duration: 2000,
        // })
        Toast.show({
            text:'再按一次退出应用',
            position: 'center',
            duration: 2000,
        })
    
        return true;
    }

    constructor(props) {
        super(props)
        this.state = {
            list:[],
            animating: true,
            status:0,
            pageNo:1,      //控制页数
            showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            isRefreshing: false,//下拉控制
            totalPage:1,
            uid:'',
        }
    }

    render() {
        return (
            <View style={{ flex: 1,backgroundColor:'#ddd' }}>
                <FlatList
                    data={this.state.list}
                    renderItem={this._renderItemView}
                    /**
                     * 添加尾巴布局
                     */
                    ItemSeparatorComponent={this._separator}
                    ListFooterComponent={this._renderFooter.bind(this)}
                    /**
                     * 从下往上拉去的时候加载更多
                     */
                    onEndReached={this._onEndReached.bind(this)}
                    onEndReachedThreshold={0.2}
                    /**
                     * 关于下拉刷新
                     */
                    onRefresh={this._onRefresh.bind(this)}
                    refreshing={this.state.isRefreshing}
                />
                <Floatball/> 
            </View>
        )
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
                                    <Text style={styles.boxText}>33</Text>
                                </View>

                                {/*评论*/}
                                <View style={styles.footerBoxview}>
                                    <Icon name="message1"
                                        size={15}
                                        style={styles.boxIcon}
                                        onPress={() => this.getDynamicInfo(item.id,this.state.uid)}
                                    />
                                    {/* 评论文字*/}
                                    <Text style={styles.boxText}>222</Text> 
                               </View>

                                {/* 分享 */}
                                {/* <View style={styles.footerBox}> */}
                                    <Icon name="sharealt"
                                        size={15}
                                        style={styles.boxIcon,{paddingRight: 10}}
                                    />
                                    {/*分享文字*/}
                                    {/* <Text style={styles.boxText}>评论</Text> */}
                                {/* </View> */}
                            </View>
                        </View>
                    </View>
                {/* </View> */}
            </View>
        )
    }

    // 加载时加载动画
    _renderFooter() {
        if (this.state.showFoot === 1) {
            return (
                <View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start', }}>
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
        await api.dynamic.dynamiclist(formData).then((data) => {
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

//---------------------------------------------
    //跳转 动态详情
    getDynamicInfo = (dynamicId,uid) => {
        Actions.dynamicinfo({dynamicId:dynamicId,uid:uid})// 空传参
    }

    //点赞
    _likeCase = async (dynamicId,uid) =>{
        // console.log('uid----  ',uid,'dynamicId----- ',dynamicId)
        const formData = {
            uid:uid,
            dynamicId:dynamicId,
        }
        await api.dynamic.dynamiclike(formData).then((Data) => {
            if (Data.type === true) 
            {
                console.log('Data.msg----  ',Data.msg)
                // Toast.message(Data.msg);
            } 
            else 
            {
                console.log('Data.msg----  ',Data.msg)
                // Toast.message(Data.msg);
            }
            const listData = [...this.state.list] //复制数组--浅拷贝
            //修改对象中某元素值
            this.setState({
                list:listData.map((item) => item.id === dynamicId ?{...item, like: Data.list } : item ),
            })
        })
    }

    //分享
    _Share = (user) =>{
        console.warn('user-------   ',user)
        Actions.createdynamic({user})
    }
}

export default HomeInfo; 