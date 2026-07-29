import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import {checkSteamID } from "../API_calls/steam";

const InputPage = () => {
  const [SteamID, setSteamID] = useState("");
  const [errormessage, seterrors] = useState("");
  async function sendUserInfo(ID) {
    const checkResult = checkSteamID(ID);
    seterrors(checkResult.message);
  }
  return (
    <View style={styles.Container}>
      <TextInput
        placeholder="past your steam profile url"
        style={styles.inputstyling}
        value={SteamID}
        onChangeText={setSteamID}
      ></TextInput>

      <Button title="Send" onPress={() => sendUserInfo(SteamID)}></Button>
      <Text style={styles.text}>{errormessage}</Text>
    </View>
  );
};

export default InputPage;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  inputstyling: {
    height: 40,
    width: 200,
    padding: 10,
    borderWidth: 1,
    margin: 100,
  },
  text: {
    margin: 50,
    padding: 10,
    fontSize: 30,
    color: "red",
  },
  stylingButtton: {},
});
