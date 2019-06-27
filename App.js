/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import AppNavCont from "./src";

const key = "cities";

export default class App extends React.Component {
  state = {
    cities: []
  };

  componentDidMount = async () => {
    console.log("Mounting");
    try {
      const cities = await AsyncStorage.getItem(key);
      cities.length > 0 ? this.setState({ cities: JSON.parse(cities) }) : "";
    } catch (e) {
      console.log("Getting Error:", e);
    }
  };

  addCity = async city => {
    try {
      const cities = this.state.cities;
      cities.push(city);
      await AsyncStorage.setItem(key, JSON.stringify(cities));
      this.setState({ cities });
    } catch (e) {
      console.log("It's all gone to shit! Read more here ---> ", e);
    }
  };

  addLocation = (location, city) => {
    const index = this.state.cities.findIndex(item => item.id === city.id);

    const chosenCity = this.state.cities[index];
    chosenCity.locations.push(location);
    const cities = [
      ...this.state.cities.slice(0, index),
      chosenCity,
      ...this.state.cities.slice(index + 1)
    ];
    this.setState({ cities }, () => {
      AsyncStorage.setItem(key, JSON.stringify(cities)).catch(error =>
        console.log("Setting Error:", error)
      );
    });
  };
  render() {
    return (
      <AppNavCont
        screenProps={{
          cities: this.state.cities,
          addCity: this.addCity,
          addLocation: this.addLocation
        }}
      />
    );
  }
}
