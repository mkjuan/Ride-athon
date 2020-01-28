import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import logo from './assets/logo.png';
import Login from './components/Login'
import Passenger from './components/Passenger'
import firebaseConfig from './secrets'
import * as firebase from 'firebase'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      passenger: ''
    }
    this.toggleLoggedIn = this.toggleLoggedIn.bind(this)
    this.handleGuestPassenger = this.handleGuestPassenger.bind(this)
    if(!firebase.apps.length) {firebase.initializeApp(firebaseConfig)}
  }

  toggleLoggedIn() {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }

  handleGuestPassenger() {
    let passenger
    if(this.state.passenger === 'guest') passenger = ''
    else passenger = 'guest'
    this.setState({ passenger })
  }

  async componentDidMount() {
    await firebase.database().ref('users/1').set({
      username: 'John',
      email: 'mk@gmail.com',
      password: 123
    });
  }

  render() {
    if(!this.state.loggedIn) {
      return (
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <TouchableOpacity
              onPress={this.toggleLoggedIn}
              style={styles.bottom}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )
    } else if (this.state.passenger) {
      return (
        <Passenger passenger={this.state.passenger} handleGuestPassenger={this.handleGuestPassenger}/>
      )
    } else {
      return (
        <Login returnToHome={this.toggleLoggedIn} handleGuestPassenger={this.handleGuestPassenger}/>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: "center"
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    width: 100,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: 'black'
  },
  bottom: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 36,
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    width: 150,
    borderRadius: 10
  }
});
