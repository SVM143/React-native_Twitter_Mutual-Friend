import {Body, CardItem } from "native-base";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import renderIf from "./renderif";
import FastImage from "react-native-fast-image";
import {Constants} from "../../utils/constants"
export class NewsPreview extends React.Component {
    constructor(props) {
        super(props)
        this.state={
          url: (this.props.previewLink.profile_image_url_https && 
                this.props.previewLink.profile_image_url_https.replace("normal", "400x400")
                ||
                Constants.placeholderUrl
              )
         }
    }
    render() {
        return (
        <View style={{flex:1}}>
          <TouchableOpacity 
          style={{ paddingLeft: 10, paddingRight: 10, 
          paddingBottom: 2, height: 120, width: "100%"}}
          onPress={() => {
            // this.props.previewLink.url? openCustomTab(this.props.previewLink.url):null
         }}
          >
          <CardItem style={{
              height: 120,
              width:'100%',
              borderWidth: 0.3,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              overflow: 'hidden',
              paddingLeft: 0,
              paddingBottom: 0,
              paddingTop: 0,
              paddingRight: 0,
              marginTop:0,
              marginBottom:0,
              borderColor: '#bdb9c1',
              backgroundColor:"#ececec"
          }}>
              <Body style={{flexDirection:'row',flex:1}}>
                <TouchableOpacity
                    style={{height: 100, flex: 0.7, justifyContent: 'space-around', paddingLeft: 16, paddingRight: 16, paddingTop: 16, paddingBottom: 0}}
                    // onPress={() => {
                       
                    // }}
                  >

                      {renderIf(this.props.previewLink.name,
                            <Text
                              style={{
                                flex: 2,
                                fontSize: 17,
                                fontFamily: "ProximaNova-Regular",
                              }}
                              numberOfLines={2}
                            >
                              {this.props.previewLink.name && this.props.previewLink.name.trim()}
                            </Text>
                        )} 
                        {renderIf(this.props.previewLink.name,
                            <Text
                              style={{
                                flex: 2,
                                fontSize: 10,
                                fontFamily: "ProximaNova-Regular",
                              }}
                              numberOfLines={2}
                            >
                              @ {this.props.previewLink.name && this.props.previewLink.screen_name.trim()}
                            </Text>
                        )} 
                        {renderIf(this.props.previewLink.description,
                          <Text
                            style={{
                              flex:2,
                              fontSize: 12,
                              fontFamily: "ProximaNova-Semibold",
                              color: "blue",
                            }}
                            numberOfLines={2}
                          >
                            {this.props.previewLink.description}
                          </Text>
                          )
                    }
                  </TouchableOpacity>
                      <View style={{flex:0.3, marginLeft: 0, marginRight: 0,backgroundColor:"white" }}>
                      <FastImage
                        source={{uri: this.state.url}}
                        style={{height:120}}
                      />
                    </View>
              </Body>
          </CardItem>
      </TouchableOpacity>
      </View>
      )
    }

}
