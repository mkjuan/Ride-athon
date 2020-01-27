import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const HEIGHT = Dimensions.get('window').height

export const CurrentLocationButton = (props) => {

  return(
    <View style={styles.container}>
      <MaterialIcons name="location-on" size={40} color="black" onPress={props.centerCurrentLocation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: 'absolute',
    right: 18,
    top: HEIGHT-100
  }
})
