/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

import {fetchWeather, fetchLocationId} from './util/api';
import getImageForWeather from './util/getImageForWeather';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SearchInput from './components/SearchInput';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      loading: false,
      error: false,
      temperature: '',
      weather: '',
    };
  }

  handleUpdateLocation = async city => {
    if (!city) return;
    this.setState({loading: true}, async () => {
      try {
        const locationId = await fetchLocationId(city);
        const {location, weather, temperature} = await fetchWeather(locationId);
        this.setState({
          loading: false,
          error: false,
          temperature: temperature,
          weather: weather,
          location: location,
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true,
        });
      }
    });
  };

  componentDidMount() {
    this.handleUpdateLocation('San Francisco');
  }

  render() {
    const {loading, error, location, weather, temperature} = this.state;
    return (
      <KeyboardAvoidingView behaviour="padding" style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}>
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />
            {!loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Couldn't load weather.Please try another city.
                  </Text>
                )}

                {!error && (
                  <View>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      {weather}
                    </Text>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {Math.round(temperature) +"°"}
                    </Text>
                  </View>
                )}
                <SearchInput
                  placeholder="Search City"
                  onSubmit={this.handleUpdateLocation}
                />
              </View>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'rgb(237, 237, 237)',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
});
