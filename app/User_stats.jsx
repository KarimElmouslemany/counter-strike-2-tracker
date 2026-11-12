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
  const rankWidth = Math.min(Math.max(width * 0.34, 120), 165);
  const rankHeight = Math.min(Math.max(width * 0.11, 42), 60);
  const statIconSize = Math.min(Math.max(width * 0.1, 32), 50);
  const tableHeaderSize = Math.min(Math.max(width * 0.035, 12), 16);
  const [playerinfo, getplayer_info] = useState(null); // varaibles to hold data
  const [showAllTime, setShowAllTime] = useState(true);
  const [showWeapons, setShowWeapons] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      // console.log("this is what playerInfo has:: ", playerInfo);

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

    let recent_matches = playerinfo.Recent_matchs;
    // recent_matches.forEach(element => {
    //   console.log("this the match ID: " ,element.Match_ID);
    // });
    if (showWeapons == true) {
      listdata = playerinfo.weapons;
      listheading = (
        <View style={styles.headerRow}>
          <Text
            style={styles.headerWeapon}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.8}
          >
            Weapons
          </Text>
          <Text
            style={[styles.headerStat, { fontSize: tableHeaderSize }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.8}
          >
            Kills
          </Text>
          <Text style={[styles.headerStat, { fontSize: tableHeaderSize }]}>
            Accuracy
          </Text>
          <Text
            style={[styles.headerStat, { fontSize: tableHeaderSize }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.8}
          >
            KillShare
          </Text>
        </View>
      );
    } else {
      listdata = playerinfo.maps;
      listheading = (
        <View style={styles.headerRow}>
          <Text style={styles.headerImageCol}>Map</Text>
          <Text
            style={[styles.headerStat, { fontSize: tableHeaderSize }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.8}
          >
            Rounds
          </Text>
          <Text
            style={[styles.headerStat, { fontSize: tableHeaderSize }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.8}
          >
            Wins
          </Text>
          <Text
            style={[styles.headerStat, { fontSize: tableHeaderSize }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.8}
          >
            Win Rate
          </Text>
        </View>
      );
    }
    //console.log("playerinfo.overview specifically:", playerinfo.overview);
    //console.log(playerinfo.ranks.premier_image);
    if (showAllTime == true) {
      return (
        <SafeAreaView style={styles.Container} edges={["top", "left", "right"]}>
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
                  width={rankWidth}
                  height={rankHeight}
                  uri={playerinfo.ranks.premier_image_curent}
                ></SvgUri>
              </View>
              <View style={styles.rankBox}>
                <Text style={styles.text}>Peak Rank</Text>
                <SvgUri
                  width={rankWidth}
                  height={rankHeight}
                  uri={playerInfo.ranks.premier_image_peak}
                ></SvgUri>
              </View>
            </View>
          </View>
          <ScrollView>
            <View style={styles.ContainerPlayerInfo}>
              <View style={styles.statBox}>
                <Image
                  style={{
                    width: statIconSize,
                    height: statIconSize,
                    resizeMode: "contain",
                  }}
                  source={require("../images/headshot.png")}
                />
                <Text style={styles.boldText}>
                  {playerinfo.overview.headshotPercent}
                </Text>
              </View>
              <View style={styles.statBox}>
                <Image
                  style={{
                    width: statIconSize,
                    height: statIconSize,
                    resizeMode: "contain",
                  }}
                  source={require("../images/KD_ratio.png")}
                />
                <Text style={styles.boldText}>
                  {playerinfo.overview.kdRatio}
                </Text>
              </View>
              <View style={styles.statBox}>
                <Image
                  style={{
                    width: statIconSize,
                    height: statIconSize,
                    resizeMode: "contain",
                  }}
                  source={require("../images/Accuaraacy.png")}
                />
                <Text style={styles.boldText}>
                  {playerinfo.overview.accuracy}
                </Text>
              </View>
              <View style={styles.statBox}>
                <Image
                  style={{
                    width: statIconSize,
                    height: statIconSize,
                    resizeMode: "contain",
                  }}
                  source={require("../images/wins_image.png")}
                />
                <Text style={styles.boldText}>
                  {playerinfo.overview.winRate}
                </Text>
              </View>
            </View>
            <View style={styles.recentMatchesContainer}>
              {recent_matches.slice(0, 3).map((iteam) => (
                <View style={styles.Matchrecent} key={iteam.Match_ID}>
                  <Image
                    style={styles.matchBackground}
                    source={{ uri: iteam.Map_name_image }}
                  />
                  <View style={styles.matchOverlay}></View>
                  <View style={styles.matchContent}>
                    <Text style={styles.rankTypeText}>{iteam.rank_type}</Text>
                    <Text style={styles.mapNameText}>{iteam.Map_name}</Text>
                    <Text style={styles.outcomeText}>{iteam.outcome}</Text>
                    <Text style={styles.finishedText}>{iteam.Finshed}</Text>
                    <SvgUri
                      style={
                        iteam.checker
                          ? styles.competitiveRankImage
                          : styles.premierRankImage
                      }
                      width={iteam.checker ? "40%" : "40%"}
                      height={iteam.checker ? "50%" : "50%"}
                      uri={iteam.Rank}
                    ></SvgUri>
                  </View>
                </View>
              ))}
            </View>

            {/* <Text>{playerinfo.Recent_matchs[0].rank_type_name}</Text> */}

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
              scrollEnabled={false}
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

                        <Text style={styles.Text_style_wepones}>
                          {item.name}
                        </Text>
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
          </ScrollView>
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
  Container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  Matchrecent: {
    width: "94%",
    maxWidth: 700,
    alignSelf: "center",
    aspectRatio: 3.1,

    marginBottom: 12,

    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,

    overflow: "hidden",
    position: "relative",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    width: "100%",

    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 14,
  },
  Profile_Container: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Profile_pic: {
    width: "55%",
    maxWidth: 150,
    minWidth: 90,
    aspectRatio: 1,

    borderRadius: 999,
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
    flex: 0.9,
    maxWidth: 190,

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 8,
    gap: 10,
  },
  rankBox: {
    backgroundColor: colors.cardElevated,
    width: "100%",
    maxWidth: 190,
    aspectRatio: 2,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  ContainerPlayerInfo: {
    backgroundColor: colors.card,

    width: "94%",
    maxWidth: 700,
    alignSelf: "center",

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    paddingHorizontal: 10,
    paddingVertical: 14,

    borderRadius: 10,

    marginTop: -12,
    marginBottom: 24,
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
    flex: 1,
    textAlign: "center",
    color: colors.textSecondary,
    fontWeight: "bold",
    paddingHorizontal: 2,
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
    transform: [{ translateY: -20 }],
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
  statBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  // recent match desgin:
  recentMatchesContainer: {
    marginBottom: 20,
  },
  matchCard: {
    borderRadius: 12,
    overflow: "hidden",
    minHeight: 110,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  matchBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  matchOverlay: {
    flex: 1,
    minHeight: 92,

    backgroundColor: "rgba(8, 12, 18, 0.72)",

    paddingHorizontal: "4%",
    paddingVertical: 10,
  },
  matchContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    paddingHorizontal: 14,
    paddingVertical: 12,

    justifyContent: "space-between",
    zIndex: 2,
  },
  rankTypeText: {
    color: "#D5DAE2",
    fontSize: 12,
    fontWeight: "600",

    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  mapNameText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 2,

    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  outcomeText: {
    color: "#F0F2F5",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,

    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  finishedText: {
    color: "#AAB2BF",
    fontSize: 12,
    marginTop: 4,

    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  competitiveRankImage: {
    position: "absolute",
    right: "3%",
    top: 10,
  },

  premierRankImage: {
    position: "absolute",
    right: "3%",
    top: 10,
  },
});
// rnfes
