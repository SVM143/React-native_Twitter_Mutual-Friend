import { Container,Header,Button} from "native-base";
import React, { Component } from "react";
import {FlatList,View,ActivityIndicator,StyleSheet,Text,StatusBar,Image } from "react-native";
import {NewsPreview} from "./sharedComponents/NewsPreview"
import {getCategoriesList,clearGetCategoriesList} from "../ApiFetch/accountActions"
import {connect} from "react-redux";
import { Actions } from "react-native-router-flux";

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state={
      loader:false,
      data:[],
      refreshing:false,
      offset:true,
      screen_name1: this.props.screen_name1,
      screen_name2: this.props.screen_name2
    }
  }

  componentDidMount(){
      this.props.getCategoriesList(this.state.screen_name1,this.props.screen_name2);
  }

  lazyLoading(){
    this.props.getCategoriesList(this.state.screen_name1,this.props.screen_name2,true);
    this.setState({offset:false})
  }
  componentWillReceiveProps(props){
    this.getData(props);
  }

  getData(props){
    this.setState({loader:true,data: props.categoryList})
  }
  renderItem = ({ item, index }) => (
    <NewsPreview previewLink={item} screen={this.props.screen} />
  );

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 12,
          width: "86%",
        }}
      />
    );
  };

  back=()=>{
    this.props.clearGetCategoriesList()
    Actions.pop()
  }
  render() {
    return (
      <Container style={{ backgroundColor: "#f2f2f4", paddingTop: 0 }}>
        <Header style={{ backgroundColor: "#455a64" }}>
            <StatusBar backgroundColor="#455a64" barStyle="light-content" />
            <View style={{flex:1,flexDirection:"row",}}>
            <View style={{flex:0.1}}>
                <Button transparent style={{alignContent:"flex-start"}}onPress={() => this.back()}>
                    <Image source={require('../assets/images/back-arrow.png')} resizeMode="contain" style={{ width: 25, height: 25 }} />
                </Button>
            </View>
          </View>
        </Header>
        <View style={{ paddingTop: 10, flex: 1 }}>
          {this.state.loader?
            this.state.data && this.state.data.length < 1 && this.state.offset ?
             <Text
               style={{
                 flex:1,
                 textAlign: "center",
                 fontFamily: "ProximaNova-Regular",
                 color: "#455a64",
                 paddingTop: 300           //Device Height Can Be given Here
               }}
             >
               No Mutual Friends Found
             </Text>
             :
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardDismissMode="on-drag"
              extraData={this.state}
              data={this.state.data}
              refreshing={this.state.refreshing}
              renderItem={this.renderItem}
              onEndReachedThreshold={0.7}
              windowSize={61}
              onEndReached={() => this.lazyLoading()}
              ItemSeparatorComponent={this.renderSeparator}
            />  
            :
            <View style={styles.MainContainer}>
            <ActivityIndicator size="large" color="#876eff" />
            <Text
              style={{
                textAlign: "center",
                fontFamily: "ProximaNova-Regular",
                color: "#bfbac0"
              }}
            >
              Loading Mutual Friends ...
            </Text>
          </View>
            }
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
    height: "100%"
  }
});
const mapDispatchToProps = dispatch => {
  return {
    getCategoriesList:(id,value)=>{
      dispatch(getCategoriesList(id,value))
    },
    clearGetCategoriesList:()=>{
      dispatch(clearGetCategoriesList())
    }
  }
};

const mapStateToProps = (state) => {
  return {
    categoryList:state.accountData.categoryList
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
