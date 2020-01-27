import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class DestinationButton extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.destinationInput} placeholder={this.props.destination || "Where to...?"}
              value={this.props.destination}
              placeholderTextColor="grey"
              keyboardType="email-address"
              autoCorrect={false}
              editable={!this.props.lookingForDriver}
              onChangeText={destination => {
                this.props.handleChange("destination", destination)
                this.props.onChangeDestination(destination)
              }}
            />
          </View>
          <View style={styles.listContainer}>
            {this.props.predictions}
            {/* <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.highlight}>
                <Text style={styles.suggestionText}>Fullstack Academy</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.highlight}>
                <Text style={styles.suggestionText}>Central Park</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.highlight}>
                <Text style={styles.suggestionText}>Fuller</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.highlight}>
                <Text style={styles.suggestionText}>Type</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.highlight}>
                <Text style={styles.suggestionText}>Suggest</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 51,
  },
  inputContainer: {
    zIndex: 9,
    position: 'absolute',
  },
  container: {
    zIndex: 9,
    position: 'absolute',
    flexDirection: 'row',
    width: (WIDTH)-40,
    height: 60,
    backgroundColor: 'black',
    top: 90,
    left: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  destinationInput: {
    position: 'absolute',
    fontFamily: Platform.OS === 'android'
      ? 'sans-serif-light'
      : 'Helvetica-Light',
    fontSize: 20,
    color: 'white',
    paddingLeft: 20,
    width: WIDTH-40,
    top: -10
  },
  highlight: {
    zIndex: 9,
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'black',
    shadowColor: 'grey',
    width: WIDTH-40,
    height: 50,
    top: 90,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  suggestionText: {
    color: 'white',
    fontSize: 18,
    paddingLeft: 20,
  },
  listContainer: {
    position: 'absolute',
    top: -125
  }
   // button: {
  //   shadowColor: 'grey',
  //   elevation: 5,
  //   shadowRadius: 5,
  //   shadowOpacity: 2.0,
  // },
})
