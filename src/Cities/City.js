import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";

import { colors } from "../theme";
import { white } from "ansi-colors";

export default class City extends React.Component {
  static navigationOptions = props => {
    return {
      title: props.navigation.state.params.city.city,
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "400"
      }
    };
  };
  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  addLocation = () => {
    if (this.state.city === "" || this.state.info === "") return;
    const { city } = this.props.navigation.state.params;
    const location = {
      name: this.state.name,
      info: this.state.info
    };
    this.props.screenProps.addLocation(location, city);
    this.setState({
      name: "",
      info: ""
    });
  };

  state = {
    name: "",
    info: ""
  };
  render() {
    return (
      <View>
        <TextInput
          value={this.state.name}
          placeholder="Location Name"
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText("name", val)}
          style={styles.input}
        />
        <TextInput
          value={this.state.info}
          placeholder="Location Info"
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText("info", val)}
          style={(styles.input, styles.inputTwo)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add Location</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    position: "absolute",
    height: 50,
    backgroundColor: colors.primary,
    width: "100%",
    bottom: 104,
    left: 0,
    color: "white"
  },
  inputTwo: { bottom: 52 },
  button: {
    backgroundColor: colors.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: { position: "absolute", bottom: 0, left: 0, width: "100%" },
  buttonText: { color: "white", fontSize: 20 }
});
