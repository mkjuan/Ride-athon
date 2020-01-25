import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from 'react-native'

const WIDTH = Dimensions.get('window').width

export default class DestinationButton extends Component {

  render() {
    return (
      <View style={styles.button}>
        <TextInput style={styles.destinationText} placeholder={this.props.destination || "Enter Destination"}
          value={this.props.destination}
          placeholderTextColor="white"
          keyboardType="email-address"
          autoCorrect={false}
          editable={!this.props.lookingForDriver}
          onChangeText={destination => {
            this.props.handleChange("destination", destination)
            this.props.onChangeDestination(destination)
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // container: {
  //   zIndex: 9,
  //   position: 'absolute',
  //   flexDirection: 'row',
  //   width: 100,
  //   height: 60
  // },
  destinationText: {
    fontFamily: Platform.OS === 'android'
      ? 'sans-serif-light'
      : 'Helvetica-Light',
    fontSize: 20,
    color: 'white',
    paddingLeft: 20,
    width: (WIDTH)-40
  },
  button: {
    zIndex: 9,
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'black',
    shadowColor: 'grey',
    elevation: 5,
    shadowRadius: 5,
    shadowOpacity: 2.0,
    width: (WIDTH)-40,
    height: 60,
    top: 90,
    left: 20,
    borderRadius: 10,
    alignItems: 'center'
  }
})
