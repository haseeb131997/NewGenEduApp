import React, { Component } from "react";
import {  View, StyleSheet,  } from "react-native";
import { ActivityIndicator,Modal} from 'react-native-paper';
export default class Loader extends Component {
  render() {
    const { loading, ...attributes } = this.props;
    //console.log(loading,"loading")
    return (
      <Modal  animationType={"none"} visible={loading}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={loading} />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040"
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
});

