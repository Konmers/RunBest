import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  PermissionsAndroid,
  Dimensions,
  Platform
} from "react-native";
import {
  init,
  Geolocation,
  setInterval,
  setNeedAddress,
  setLocatingWithReGeocode
} from 'react-native-amap-geolocation';

import { MapView} from 'react-native-amap3d';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  body: {
    padding: 16,
    paddingTop: Platform.OS === "ios" ? 48 : 16
  },
  controls: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "column",
    marginBottom: 16
  },
  button: {
    flexDirection: "column",
    marginRight: 8,
    marginBottom: 8
  },
  result: {
    fontFamily: Platform.OS === "ios" ? "menlo" : "monospace"
  },
  mapStyles:{
    height:deviceHeight,
    width:deviceWidth
  },
  infoWindow: {
    backgroundColor: '#8bc34a',
    padding: 10,
    borderRadius: 10,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#689F38',
  },
  mapBlock:{
    height:deviceHeight,
    width:deviceWidth
}
});

export default class MapDemo extends Component {
  constructor (props) {
    super(props)  
    this.polyline = [];
    this.state= {
        center:{
            latitude:0,
            longitude:0
        },
        line : [
            {
                latitude:0,
                longitude:0
            }
        ]
    }
}

   componentDidMount = async () =>{
      if (Platform.OS === "android") {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
      }
      //设置高德key
      await init({
        ios: "9bd6c82e77583020a73ef1af59d0c759",
        android: "197b73efee86541c847e91c6f8fa9620"
      });
     
      //注册一个监听，它会每隔一段时间返回当前地理位置
      Geolocation.watchPosition(position=>{
        let data = 
        {
          latitude:Number(position.coords.latitude),
          longitude:Number(position.coords.longitude)
        }    
        this.setState({
          center:data
        })
      });
  }
  getCenter(lat, long) {
      this.setState({
          center:{
              latitude: lat,
              longitude: long,
          }
      })
  }

  userAnimate(lat, long){
      let coordinate = {
          latitude: lat,
          longitude: long
      }
      console.warn("用户当前的坐标", coordinate)
      this._mapView.animateTo({
          coordinate : coordinate
      })
      this.polyline.push(coordinate)
      this.setState({
          line:[...this.polyline]
      })
  }

    render() {
        return (            
            <View>
                 <MapView style={styles.mapBlock}
                    mapType = "standard" //地图类型  standard: 标准地图  satellite: 卫星地图 navigation: 导航地图 night: 夜间地图  bus: 公交地图
                    ref={(ref) => {this._mapView = ref}}    
                    locationStyle={{fillColor:'rgba(0,0,0,0)',strokeWidth:0}}
                    locationEnabled={true} // 是否启用定位
                    locationInterval={500} //定位间隔(ms)，默认 2000
                    distanceFilter={2} //定位的最小更新距离
                    showsBuildings={true} //是否显示3D建筑
                    showsZoomControls={false} //是否显示放大缩小按钮
                    showsCompass={true} //是否显示指南针
                    showsScale={false} //是否显示比例尺
                    showsLabels={true} //是否显示文本标签
                    scrollEnabled={true}//是否启用滑动手势，用于平移
                    rotateEnabled={true} //是否启用旋转手势，用于调整方向
                    tiltEnabled={true} //是否启用倾斜手势，用于改变视角
                    coordinate={this.state.center} //中心坐标
                    zoomLevel={18}//当前缩放级别，取值范围 [3, 20]
                    zoomEnabled={true} //是否启用缩放手势，用于放大缩小
                    // minZoomLevel = {18}//最大缩放级别
                    // minZoomLevel ={5}//最小缩放级别
                    onLocation={({ nativeEvent }) => {
                        // console.log("经度纬度",`${nativeEvent.latitude}, ${nativeEvent.longitude}`)
                        this.getCenter(nativeEvent.latitude, nativeEvent.longitude)
                        this.userAnimate(nativeEvent.latitude, nativeEvent.longitude)
                    }}
                >
                    <MapView.Polyline
                        key={Math.random()}
                        ref={ref=>{this._polyline = ref}}
                        dashed={true}
                        width={10}
                        color='rgba(255, 0, 0, 0.5)'
                        coordinates={this.state.line}
                    />
                </MapView>

            </View>
        );
    }
}