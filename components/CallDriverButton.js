import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export const CallDriverButton = (props) => {
  return !props.lookingForDriver
    ? (<TouchableOpacity style={styles.button} onPress={
          props.callDriver}>
          <View style={{fontSize: 12}}>
            <Text style={styles.destinationText}>Request Ride</Text>
          </View>
        </TouchableOpacity>)
    : (<TouchableOpacity style={styles.button} onPress={
          props.callDriver}>
          <View style={{fontSize: 12}}>
            <Text style={styles.destinationText}>Cancel Request
              <ActivityIndicator style={styles.activity}
                size="small"
                color='white'
                animating={true}/>
            </Text>
          </View>
        </TouchableOpacity>)
}

const styles = StyleSheet.create({
  destinationText: {
    fontFamily: Platform.OS === 'android'
    ? 'sans-serif-light'
    : 'Helvetica-Light',
    fontSize: 18,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activity: {
    paddingLeft: 10
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
    width: (WIDTH)-200,
    height: 35,
    top: HEIGHT-98,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
