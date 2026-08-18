import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { checkSteamID } from "../API_calls/steam";
import { Sending_User_Fullinfo, main } from "../API_calls/Leetify";

const InputPage = () => {
  const [SteamID, setSteamID] = useState("");
  const [errormessage, seterrors] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function sendUserInfo(ID) {
    seterrors("");
    if (!ID) {
      return seterrors("ID must be entered");
    } else {
      const checkResult = await checkSteamID(ID);
      console.log("this is check resutls ", checkResult);
      if (checkResult.valid == false) {
        seterrors(checkResult.message);
        return;
      }
    }
    setLoading(true);
    // await Sending_User_Fullinfo();
    await main();
    setLoading(false);
    router.push("/User_stats");
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
