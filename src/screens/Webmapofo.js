/**
 * Created by marno on 2017/4/9
 * Function:主页视图
 * Desc:
 */
import React, {Component} from "react";
import {Image, Text, TouchableWithoutFeedback, View,StyleSheet} from "react-native";
import { WebView } from 'react-native-webview';

const styles =  StyleSheet.create({  
    view_container: {
        flex: 1,
        flexDirection: 'column',
    },
})
const source = (Platform.OS == 'ios') ? require('../lib/amap.html') : { uri: 'file:///android_asset/pages/amap.html' }

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.view_container}>
                <WebView 
                    style={{flex: 1}}
                    source={require('./../lib/amap.html')}
                    // domStorageEnabled={true}
                    // javaScriptEnabled={true}
                    // startInLoadingState={true}
                    originWhitelist={['*']}
                    startInLoadingState={true}
                    javaScriptEnabled={true}
                    automaticallyAdjustContentInsets={true}
                    useWebKit={true}
                    ref={webview => this.webview = webview}
                    renderError={(e) => {
                        if (e) {
                            return;
                        }
                    }}
                />
            </View>
        );
    }
}