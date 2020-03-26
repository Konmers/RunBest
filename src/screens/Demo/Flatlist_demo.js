import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, 
    View,
    ActivityIndicator,
    FlatList,
    DeviceEventEmitter
} from 'react-  native';

const styles = StyleSheet.create({
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
    bigbox:{
        display:'flex',
    },
    box:{
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#e9e7e7',
        width:'96%',
        marginLeft:'2%',
        height:100,
        marginTop:10,
        borderRadius:5,
    },
    boxtop:{
        width:'100%',
        borderBottomWidth:1,
        borderStyle:'solid',
        borderColor:'#e9e7e7',
        height:40,
    },
    boxtopo:{
        width:'90%',
        marginLeft:'5%',
        height:39,
        flexDirection:'row',
    },
    boxtopoo:{
        flex:1,
        lineHeight:39,
    },
    boxtopot:{
        lineHeight:39,
        fontSize:18,
    },
    boxtopos:{
        lineHeight:39,
        textAlign:'right',
        fontSize:18,
    },
    boxbottom:{
        width:'90%',
        marginLeft:'5%',
        height:60,
    },
    boxbottomo:{
        width:'100%',
        height:30,
    },
    boxbottomfont:{
        lineHeight:30,
    },
});

export default class DetailedBalance extends Component {

    constructor(){
        super();
        this.state = {
        list:[],
        animating: true,
        status:0,
        pageNo:1,      //控制页数
        showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
        isRefreshing: false,//下拉控制
        totalPage:10,
        uid:'',
        };
    }

    render() {
        return (
            <View style={styles.bigbox}>
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

                <View style={this.state.animating == true ? styles.animating : styles.hidden}>
                    <ActivityIndicator
                    animating={this.state.animating}
                    style={[styles.centering, {height: 80}]}
                    size="small" />
                </View>
                {/* this.state.animating */}
                <View style={this.state.animating == true ? styles.animating : styles.hidden}>
                    <Text>加载中...</Text>
                </View>
                
                <View style={this.state.status == 1 ? styles.zanwu  : styles.hidden}>
                    <Text style={{fontSize:20,color:'#ccc'}}>暂无更多数据...</Text>
                </View>

            </View>
        )
    }

    /**
    * 显示FlatList的布局
    */
    _renderItemView=({ item })=>{
        console.log(item)
        return(
            <View style={item   == '' ? styles.hidden :''}>

                <View style={styles.box}>
                    <View style={styles.boxtop}>
                        <View style={styles.boxtopo}>
                            <View style={styles.boxtopoo}><Text style={styles.boxtopot}>金额：{item.profit}</Text></View>
                            <View style={styles.boxtopoo}><Text style={styles.boxtopos}>{item.right}</Text></View>
                        </View>
                        <View style={styles.boxbottom}>
                            <View style={styles.boxbottomo}><Text style={styles.boxbottomfont} numberOfLines={1}>备注：{item.content}</Text></View>
                            <View style={styles.boxbottomo}><Text style={styles.boxbottomfont}>交易时间：{item.create_time}</Text></View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    /**
    * 每一个view结束之后的样式
    */
    _separator() {
        return <View style={{ height: 1,}} />;
    }

    /**
    * 加载时加载动画
    */
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

    /**
    * 下拉方法
    */
    _getHotList=()=>{
        let that=this;
        console.log('开始执行下拉刷新执行的函数');
        that.state.pageNo=1;
        that.setState({
            list: [],
            showFoot: 0,
            isRefreshing: false,
        });
        that.componentDidMount();
    }
    _onRefresh=()=>{
        // 不处于 下拉刷新
        console.log('下拉刷新');
        if(!this.state.isRefresh){
            this.page = 1
            this._getHotList()
        }
    }

    /**
    * 上拉触底事件，进行判断
    */
    _onEndReached=()=>{
        console.log(123456898947534865)
        let that=this;
        // 如果是正在加载中或没有更多数据了，则返回
        
        if (that.state.showFoot != 0) {
            return;
        } else {
            let page=that.state.pageNo;
            let pages=page+1;
            console.log(pages)
            that.setState({
                pageNo:pages
            });
            that.fetchData(pages);
        }
        //底部显示正在加载更多数据
        that.setState({ showFoot: 2 });
        //获取数据    
    }
    
    //网络请求——获取第pageNo页数据
    fetchData(page) {
    //这里进行网络请求数据
    }
    
}