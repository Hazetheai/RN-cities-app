/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View, FlatList } from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

// type Props = {};

function getGithubRepos() {
  return fetch(
    "https://api.github.com/search/repositories?q=stars:>25000+language:javascript&sort=stars&order=desc"
  )
    .then(data => {
      return data.json();
    })
    .catch(err => console.log(err));
}

const App = () => {
  const [repoList, setRepos] = useState(null);
  useEffect(() => {
    getGithubRepos()
      .then(results => {
        // throw new Error("My error");
        return results.items.map(
          ({ id, full_name, stargazers_count, html_url }) => {
            return { id, full_name, stargazers_count, html_url };
          }
        );
      })
      .then(repoList => {
        setRepos(repoList);
      })
      .catch(err => {
        setRepos([]);
        console.log(err);
      });
  }, []);
  return (
    <View style={styles.container}>
      <Text
        style={{
          justifyContent: "center",
          alignItems: "center",
          color: "blue"
        }}
      >
        {" "}
        Github - Top JS repos{" "}
      </Text>
      {/* Initial state should display loading, then vcontent then error */}
      {repoList === null ? (
        <Text>loading...</Text>
      ) : repoList.length > 0 ? (
        <FlatList
          data={repoList}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Text style={listyles.myItem}>{item.full_name}</Text>
              <Text style={listyles.myItem}>{item.stargazers_count}</Text>
              <Text style={listyles.myItem}>{item.html_url}</Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text>You Broke it, you wolly</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5FCFF",
    borderBottomColor: "#E5E5E4",
    borderBottomWidth: 2
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

const listyles = StyleSheet.create({
  myItem: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default App;
