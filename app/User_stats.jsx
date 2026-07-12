import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  useColorScheme,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { colors } from "../color_Assests/Color";
import { CS2_steam_statues } from "../API_calls/steam";

const Home = () => {
  const [playerinfo, getplayer_info] = useState(null); // varaibles to hold data
  useEffect(() => {
    // useEffect allows the code to run after the ui has ben rendderd and [] means to only run it once
    async function loading() {
      // a async function
      // console.log("featch started");
      const player_info = await CS2_steam_statues();
      //  console.log("featch fiinshed", player_info);
      getplayer_info(player_info); // added the data to the function getplayer_info which playerinfo will use to dipslay the data.
    }

    loading(); // runs the function
  }, []);

  if (!playerinfo) {
    return <Text>Lodding...</Text>;
  } else {
    return (
      <View style={styles.Container}>
        <View style={styles.innerContainerRanks}>
          <View style={styles.ContainerCurrentRank}>
            <Text style={styles.text}>Current Rank</Text>
          </View>
          <View style={styles.ContainerCurrentPeak}>
            <Text style={styles.text}>Peak Rank</Text>
          </View>
        </View>
        <View style={styles.ContainerPlayerInfo}>
          <Text style={styles.boldText}>
            Headshot % {playerinfo.overview.headshotPercent}
          </Text>
          <Text style={styles.boldText}>
            K/D Ratio {playerinfo.overview.kdRatio}
          </Text>
          <Text style={styles.boldText}>
            Win % {playerinfo.overview.winRate}
          </Text>
        </View>
        <View style={styles.ContainerWeponeInfo}>
          <View style={styles.headerRow}>
            <Text style={styles.headerWeapon}>Weapons</Text>
            <Text style={styles.headerStat}>kills</Text>
            <Text style={styles.headerStat}>Accuracy</Text>
            <Text style={styles.headerStat}>KillShare</Text>
          </View>
          <FlatList
            keyExtractor={(item) => item.id}
            data={playerinfo.weapons}
            renderItem={({ item }) => {
              // console.log(playerinfo.weapons.map((w) => w.id));
              console.log(JSON.stringify(item, null, 2));
              let imagesource;
              if (item.name === "Knife") {
                imagesource = require("../images/Knife_cs2.png");
              } else {
                imagesource = { uri: item.image_url };
              }
              return (
                <View style={styles.view_layout}>
                  <View style={styles.nameSection}>
                    <Image
                      style={{ width: 50, height: 50, borderRadius: 8 }}
                      source={imagesource}
                    ></Image>
                    <Text style={styles.Text_style_wepones}>{item.name}</Text>
                  </View>
                  <Text style={styles.statValue}>{item.Kills}</Text>
                  <Text style={styles.statValue}>{item.accuracy}</Text>
                  <Text style={styles.statValue}>{item.KillShare}</Text>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.ContainerMapsInfo}>
          <View style={styles.headerRow}>
            <Text style={styles.headerImageCol}>Map</Text>
            <Text style={styles.headerStat}>Rounds</Text>
            <Text style={styles.headerStat}>Wins</Text>
            <Text style={styles.headerStat}>Win Rate</Text>
          </View>

          <FlatList
            keyExtractor={(item) => item.id}
            data={playerinfo.maps}
            renderItem={({ item }) => {
              return (
                <View style={styles.view_layout}>
                  <View style={styles.imageCol}>
                    <Image
                      style={{ width: 70, height: 70, borderRadius: 8 }}
                      source={{ uri: item.url_image }}
                    ></Image>
                  </View>
                  <Text style={styles.statValue}>{item.rounds}</Text>
                  <Text style={styles.statValue}>{item.wins}</Text>
                  <Text style={styles.statValue}>{item.winRate}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
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
    height: 120, // reduced from 200
    marginTop: 20, // reduced from 100
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around", // evenly spaced instead of space-between
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  ContainerCurrentRank: {
    backgroundColor: colors.cardElevated,
    width: 150,
    padding: 12,
    borderRadius: 8,
  },
  ContainerCurrentPeak: {
    backgroundColor: colors.cardElevated,
    width: 150,
    borderRadius: 8,
    padding: 12,
  },
  ContainerPlayerInfo: {
    backgroundColor: colors.card,
    height: 80, // reduced from 150
    marginTop: 20, // reduced from 100
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.textPrimary, // was missing entirely, defaulted to black
  },
  ContainerWeponeInfo: {
    backgroundColor: colors.card,
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  ContainerMapsInfo: {
    backgroundColor: colors.card,
    flex: 1,
    marginTop: 5,
    borderRadius: 5,
  },
  Text_style_wepones: {
    color: colors.textPrimary,
    fontSize: 14,
    padding: 10,
    marginVertical: 5,
    fontWeight: "bold",
  },
  view_layout: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginVertical: 4, // small gap between rows so borders don't touch
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between", // spreads the 4 labels evenly across the row
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  headerWeapon: {
    flex: 2, // matches nameSection below
    fontWeight: "bold",
    color: colors.textSecondary,
  },
  headerMap: {
    fontWeight: "bold",
    color: colors.textSecondary,
  },
  headerStat: {
    flex: 1, // matches statValue below
    textAlign: "center",
    color: colors.textSecondary,
    fontWeight: "bold",
  },
  nameSection: {
    flex: 2, // must match headerWeapon
    flexDirection: "row",
    alignItems: "center",
  },
  statValue: {
    flex: 1, // must match headerStat
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.textPrimary,
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    color: colors.textPrimary,
    fontSize: 16,
  },
  headerImageCol: {
    flex: 2,
    textAlign: "left",
    color: colors.textSecondary,
    paddingLeft: 15,
  },
  imageCol: {
    flex: 2,
    alignItems: "flex-start", // matches "left" alignment above
  },
});
// rnfes
