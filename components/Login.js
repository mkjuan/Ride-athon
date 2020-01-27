import React, { Component }from 'react';
import { StyleSheet, Text, View, TouchableOpacity,
  TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(name, value) {
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="black"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.email}
            onChangeText={email => this.handleChange("email", email)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            placeholderTextColor="black"
            autoCorrect={false}
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.handleChange("password", password)}
          />
          <TouchableOpacity
            onPress={this.props.handleSignIn}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.handleGuestPassenger}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Try it free</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.returnToHome}
            style={styles.bottom}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    paddingLeft: 10,
    width: 305,
    height: 40,
    marginBottom: 10,
    alignItems: 'center',
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10
  },
  button: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    width: 120,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
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
