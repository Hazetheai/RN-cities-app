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
    try {
      const cities = await AsyncStorage.getItem(key);
      this.setState({ cities: JSON.parse(cities) });
    } catch (e) {
      console.log("Getting Error:", e);
    }
  };

  addCity = async city => {
    try {
      const cities = this.state.cities;
      cities.push(city);
      await AsyncStorage.setItem(key, JSON.stringify(cities))
      .catch(error => console.log("Setting Error:", error));
      this.setState({ cities });
    } catch (e) {
      console.log("It's all gone to shit! Read more here ---> ", e);
    }
  };

  addLocation = () => {};
  render() {
    return (
      <AppNavCont
        screenProps={{
          cities: this.state.cities,
          addCity: this.addCity
        }}
      />
    );
  }
}
