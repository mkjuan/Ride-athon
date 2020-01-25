import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';


export const BackToLogin = (props) => {

  return(
    <View style={styles.container}>
      <MaterialIcons name="arrow-back" size={45} color="black" onPress={props.handleGuestPassenger} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: 'absolute',
    left: 15,
    bottom: 55
  }
})
