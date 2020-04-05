//排行榜
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  Dimensions,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableHighlight,//选中跳转
  TouchableOpacity,
  ScrollView,//页面滚动组件 （默认 一个页面长度大于手机的长度，使用这个组件）
} from 'react-native'

//swiper banner滚动
import Swiper from 'react-native-swiper'

// Dimensions 用于获取设备宽、高、分辨率
const { width , height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Toast } from 'teaset'

import api from '../../server/api'

const loading = require('../../public/Iamge/Banner/loading.gif')

//计算时间
import {timeStamp} from '../../middleware/Computationtime.js';
// import { TextInput } from 'react-native-gesture-handler';


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
        alignContent: 'center',
        alignItems: 'center',
    },
    contentSwper: {
        width: width,
        height: height * 0.6,
        backgroundColor: 'black',
    },
    Toptext:{
        width: width,
        height: height*0.06,
        textAlign: 'center',
        lineHeight: height*0.06,
        fontSize: 20,
        color: '#333'
    },
    wrapperView: {
        height:  '100%',
    },
    swiperImg: {
        width: '100%',
        height:'100%',
    },
    hidden:{
        display:'none'
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    paginationText: {
        color: 'white',
        fontSize: 23
    },
    paginationStyle: {
        position: 'absolute',
        top:0,
        right:10
        // left:width/2
    },
    dynamicUser:{
        width: width*0.9,
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
    dynamicCont:{
        width: width*0.9,
        flexDirection: 'column',
        marginVertical:15,
        borderBottomWidth:1,
        borderBottomColor:'#c1c1c1',
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
    dynamicComment:{
        width: width*0.9,
        flexDirection: 'column',
        marginTop: 3,
        marginBottom: 6
    },
    commentView:{
        width: width*0.9,
        // alignItems: 'center',
        flexDirection: 'column',
        marginTop: 10,
    },
    comuserInfo:{
        width: width*0.9,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
    },
    comuserInfos: {
        width:'70%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    comuseTime:{
        marginHorizontal:10,
        fontSize: 18
    },
    comuserImg: {
        width: 30,
        height: 30,
        borderRadius: 5,
        marginRight: 10
    },
    comuserName: {
        fontSize: 16
    },
    likeView:{
        width:'30%',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    },
    comuserlikeNumber: {
        width:'60%',
        fontSize: 20,
        color: '#999999',
        textAlign:'right',
        paddingRight: 5
    },
    up: {
        color: '#FF6666',
    },
    down: {
        color: '#333',
    },
    comuserCont:{
        width,
        justifyContent:'flex-end',
        paddingLeft:40,
        // backgroundColor:'red'
    },
    keyView:{
        width,
        // height:height*0.08,
        minHeight:height*0.09,
        borderTopWidth:1,
        borderTopColor:'#c1c1c1',
        paddingVertical:5,
        // backgroundColor:'red'
        backgroundColor:'#333'
    },
    keyViews:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-around',
    },
    keyInput:{
        fontSize:16,
        // paddingLeft:10,
        width:'70%',
        height:'100%',
        borderRadius:5,
        // flexGrow:1,
        backgroundColor:'white'
    }
})

//图片数量显示
const renderPagination = (index, total, context) => {
    return (
      <View style= {styles.paginationStyle}>
        <Text style={styles.text}>
          <Text style={styles.paginationText}>{index+1}</Text>/{total}
        </Text>
      </View>
    );
}

export default class DynamicInfo extends Component {

    async componentDidMount() {
        // console.log('this.props uid--------   ',this.props.uid)
        // console.log('this.props dynamicId--------   ',this.props.dynamicId)
        //用户信息
        const user = {uid:this.props.uid}
        await api.user.loginInfo(user).then((data) => {
            // console.log('data-----  ',data)
            console.log('user msg-----  ',data.msg)
            if(data.type == 'success')
            {
                this.setState({userInfo:data.list});
            }
            else
            {
                console.log('2222')
            }
        }) 

        //动态信息
        const dynamic = {dynamicId:this.props.dynamicId}
        await api.dynamic.dynamicInfo(dynamic).then((data) => {
            // console.log('data--------  ',data)
            console.log('dynamic msg-----  ',data.msg)
            if(data.type == 'success')
            {
                this.setState({dynamicInfo:data.list});
                // console.log('this.state.dynamicInfo-----  ',this.state.dynamicInfo)
            }
        })

        //评论列表
        const formData = {
            uid:this.props.uid,
            dynamic_id:this.props.dynamicId,
            page:1,
            limit:3
        }
        await api.dynamic.dynamiccomment(formData).then((data) => {
            console.log('data--------  ',data)
            console.log('comment msg-----  ',data.msg)
            if(data.type == 'success')
            {
                this.setState({showFoot: 0,comment:data.list,pageNo:data.page,totalPage:data.pages});
                data.page === data.pages ? this.setState({ showFoot: 1 }) : null
            }
        })
    }

    //计算输入框动态行数高度
    onContentSizeChange(event) {
        this.setState({height: event.nativeEvent.contentSize.height});
    }

    constructor (props) {
        super(props)
        this.state = {
            dynamicInfo:{},
            userInfo:{},
            comment:[],
            pageNo:1,      //控制页数
            showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            totalPage:1,
            creatComment:'',
            height: 1,
        }
    }
    
    render() {
        return (
        <View style={styles.cont}>
            <ScrollView>
                <View style={styles.contView}>
                    <View style={ Array.prototype.isPrototypeOf(this.state.dynamicInfo.ImgArr)&&this.state.dynamicInfo.ImgArr.length ===0 ? styles.hidden : styles.contentSwper}>
                        {
                            this.state.dynamicInfo.ImgArr ? (
                                <Swiper style={styles.wrapperView} 
                                    // renderPagination = {renderPagination}
                                    dot={<View style={{backgroundColor:'rgba(0,0,0,.5)', width: 8, height: 8,borderRadius: 4,marginHorizontal:5,marginBottom:-20}} />}
                                    activeDot={<View style={{backgroundColor: 'white', width: 8, height: 8, borderRadius: 4,marginHorizontal:5,marginBottom:-20}} />}
                                    autoplay  //bool值  循环属性 
                                    autoplayTimeout = {7} //循环时间
                                >
                                {
                                    this.state.dynamicInfo.ImgArr.map((items) =>
                                        <Image 
                                            resizeMode='contain' 
                                            style={styles.swiperImg} 
                                            source={{uri:items}} 
                                        />
                                    )
                                }
                                </Swiper>
                            ) : null
                        }
                    </View>
                    <View style={styles.dynamicUser}>
                        <View style={styles.userInfo}>
                            <Image style={styles.userImg} source={{uri:this.state.userInfo.avatar}} />
                            <View>
                                <Text style={styles.userName}>{this.state.userInfo.username}</Text>
                                <Text style={styles.userAddress}>{this.state.userInfo.address}</Text>
                            </View>
                        </View>
                        <Text style={styles.useTime}>{`${timeStamp(this.state.dynamicInfo.craeteDate)}`}</Text>  
                    </View>
                    <View style={styles.dynamicCont}>
                    {
                        this.state.dynamicInfo.title ? (<Text style={styles.contentInfoTitle}>{this.state.dynamicInfo.title}</Text>) : null
                    }
                    {
                        this.state.dynamicInfo.content ? (
                        <Text
                            style={styles.contentInfoCons}
                        >
                            &emsp;{`${this.state.dynamicInfo.content}`}
                        </Text>) : null
                    }  
                    </View>
                    <View style={styles.dynamicComment}>
                        <Text style={{fontSize:18,color:'#000'}}>评论</Text>
                        <FlatList
                            data={this.state.comment}
                            renderItem={this._renderItemView}
                            //从下往上拉去的时候加载更多
                            onEndReached={this._onEndReached.bind(this)}
                            onEndReachedThreshold={0.2}
                            //添加尾巴布局
                            ItemSeparatorComponent={this._separator}
                            ListFooterComponent={this._renderFooter.bind(this)}
                        />
                    </View>
                </View>
            </ScrollView>
            <KeyboardAvoidingView
            //   enabled
            style={[styles.keyView,{height:Math.max(35,this.state.height)}]}
            //   keyboardVerticalOffset={400}
            >
                <View style={styles.keyViews}> 
                    <TextInput
                        ref='input'
                        style={styles.keyInput}
                        editable={true} // 是否可编辑，默认为: true
                        multiline={true} // 是否为多行文本，默认为: false
                        onContentSizeChange={this.onContentSizeChange.bind(this)}
                        onChangeText={text => this.setState({creatComment: text })}
                        value={this.state.creatComment}
                        placeholder="Pleace tian ha ni de hua ~"
                    >
                    </TextInput>
                    <View style={{height:'100%',width:'20%',justifyContent:'center',}}>
                        <Button
                            title='发送'
                            // type='solid'
                            onPress={()=> { this.state.creatComment ? this.postComment(): Toast.message('输入框不能为空')  }}
                            style={{color:'#fff',fontSize:16,width:'100%',height:'100%'}}
                        />
                    </View>
                </View>   
            </KeyboardAvoidingView>
            {/* <Floatball/>  */}
        </View>
        )
    }

    //显示FlatList的布局
    _renderItemView=({ item })=>{
        // console.log('item---------- ',item)
        return(
            <View style={item   == '' ? styles.hidden : styles.commentView}>
                <View style={styles.comuserInfo}>
                    <View style={styles.comuserInfos}>
                        {/* <Image style={styles.userImg} source={{uri:this.state.item.avatar}} /> */}
                        <Image style={styles.comuserImg} source={{uri:item.avatar}} />
                        <Text style={styles.comuserName}>{item.name}</Text>
                        <Text style={styles.comuseTime}>{`${timeStamp(item.time)}`}</Text> 
                    </View>
                    <View style={styles.likeView}>
                        <Text style={styles.comuserlikeNumber}>{item.like}</Text> 
                        { 
                            <Icon
                                name={ item.likeState == true ?"like1":"like2"}
                                size={20}
                                onPress={() => this._likeCase(item.id,this.props.uid)}
                                style={item.likeState == true ? styles.up : styles.down}
                            />
                        }
                    </View>

                </View>
                <View style={styles.comuserCont}>
                    <Text>{item.content}</Text>
                </View>
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

    // 上拉触底事件，进行判断
    _onEndReached = async ()=>{
        console.log('上拉加载');
        // 如果是正在加载中或没有更多数据了，则返回
        console.log('pageNo 1111----------  ',this.state.pageNo)
        console.log('totalPage  1111----------  ',this.state.totalPage)

        if (this.state.showFoot == 1) {
            console.log('1111----------  ',this.state.showFoot)
            return;
        } 
        else {
            console.log('2222----------  ',this.state.showFoot)
            //底部显示正在加载更多数据
            this.setState({ showFoot: 2 });
            let pages=this.state.pageNo+1;
            this.setState({
                pageNo:pages
            });        
            //获取数据  
            await this.fetchData(pages);
        }
    }

    //网络请求——获取第pageNo页数据
    fetchData = async (page) => {                
        console.log('333----------  ',this.state.showFoot)
        const dataList = this.state.comment
        const formData = {
            uid:this.props.uid,
            dynamic_id:this.props.dynamicId,
            page:page,
            limit:3
        }
        await api.dynamic.dynamiccomment(formData).then((data) => {
            console.log('data--------  ',data)
            console.log('comment msg-----  ',data.msg)
            if(data.type == 'success')
            {
                data.list.map(((item) =>{
                    dataList.push(item)
                }))
                this.setState({comment:dataList});
                data.page === data.pages ? this.setState({ showFoot: 1 }) : null
                console.log('this.state.comment-----  ',this.state.comment)
            }
            else
            {
              console.log('333')
            }
        })
    }
    
    //提交评论
    postComment = async () =>{

        this.refs['input'].blur();
        const formData = {
            uid:this.props.uid,
            dynamicId:this.props.dynamicId,
            content:this.state.creatComment,
        }

        await api.dynamic.dynamiccommentlike(formData).then((Data) => {
            // console.log('Data----  ',Data)

            if (Data.type === true) 
            {
                console.log('Data.msg----  ',Data.msg)
            } 
            else 
            {
                console.log('Data.msg----  ',Data.msg)
            }
            this.setState({creatComment:''})     
            Toast.success(Data.msg);
            this.componentDidMount()   
        })

    } 

    //点赞
    _likeCase = async (commentId,uid) =>{
        console.log('uid----  ',uid,'commentId----- ',commentId)
        const formData = {
            uid:uid,
            commentId:commentId,
        }
        await api.dynamic.dynamiccommentlikestate(formData).then((Data) => {
            console.log('Data----  ',Data)

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
            const listData = [...this.state.comment] //复制数组--浅拷贝
            //修改对象中某元素值
            this.setState({
                comment:listData.map((item) => item.id === commentId ?{...item, likeState: Data.state , like: Data.cont} : item ),
            })
        })
    }

}