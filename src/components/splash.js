import React from "react";
import {  View, Image, Dimensions, StatusBar, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");


const styles = {
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width,
    height
  }
};

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      account_Details:undefined,
      user_Details:undefined
    }
  }
  
  componentDidMount(){
      setTimeout(() => {
      Actions.Home();
      },5000)
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#455a64" barStyle="light-content" translucent={false} />
        <View>
          <Image
            source={require("../assets/images/ear.jpeg")}
            style={{ height: height, width: width }}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  }
}

export default (Splash);
