import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";

import { colors } from "../theme";
import uuidV4 from "uuid/v4";
import { TouchableHighlight } from "react-native-gesture-handler";

export default class AddCity extends React.Component {
  state = {
    city: "",
    country: ""
  };

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  onSubmit = () => {
    if (this.state.city === "" || this.state.country === "") return;
    const city = {
      city: this.state.city,
      country: this.state.country,
      locations: [],
      id: uuidV4()
    };
    this.props.screenProps.addCity(city);
    this.setState({ city: "", country: "" }, () => {
      this.props.navigation.navigate("Cities");
    });
  };
  render() {
    console.log("Add Cities props", this.props);

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Cities App</Text>
        <TextInput
          placeholder="City Name"
          value={this.state.city}
          onChangeText={val => this.onChangeText("city", val)}
          style={styles.input}
        />
        <TextInput
          placeholder="Country Name"
          value={this.state.country}
          onChangeText={val => this.onChangeText("country", val)}
          style={styles.input}
          style={styles.input}
        />
        <TouchableOpacity onPress={this.onSubmit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add City</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    margin: 10,
    paddingHorizontal: 8,
    height: 50
  },
  button: {
    height: 50,
    backgroundColor: "#666",
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  buttonText: { color: "white" },
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: "center"
  },
  heading: { fontSize: 40, textAlign: "center", margin: 10, color: "white" }
});
