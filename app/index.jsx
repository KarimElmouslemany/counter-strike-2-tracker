import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import { Link } from "expo-router";
import { colors } from "../color_Assests/Color";

const Home = () => {

  return (
    <ScrollView>
      <View style={styles.Container}>
        <View style={styles.innerContainerRanks}>
          <View style={styles.ContainerCurrentRank}>
            <Text>Current Rank</Text>
          </View>
          <View style={styles.ContainerCurrentPeak}>
            <Text>Peak Rank</Text>
          </View>
        </View>
        <View style={styles.ContainerPlayerInfo}>
          <Text style={styles.boldText}>Headshot %</Text>
          <Text style={styles.boldText}>K/D Ratio</Text>
          <Text style={styles.boldText}>Win %</Text>
        </View>
        <View style={styles.ContainerWeponeInfo}>
          <Text>Weapons</Text>
          <FlatList></FlatList>
        </View>
        <View style={styles.ContainerMapsInfo}>
          <Text>Maps</Text>
          <FlatList></FlatList>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  Title: {
    fontSize: 22,
    alignContent: "center",
    color: colors.textPrimary,
  },
  innerContainerRanks: {
    backgroundColor: colors.card,
    height: 200,
    marginTop: 100,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ContainerCurrentRank: {
    backgroundColor: "white",
    width: 150,
    padding: 12,
    borderRadius: 8,
  },
  ContainerCurrentPeak: {
    backgroundColor: "red",
    width: 150,
    borderRadius: 8,
    padding: 12,
  },
  ContainerPlayerInfo: {
    backgroundColor: "white",
    height: 150,
    marginTop: 100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ContainerWeponeInfo: {
    backgroundColor: colors.card,
    height: 150,
    marginTop: 100,
  },
  ContainerMapsInfo: {
    backgroundColor: colors.card,
    height: 150,
    marginTop: 100,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
// rnfes
