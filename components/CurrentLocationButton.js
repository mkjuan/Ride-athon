import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export const CurrentLocationButton = (props) => {

  return(
    <View style={styles.container}>
      <MaterialIcons name="location-on" size={45} color="black" onPress={props.centerCurrentLocation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: 'absolute',
    left: WIDTH-60,
    top: HEIGHT-100
  }
})
