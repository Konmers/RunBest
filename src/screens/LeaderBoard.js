//排行榜
import React, { Component } from 'react';
import {View,Text}  from 'react-native';

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <View>
                <Text>
                leaderboard   排行榜
                </Text>
            </View>
         );
    }
}
 
export default Leaderboard;