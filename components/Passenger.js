import React, { Component }from 'react'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps'
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native'
import PolyLine from "@mapbox/polyline";
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import DestinationButton from './DestinationButton'
import { CurrentLocationButton } from './CurrentLocationButton'
import { CallDriverButton } from './CallDriverButton'
import { BackToLogin } from './BackToLogin'
import { expo } from '../app.json'

const apiKey = expo.ios.config.googleMapsApiKey
const WIDTH = Dimensions.get('window').width

export default class Passenger extends Component {
  constructor() {
    super()
    this.state = {
      region: null,
      hasPermission: false,
      destination: '',
      lookingForDriver: false,
      predictions: [],
      routeCoords: [],
      routeResponse: {}
    }
    this.getInitialLocation = this.getInitialLocation.bind(this)
    this.centerCurrentLocation = this.centerCurrentLocation.bind(this)
    this.callDriver = this.callDriver.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onChangeDestination = this.onChangeDestination.bind(this)
    this.getRouteDirections = this.getRouteDirections.bind(this)
  }

  async componentDidMount() {
    this.getInitialLocation()
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.025,
            longitudeDelta: 0.025
          }
        })
      },
      error => console.error(error),
      { enableHighAccuracy: true, maximumAge: 1200, timeout: 12000 }
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  async getInitialLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if(status !== 'granted') console.log('Permission denied.')
    else (this.setState({
      hasPermission: true
    }))

    const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })

    this.setState({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025
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
    if(destination.length > 3) {
      const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${destination}&location=${this.state.region.latitude},${this.state.region.longitude}&radius=2000`
      try {
        const result = await fetch(apiUrl)
        const json = await result.json()
        this.setState({
          predictions: json.predictions
        })
        // console.log(json)
      } catch (err) {
        console.error(err)
      }
    }
  }

  async getRouteDirections(destinationId, destinationName) {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${
          this.state.region.latitude
        },${
          this.state.region.longitude
        }&destination=place_id:${destinationId}&key=${apiKey}`
      )
      // console.log(res)
      const json = await res.json()
      // console.log(json)
      const points = PolyLine.decode(json.routes[0].overview_polyline.points)
      const routeCoords = points.map(point => {
        return { latitude: point[0], longitude: point[1] }
      })
      console.log(routeCoords)
      this.setState({
        routeCoords,
        routeResponse: json
      })
      Keyboard.dismiss()
      return destinationName
    } catch (error) {
      console.error(error)
    }
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
    const predictions = this.state.predictions.map(prediction => (
      <View style={styles.buttonContainer}>
        <TouchableHighlight style={styles.highlight}
          onPress={async () => {
            const destinationName = await this.getRouteDirections(
              prediction.place_id,
              prediction.structured_formatting.main_text
            )
            this.setState({ predictions: [], destination: destinationName })
            this.map.fitToCoordinates(this.state.routeCoords, {
              edgePadding: { top: 100, bottom: 100, left: 100, right: 100 }
            })
          }}
          key={prediction.id}
        >
            <Text style={styles.suggestionText}>
              {prediction.structured_formatting.main_text}
            </Text>
        </TouchableHighlight>
      </View>
    ))

    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <DestinationButton destination={this.state.destination} handleChange={this.handleChange} lookingForDriver={this.state.lookingForDriver} onChangeDestination={this.onChangeDestination} predictions={predictions}/>
          <BackToLogin passenger={this.props.passenger} handleGuestPassenger={this.props.handleGuestPassenger}/>
          <CurrentLocationButton centerCurrentLocation={this.centerCurrentLocation}/>
          <MapView style={styles.mapStyle}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            rotateEnabled={false}
            initialRegion={this.state.region}
            ref={(map) => {this.map = map}} >
            <Polyline
            coordinates={this.state.routeCoords}
            strokeWidth={3}
            strokeColor="black" />
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
  buttonContainer: {
    marginTop: 51,
  },
})
