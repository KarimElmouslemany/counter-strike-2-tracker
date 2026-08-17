import { Sending_steam_info } from "./steam.js";
const API_key_leetify = process.env.EXPO_PUBLIC_LEETIY_API_KEY;

const API_key_parse_bot = process.env.EXPO_PUBLIC_CCSTATS_API_KEY;
export let playerInfo = {};
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
    const leetify_url = `https://api-public.cs-prod.leetify.com/v3/profile?steam64_id=${SteamID}&_leetify_key=${API_key_leetify}`;
    const respone = await fetch(leetify_url);
    const data = await respone.json();
    if (data === "not found") {
      return "user does not have a leetify account";
    }
    return data;
  } catch (error) {
    error.message;
  }
}
async function cs2_stats_web_data(steamID) {
  try {
    const url_cs2_status_gg = `https://api.parse.bot/scraper/8e04485d-f2ca-441f-a18c-e1d6ac48b195/search_player`;
    const respone = await fetch(url_cs2_status_gg, {
      method: "POST",
      body: JSON.stringify({
        query: steamID,
      }),
      headers: {
        "X-API-Key": "pmx_0001cc8b97e53fcf08e87f9b272505c6",
        "Content-type": "application/json",
      },
    });
    const data = await respone.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
function sorting_leetify_data(leetify_data, CS2STATS_gg_data) {
  let peak_rank = CS2STATS_gg_data.data.stats.best;
  console.log("this is peak rank ", peak_rank);
  let ranks_everything_else = leetify_data.ranks;
  let ranks_maps = leetify_data.ranks.competitive;
  let stats = leetify_data.stats;
  Object.assign(playerInfo.ranks, {
    premier_curent_rank: ranks_everything_else.premier,
    premier_image_curent: `https://cs2.space/api/assets/premier/${ranks_everything_else.premier}.svg`,
    premier_peak_rank: peak_rank.rank,
    premier_image_peak: `https://cs2.space/api/assets/premier/${peak_rank.rank}.svg`,
    faceitRank: ranks_everything_else.faceit,
    faceitRank_image: `https://www.hltv.org/img/static/badges/faceit${ranks_everything_else.faceit}.svg`,
    wingmanRank: ranks_everything_else.wingman,
    wingmanRank_image: `https://cs2.space/api/assets/wingman/${ranks_everything_else.wingman}.svg`,
  });
  ranks_comp_maps(ranks_maps);
  stats_orgnising(stats);
}
function ranks_comp_maps(ranks_maps) {
  playerInfo.Ranks_maps = [];
  for (let i = 0; i < ranks_maps.length; i++);
  const maps_found = maps.find((iteam) => iteam.id === ranks_maps[i].map_name);

  if (!maps_found) {
    console.log("this is mmap_found ", maps_found);
  } else {
    playerInfo.Ranks_maps.push({
      map_name: maps_found.name,
      maps_rank_image: `https://cs2.space/api/assets/matchmaking/${ranks_maps[i].rank}.svg`,
      rank_number: ranks_maps[i].rank,
    });
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
}
async function leetify_main_func(id) {
  const info = await get_leetify_info(id);
  const CS2STATS_gg_data = await cs2_stats_web_data(id);
  sorting_leetify_data(info, CS2STATS_gg_data);
  Sending_User_Fullinfo();
}
export async function Sending_User_Fullinfo() {
  console.log("PlAYER INFO AT THE END IN LEETIFY: ", playerInfo);
  return playerInfo;
}
