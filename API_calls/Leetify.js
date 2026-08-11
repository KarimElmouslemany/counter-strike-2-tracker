import { Sending_steam_info } from "./steam.js";
const API_key = process.env.EXPO_PUBLIC_LEETIY_API_KEY;
export let  playerInfo = {};
export async function main() {
  const steamInfo = await Sending_steam_info();
  Object.assign(playerInfo, steamInfo);
  console.log("this is player info before: ", playerInfo);
  let ID = playerInfo.meta.steamId;
  await leetify_main_func(ID);
}

const maps = [
  { id: "de_edin", name: "Edin" },
  { id: "de_jura", name: "Jura" },
  { id: "de_nuke", name: "Nuke" },
  { id: "cs_italy", name: "Italy" },
  { id: "de_dust2", name: "Dust II" },
  { id: "de_grail", name: "Grail" },
  { id: "de_train", name: "Train" },
  { id: "cs_agency", name: "Agency" },
  { id: "cs_office", name: "Office" },
  { id: "de_anubis", name: "Anubis" },
  { id: "de_basalt", name: "Basalt" },
  { id: "de_golden", name: "Golden" },
  { id: "de_mirage", name: "Mirage" },
  { id: "de_ancient", name: "Ancient" },
  { id: "de_inferno", name: "Inferno" },
  { id: "de_vertigo", name: "Vertigo" },
  { id: "de_overpass", name: "Overpass" },
];
const wingmanRanks = {
  0: "Unranked",
  1: "Silver I",
  2: "Silver II",
  3: "Silver III",
  4: "Silver IV",
  5: "Silver Elite",
  6: "Silver Elite Master",
  7: "Gold Nova I",
  8: "Gold Nova II",
  9: "Gold Nova III",
  10: "Gold Nova Master",
  11: "Master Guardian I",
  12: "Master Guardian II",
  13: "Master Guardian Elite",
  14: "Distinguished Master Guardian",
  15: "Legendary Eagle",
  16: "Legendary Eagle Master",
  17: "Supreme Master First Class",
  18: "Global Elite",
};

const competitiveRanks = {
  0: "Unranked",
  1: "Silver I",
  2: "Silver II",
  3: "Silver III",
  4: "Silver IV",
  5: "Silver Elite",
  6: "Silver Elite Master",
  7: "Gold Nova I",
  8: "Gold Nova II",
  9: "Gold Nova III",
  10: "Gold Nova Master",
  11: "Master Guardian I",
  12: "Master Guardian II",
  13: "Master Guardian Elite",
  14: "Distinguished Master Guardian",
  15: "Legendary Eagle",
  16: "Legendary Eagle Master",
  17: "Supreme Master First Class",
  18: "Global Elite",
};

async function get_leetify_info(SteamID) {
  try {
    const leetify_url = `https://api-public.cs-prod.leetify.com/v3/profile?steam64_id=${SteamID}&_leetify_key=${API_key}`;
    const respone = await fetch(leetify_url);
    const data = await respone.json();
    // console.log(data);
    if (data === "not found") {
      return "user does not have a leetify account";
    }
    return data;
  } catch (error) {
    error.message;
  }
}
function sorting_leetify_data(leetify_data) {
  let ranks_everything_else = leetify_data.ranks;
  let ranks_maps = leetify_data.ranks.competitive;
  let stats = leetify_data.stats;
  Object.assign(playerInfo.ranks, {
    premier: ranks_everything_else.premier,
    premier_image: `https://cs2.space/api/assets/premier/${ranks_everything_else.premier}.svg`,
    faceitRank: ranks_everything_else.faceit,
    faceitRank_image: `https://www.hltv.org/img/static/badges/faceit${ranks_everything_else.faceit}.svg`,
    wingmanRank: ranks_everything_else.wingman,
    wingmanRank_image: `https://cs2.space/api/assets/wingman/${ranks_everything_else.wingman}.svg`,
  });
  ranks_comp_maps(ranks_maps);
  stats_orgnising(stats);
}
function ranks_comp_maps(ranks_maps) {
  for (let i = 0; i < maps.length; i++) {
    if (maps[i].id === ranks_maps[i].map_name) {
      playerInfo.Ranks_maps.push({
        map_name: maps[i].name,
        maps_rank_image: `https://cs2.space/api/assets/matchmaking/${ranks_maps[i].rank}.svg`,
        rank_number: ranks_maps[i].rank,
      });
    }
  }
}

function stats_orgnising(stats) {
  Object.assign(playerInfo.overview, {
    preaim: stats.preaim,
    reaction_time_ms: stats.reaction_time_ms,
    spray_accuracy: stats.spray_accuracy,
    accuracy_enemy_spotted: stats.accuracy_enemy_spotted,
    trade_kills: stats.trade_kills_success_percentage,
  });

  console.log(stats);
}
async function leetify_main_func(id) {
  const info = await get_leetify_info(id);
  sorting_leetify_data(info);
  Sending_User_Fullinfo();
  // console.log(playerInfo);
}
export async function Sending_User_Fullinfo() {
  console.log(
    "leetify.js has been tirgired and Sending_User_Fullinfo has been trigired",
  );
  console.log("PlAYER INFO AT THE END IN LEETIFY: ",playerInfo);
  return playerInfo;
}
