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

import { MapView,Marker,Polyline,Polygon } from 'react-native-amap3d';
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
});

export default class MapDemo extends Component {
  constructor (props) {
    super(props)  
    this.state = {
      location:null,
      locationArr:[
        // {
        //   latitude: 40.006901,
        //   longitude: 116.097972,
        // },
        // {
        //   latitude: 40.006901,
        //   longitude: 116.597972,
        // },
        // {
        //   latitude: 39.706901,
        //   longitude: 116.597972,
        // }
      ],
      getLatitude: '',
      getLongitude:'',
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
        let item = []
        // item = this.state.locationArr

        console.log('item-sss--aaaa---- ',item)

        let data = 
        {
          latitude:Number(position.coords.latitude),
          longitude:Number(position.coords.longitude)
        }
        console.log('item-data---- ',data)

        if(this.state.locationArr.length == 0)
        {
          console.log('1111------- ',11111)
          item.push(data)
        }
        else
        {
          console.log('2222------- ',2222)
          for (let index = 0; index < this.state.locationArr.length; index++) {
              // item = this.state.locationArr,
              item.push(data)
              console.log('item-sss------ ', this.state.locationArr)
              // item[this.state.locationArr.length].push(data)
          }
        }       

        this.setState({
          location:position,
          locationArr:item
        })
        //newData是新的对象数组
        // model = Object.assign({}, model ,newData.data)

        // console.warn('position--ss---- ',position.coords)
        // console.log('this.state.locationArr------- ',this.state.locationArr)
           
        //设置每隔15S获取一次定位
        setInterval(5000);
      });
  }

  static navigationOptions = {
    title: '绘制折线',
  }

  _onPress = () => Alert.alert('onPress')

    render() {
        return (            
            <View>
                {/* <ScrollView contentContainerStyle={style.body}>
                  <View style={style.controls}>
                    <Text>{`${JSON.stringify(this.state.location,null,2)}`}</Text>
                    <Text>{this.state.getLatitude}</Text>
                    <Text>{this.state.getLongitude}</Text>
                  </View>
                </ScrollView> */}
             {/* <MapView
              draggable
              mapType={'standard'}
              zoomEnabled={true}
              scrollEnabled={true}
              rotateEnabled={true}
              style={styles.mapStyles}
              showsZoomControls={false}
              locationEnabled={true}
              showsLabels={true}
              zoomLevel={15}
              coordinate={{
                latitude: Number(this.state.getLatitude),
                longitude: Number(this.state.getLongitude),
              }}
               >

             </MapView> */}
                {/* <MapView
                    draggable
                    zoomEnabled={true}
                    scrollEnabled={true}
                    rotateEnabled={true}
                    style={styles.mapStyles}
                    showsZoomControls={false}
                    locationEnabled={true}
                    showsLabels={true}
                    zoomLevel={15} 
                    // coordinate={{
                    //   latitude: Number(this.state.getLatitude),
                    //   longitude: Number(this.state.getLongitude),
                    // }}
                > 
                  <Polyline
                    width={10}
                    color='rgba(255, 0, 0, 0.5)'
                    coordinates={this.state.locationArr}
                  />
                </MapView>*/}
                  <MapView style={styles.mapStyles}
                                      draggable
                                      zoomEnabled={true}
                                      scrollEnabled={true}
                                      rotateEnabled={true}
                                      style={styles.mapStyles}
                                      showsZoomControls={false}
                                      locationEnabled={true}
                                      showsLabels={true}
                                      zoomLevel={15} >
                    <MapView.Polyline
                      width={5}
                      color="rgba(255, 0, 0, 0.5)"
                      coordinates={this.state.locationArr}
                    />
                    <MapView.Polyline
                      dashed
                      width={5}
                      coordinates={this.state.locationArr}
                    />
                    <MapView.Polyline
                      gradient
                      width={5}
                      colors={['#f44336', '#2196f3', '#4caf50']}
                      onPress={this._onPress}
                      coordinates={this.state.locationArr}
                    />
                  </MapView>
            </View>
        );
    }
}