import React, { Component }from 'react'
import MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import DestinationButton from './DestinationButton'
import { CurrentLocationButton } from './CurrentLocationButton'
import { CallDriverButton } from './CallDriverButton'
import { BackToLogin } from './BackToLogin'
import { expo } from '../app.json'

export default class Passenger extends Component {
  constructor() {
    super()
    this.state = {
      region: null,
      hasPermission: false,
      destination: '',
      lookingForDriver: false,
      predictions: []
    }
    this.getLocationAsync = this.getLocationAsync.bind(this)
    this.centerCurrentLocation = this.centerCurrentLocation.bind(this)
    this.callDriver = this.callDriver.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onChangeDestination = this.onChangeDestination.bind(this)
  }

  componentDidMount() {
    this.getLocationAsync()
  }

  async getLocationAsync() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if(status !== 'granted') console.log('Permission denied.')
    else (this.setState({
      hasPermission: true
    }))

    const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

    this.setState({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.035,
        longitudeDelta: 0.035
      }
    })
  }

  centerCurrentLocation() {
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    } = this.state.region

    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    })
  }

  async onChangeDestination(destination) {
    const apiKey = expo.ios.config.googleMapsApiKey
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}
    &input=${destination}&location=${this.state.region.latitude},${
      this.state.region.longitude
    }&radius=2000`;

    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      this.setState({
        predictions: json.predictions
      });
      console.log(json);
    } catch (err) {
      console.error(err);
    }

    console.log(this.state.predictions)
  }

  handleChange(name, value) {
    this.setState({
      [name]: value
    })
  }

  callDriver() {
    const lookingForDriver = !this.state.lookingForDriver

    if(this.state.destination) {
      if(lookingForDriver) {
        alert('Finding Driver.')
      }
      this.setState({
        lookingForDriver
      })
    }
    else alert('Need a correct address.')
  }

  render() {
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <DestinationButton destination={this.state.destination} handleChange={this.handleChange} lookingForDriver={this.state.lookingForDriver} onChangeDestination={this.onChangeDestination}/>
          <BackToLogin passenger={this.props.passenger} handleGuestPassenger={this.props.handleGuestPassenger}/>
          <CurrentLocationButton centerCurrentLocation={this.centerCurrentLocation}/>
          <MapView style={styles.mapStyle}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            rotateEnabled={false}
            initialRegion={this.state.region}
            ref={(map) => {this.map = map}}>
          </MapView>
          { this.state.destination
            ? <CallDriverButton hide={true} callDriver={this.callDriver} lookingForDriver= {this.state.lookingForDriver} />
            : null }

        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})
