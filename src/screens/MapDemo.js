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
  }
});

export default class MapDemo extends Component {
  constructor (props) {
    super(props)  
    this.state = {
      location:null,
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
        this.setState({
          location:position,
          getLatitude:position.coords.latitude,
          getLongitude:position.coords.longitude
        })
        console.warn('position--ss---- ',position.coords)
        
        //设置每隔15S获取一次定位
        setInterval(5000);
      });


  }
  //{`${JSON.stringify(location, null, 2)}`}

    render() {
      // console.warn('this.state.getLatitude-------- ',this.state.getLatitude)
      // console.warn('this.state.getLongitude-------- ',this.state.getLongitude)
        return (            
            <View>
                {/* <ScrollView contentContainerStyle={style.body}>
                  <View style={style.controls}>
                    <Text>{`${JSON.stringify(this.state.location,null,2)}`}</Text>
                    <Text>{this.state.getLatitude}</Text>
                    <Text>{this.state.getLongitude}</Text>
                  </View>
                </ScrollView> */}

              <MapView
                draggable
                  coordinate={ {
                      latitude: Number(this.state.getLatitude),
                      longitude: Number(this.state.getLongitude),
                    }}
                  mapType={'standard'}
                  zoomEnabled={true}
                  scrollEnabled={true}
                  rotateEnabled={true}
                  style={styles.mapStyles}
                  showsZoomControls={false}
                  locationEnabled={true}
                  showsLabels={true}
                  zoomLevel={15}
              >
             </MapView>
            </View>
        );
    }
}