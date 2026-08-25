import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  useColorScheme,
  Image,
  SectionList,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useFocusEffect } from "expo-router";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { colors } from "../color_Assests/Color";
import { playerInfo } from "../API_calls/Leetify";
import { SvgUri } from "react-native-svg";
import { useWindowDimensions } from "react-native";

const Home = () => {
  const { width } = useWindowDimensions();
  const rankIconSize = width * 0.3;
  const [playerinfo, getplayer_info] = useState(null); // varaibles to hold data
  const [showAllTime, setShowAllTime] = useState(true);
  const [showWeapons, setShowWeapons] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      console.log("this is what playerInfo has:: ", playerInfo);

      getplayer_info({ ...playerInfo });
    }, []),
  );

  let textbutton = "";
  if (showAllTime === true) {
    textbutton = "Show Reccent";
  } else {
    textbutton = "Show All Time";
  }
  if (!playerinfo) {
    return <Text>Lodding...</Text>;
  } else {
    let listheading = "";
    let listdata;
    if (showWeapons == true) {
      listdata = playerinfo.weapons;
      listheading = (
        <View style={styles.headerRow}>
          <Text style={styles.headerWeapon}>Weapons</Text>
          <Text style={styles.headerStat}>Kills</Text>
          <Text style={styles.headerStat}>Accuracy</Text>
          <Text style={styles.headerStat}>KillShare</Text>
        </View>
      );
    } else {
      listdata = playerinfo.maps;
      listheading = (
        <View style={styles.headerRow}>
          <Text style={styles.headerImageCol}>Map</Text>
          <Text style={styles.headerStat}>Rounds</Text>
          <Text style={styles.headerStat}>Wins</Text>
          <Text style={styles.headerStat}>Win Rate</Text>
        </View>
      );
    }
    console.log("playerinfo.overview specifically:", playerinfo.overview);
    console.log(playerinfo.ranks.premier_image);
    if (showAllTime == true) {
      return (
        <SafeAreaView style={styles.Container} edges={["top", "left", "right"]}>
          <Button
            // style ={styles.}
            title={textbutton}
            value={showAllTime}
            onPress={() => setShowAllTime(!showAllTime)}
          />
          <View style={styles.profileRow}>
            <View style={styles.Profile_Container}>
              <Image
                style={styles.Profile_pic}
                source={{ uri: playerinfo.meta.User_profile_Image }}
              />
              <Text style={styles.Profile_name}>
                {playerinfo.meta.User_profile_name}
              </Text>
            </View>
            <View style={styles.innerContainerRanks}>
              <View style={styles.rankBox}>
                <Text style={styles.text}>Current Rank</Text>
                <SvgUri
                  width="95%"
                  height="75%"
                  uri={playerinfo.ranks.premier_image_curent}
                ></SvgUri>
              </View>
              <View style={styles.rankBox}>
                <Text style={styles.text}>Peak Rank</Text>
                <SvgUri
                  width="95%"
                  height="75%"
                  uri={playerInfo.ranks.premier_image_peak}
                ></SvgUri>
              </View>
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
          <View style={styles.selectorContainer}>
            <Pressable
              onPress={() => setShowWeapons(true)}
              style={[
                styles.selectorButton,
                showWeapons && styles.selectorButtonActive,
              ]}
            >
              <Text style={styles.text_test}>Weapons</Text>
            </Pressable>

            <Pressable
              onPress={() => setShowWeapons(false)}
              style={[
                styles.selectorButton,
                !showWeapons && styles.selectorButtonActive,
              ]}
            >
              <Text style={styles.text_test}>Maps</Text>
            </Pressable>
          </View>
          {listheading}
          <FlatList
            keyExtractor={(item) => item.id}
            data={listdata}
            renderItem={({ item }) => {
              if (showWeapons == true) {
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
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 8,
                        }}
                        source={imagesource}
                      />

                      <Text style={styles.Text_style_wepones}>{item.name}</Text>
                    </View>

                    <Text style={styles.statValue}>{item.Kills}</Text>
                    <Text style={styles.statValue}>{item.accuracy}</Text>
                    <Text style={styles.statValue}>{item.KillShare}</Text>
                  </View>
                );
              } else {
                return (
                  <View style={styles.view_layout}>
                    <View style={styles.imageCol}>
                      <Image
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 8,
                        }}
                        source={{ uri: item.url_image }}
                      />
                    </View>

                    <Text style={styles.statValue}>{item.rounds}</Text>
                    <Text style={styles.statValue}>{item.wins}</Text>
                    <Text style={styles.statValue}>{item.winRate}</Text>
                  </View>
                );
              }
            }}
          />
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView tyle={styles.Container} edges={["top", "left", "right"]}>
          <Button title={textbutton} onPress={() => setShowAllTime(true)} />
          <View>
            <Text>hi</Text>
          </View>
        </SafeAreaView>
      );
    }
  }
};

export default Home;

const styles = StyleSheet.create({
  mapsSectionHeader: {
    marginTop: 20,
  },
  Container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 8,
    marginTop: "-20%",
  },
  Profile_Container: {
    backgroundColor: colors.background,
    alignItems: "center",
    marginTop: "5%",
  },
  Profile_pic: {
    marginHorizontal: 10,
    aspectRatio: 1,
    marginTop: "5%",
    width: "37%",
    height: "37%",
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "white",
    alignSelf: "center",
  },
  Profile_name: {
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
    marginLeft: 10,
    marginTop: 10,
  },
  innerContainerRanks: {
    marginTop: "5%",
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 8,
  },
  rankBox: {
    backgroundColor: colors.cardElevated,
    width: "90%",
    height: 75,
    marginVertical: 5,
    padding: 4,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  ContainerPlayerInfo: {
    backgroundColor: colors.card,
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
    transform: [{ translateY: -60 }],
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.textPrimary,
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

    backgroundColor: colors.card,

    paddingHorizontal: 10,
    paddingVertical: 10,

    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,

    marginHorizontal: 8,
    marginVertical: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: colors.cardElevated,

    paddingHorizontal: 10,
    paddingVertical: 10,

    borderRadius: 8,
    marginHorizontal: 8,
    marginBottom: 5,
  },
  headerWeapon: {
    flex: 2, // matches nameSection below
    fontWeight: "bold",
    color: colors.textSecondary,
    fontSize: 16,
  },
  headerStat: {
    flex: 1, // matches statValue below
    textAlign: "center",
    color: colors.textSecondary,
    fontWeight: "bold",
    fontSize: 16,
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
    fontSize: 16,
    fontWeight: "bold",
  },
  imageCol: {
    flex: 2,
    alignItems: "flex-start", // matches "left" alignment above
  },
  selectorContainer: {
    transform: [{translateY: -20}],
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 4,
    marginHorizontal: 8,
    marginBottom: 10,
  },

  selectorButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },

  selectorButtonActive: {
    backgroundColor: colors.cardElevated,
  },

  selectorText: {
    color: colors.textSecondary,
    fontWeight: "bold",
  },

  selectorTextActive: {
    color: colors.textPrimary,
  },
  text_test: {
    color: colors.textPrimary,
  },
});
// rnfes
