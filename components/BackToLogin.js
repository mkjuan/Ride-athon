import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';


export const BackToLogin = (props) => {

  return(
    <View style={styles.container}>
      <MaterialIcons name="arrow-back" size={40} color="black" onPress={() => {
        if(!props.lookingForDriver) props.handleGuestPassenger()
        }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: 'absolute',
    left: 18,
    bottom: 58
  }
})
