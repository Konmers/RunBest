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

import api from '../../server/api'
import storage from '../../server/storage'

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
        flexDirection: 'column',
        backgroundColor: 'white',
        borderBottomWidth:1,
        borderBottomColor:'#c1c1c1',
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
        color: '#999999'
    },
    contentInfo: {
        flex: 1,
        width: '90%',
        flexDirection: 'column',
        marginTop: 3,
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
    wrapper: {
        height: height*0.3,
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
        //3秒后关闭启动页
        setTimeout(() => { SplashScreen.hide() }, 1000)

        await api.dynamic.dynamiclist().then((data) => {
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
            <View style={{ flex: 1 }}>
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
                <View style={styles.cont}>
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
                            <Text style={styles.useTime}>{`${timeStamp(item.time)}`}h</Text>
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
                                        &emsp;{`${item.content}`}
                                        {/* {item.content} */}
                                    </Text>) : null
                            }
                            {
                                item.contentImage[0] ? (
                                    <Swiper style={styles.wrapper} 
                                        // onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                                        dot={<View style={{backgroundColor:'rgba(0,0,0,.5)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                                        activeDot={<View style={{backgroundColor: '#17C6AC', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                                        paginationStyle={{
                                            bottom: 10,
                                        }}
                                        autoplay  //bool值  循环属性 
                                        autoplayTimeout = {7} //循环时间
                                    >
                                    {
                                        item.contentImage.map((items, j) =>
                                        <View style={styles.slide}>
                                        <Image resizeMode='stretch' style={styles.contentInfoImg} source={{uri:items}} />
                                        </View>
                                            // <Image style={styles.contentInfoImg} source={{uri:items}} />
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
                </View>
            </View>
        )
    }

    // 加载时加载动画
    _renderFooter() {
        if (this.state.showFoot === 1) {
            return (
                <View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start', }}>
                    <Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5, }}>
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
    _onEndReached=()=>{
        console.log('上拉加载');
        let that=this;
        // 如果是正在加载中或没有更多数据了，则返回
        console.log('that.state-------  ',that.state)
        if (that.state.showFoot != 0) {
            return;
        } else {
            // let page=that.state.pageNo;
            console.log('that.state.pageNo-------  ',that.state.pageNo)
            console.log('that.state.totalPage-------  ',that.state.totalPage)
            if((that.state.pageNo+1) <= that.state.totalPage)
            {
                let pages=that.state.pageNo+1;
                console.log('pages-------- ',pages)
                that.setState({
                    pageNo:pages
                });
                that.fetchData(pages);
            }
        }
        //底部显示正在加载更多数据
        that.setState({ showFoot: 2 });
        //获取数据    
    }

    //网络请求——获取第pageNo页数据
    fetchData(page) {
        //这里进行网络请求数据
    }

//---------------------------------------------
    //跳转 视频页面
    getVideoList = () => {
        // console.warn('wwwwwwwwwww')
        // Actions.videodetail({id:10}) //传参
        Actions.videodetail()// 空传参
    }

    //跳转视频详情
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

    //分享
    _Share = (user) =>{
        console.warn('user-------   ',user)
        Actions.createdynamic({user})
    }
}

export default HomeInfo; 