const API_Key = "0398A494A62EAB4D439E67759FF16A1E";
const url_steam = `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?appid=730&key=${API_Key}&steamid=76561199043122406`;
const Image_url = `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/base_weapons.json`;
let totalhits = 0;
let total_shots_fired = 0;
const wepones_images = [];
const weaponList = [
  { id: "ak47", name: "AK-47" },
  { id: "m4a1", name: "M4A1" },
  { id: "awp", name: "AWP" },
  { id: "deagle", name: "Desert Eagle" },
  { id: "galilar", name: "Galil AR" },
  { id: "famas", name: "FAMAS" },
  { id: "aug", name: "AUG" },
  { id: "sg556", name: "SG 553" },
  { id: "ssg08", name: "SSG 08" },
  { id: "glock", name: "Glock-18" },
  { id: "hkp2000", name: "P2000" },
  { id: "p250", name: "P250" },
  { id: "fiveseven", name: "Five-SeveN" },
  { id: "tec9", name: "Tec-9" },
  { id: "elite", name: "Dual Berettas" },
  { id: "mp9", name: "MP9" },
  { id: "mp7", name: "MP7" },
  { id: "p90", name: "P90" },
  { id: "mac10", name: "MAC-10" },
  { id: "nova", name: "Nova" },
  { id: "xm1014", name: "XM1014" },
  { id: "knife", name: "Knife" },
];

const mapList = [
  { id: "de_dust2", name: "Dust 2" },
  { id: "de_inferno", name: "Inferno" },
  { id: "de_nuke", name: "Nuke" },
  { id: "de_train", name: "Train" },
  { id: "de_vertigo", name: "Vertigo" },
  { id: "cs_office", name: "Office" },
];
const playerInfo = {
  overview: {
    kills: 0,
    deaths: 0,
    kdRatio: 0,
    wins: 0,
    matches: 0,
    winRate: "",
    headshotPercent: 0,
    accuracy: 0,
    hoursPlayed: 0,
    mvps: 0,
  },
  combat: {
    damageDone: 0,
    roundsPlayed: 0,
    bombsPlanted: 0,
    bombsDefused: 0,
    pistolRoundWins: 0,
    knifeKills: 0,
    headshotKills: 0,
    flashedKills: 0,
  },
  weapons: [],
  maps: [],
  meta: {
    steamId: 0,
    fetchedAt: 0,
    source: 0,
  },
};
async function getuserInfo(API_Key, url_steam) {
  try {
    const response_steam = await fetch(url_steam);
    const data = await response_steam.json();
    let Player_info = data.playerstats.stats;

    return Player_info;
  } catch (error) {
    error.message;
  }
  return Player_info;
}
async function GetImageInfo(url_images) {
  try {
    const image_respones = await fetch(url_images);
    const image_data = await image_respones.json();
    let Image_info = image_data;
    return Image_info;
  } catch (error) {
    error.message;
  }
  return Image_info;
}
function getting_users_overview_data(user_info) {
  for (const s of user_info) {
    if (s.name === "total_shots_fired") {
      total_shots_fired = s.value;
    }
    if (s.name.startsWith("total_hits_")) {
      totalhits += s.value;
    }
    if (s.name === "total_kills") {
      playerInfo.overview.kills = s.value;
    }
    if (s.name === "total_deaths") {
      playerInfo.overview.deaths = s.value;
    }
    if (s.name === "total_time_played") {
      playerInfo.overview.hoursPlayed = Math.floor(s.value / 3600);
    }
    if (s.name === "total_matches_played") {
      playerInfo.overview.matches = s.value;
    }
    if (s.name === "total_mvps") {
      playerInfo.overview.mvps = s.value;
    }
    if (s.name === "total_matches_won") {
      playerInfo.overview.wins = s.value;
    }
    if (s.name === "total_damage_done") {
      playerInfo.combat.damageDone = s.value;
    }
    if (s.name === "total_rounds_played") {
      playerInfo.combat.roundsPlayed = s.value;
    }
    if (s.name === "total_planted_bombs") {
      playerInfo.combat.bombsPlanted = s.value;
    }
    if (s.name === "total_defused_bombs") {
      playerInfo.combat.bombsDefused = s.value;
    }
    if (s.name === "total_kills_knife") {
      playerInfo.combat.knifeKills = s.value;
    }
    if (s.name === "total_kills_headshot") {
      playerInfo.combat.headshotKills = s.value;
    }
    if (s.name === "total_wins_pistolround") {
      playerInfo.combat.pistolRoundWins = s.value;
    }
    if (s.name === "total_kills_enemy_blinded") {
      playerInfo.combat.flashedKills = s.value;
    }
  }
  metrics_needed_for_calculation(totalhits, total_shots_fired);
}
function metrics_needed_for_calculation(totalhits, shots_fired) {
  playerInfo.overview.kdRatio = (
    playerInfo.overview.kills / playerInfo.overview.deaths
  ).toFixed(2);
  playerInfo.overview.winRate =
    ((playerInfo.overview.wins / playerInfo.overview.matches) * 100).toFixed(
      2,
    ) + "%";
  playerInfo.overview.headshotPercent =
    (
      (playerInfo.combat.headshotKills / playerInfo.overview.kills) *
      100
    ).toFixed(2) + "%";
  playerInfo.overview.accuracy =
    ((totalhits / total_shots_fired) * 100).toFixed(2) + "%";
}
function retrieving_weapons(user_info, wepones_images) {
  let t_kills = 0;
  let t_hits = 0;
  let t_shots = 0;
  let weapon_accuracy = 0;
  let killShare = 0;
  for (const n of weaponList) {
    for (const w of user_info) {
      if (w.name.includes(`total_shots_${n.id}`)) {
        t_shots = w.value;
      }
      if (w.name.includes(`total_kills_${n.id}`)) {
        t_kills = w.value;
      }
      if (w.name.includes(`total_hits_${n.id}`)) {
        t_hits = w.value;
      }
      weapon_accuracy = ((t_hits / t_shots) * 100).toFixed(2) + "%";
      killShare =
        ((t_kills / playerInfo.overview.kills) * 100).toFixed(1) + "%";
    }
    if (n.name === "Knife") {
      playerInfo.weapons.push({
        id: n.id,
        name: n.name,
        Kills: t_kills,
        hits: t_hits,
        shots: t_shots,
        accuracy: weapon_accuracy,
        KillShare: killShare,
        image_url: "../images/Knife_cs2.png",
      });
        console.log("knife image added");
        t_kills = 0;
        t_hits = 0;
        t_shots = 0;
        weapon_accuracy = 0;
        killShare = 0;
      continue;

    } 
     if (n.name === "M4A1") {
      playerInfo.weapons.push({
        id: n.id,
        name: n.name,
        Kills: t_kills,
        hits: t_hits,
        shots: t_shots,
        accuracy: weapon_accuracy,
        KillShare: killShare,
        image_url: wepones_images["M4A1-S"].Image,
      });
        console.log("M4A1 image added");
        t_kills = 0;
        t_hits = 0;
        t_shots = 0;
        weapon_accuracy = 0;
        killShare = 0;
       continue;
    
    }
    else {
      playerInfo.weapons.push({
        id: n.id,
        name: n.name,
        Kills: t_kills,
        hits: t_hits,
        shots: t_shots,
        accuracy: weapon_accuracy,
        KillShare: killShare,
        image_url: wepones_images[n.name].Image,
      });
        t_kills = 0;
        t_hits = 0;
        t_shots = 0;
        weapon_accuracy = 0;
        killShare = 0;
    }
  }

  console.log(playerInfo.weapons);
}
function retrieving_maps(user_info) {
  let map_wins;
  let map_rounds;
  for (const l of mapList) {
    for (const m of user_info) {
      if (m.name === `total_wins_map_${l.id}`) {
        map_wins = m.value;
      }
      if (m.name === `total_rounds_map_${l.id}`) {
        map_rounds = m.value;
      }
    }
    playerInfo.maps.push({
      id: l.id,
      name: l.name,
      wins: map_wins,
      rounds: map_rounds,
      winRate: ((map_wins / map_rounds) * 100).toFixed(1) + "%",
    });
  }
}

function storing_images(weapon_image_info) {
  for (let i = 0; i < weapon_image_info.length; i++) {
    if (weapon_image_info[i].category.name === "Knives") {
      continue;
    }
    if (weapon_image_info[i].category.name === "Equipment") {
      continue;
    }
    if (weapon_image_info[i].category.name === "C4") {
      continue;
    }
    if (weapon_image_info[i].category.name === "Grenades") {
      continue;
    }
    if (weapon_image_info[i].category.name === "Gloves") {
      continue;
    } else {
      wepones_images[weapon_image_info[i].name] = {
        Image: weapon_image_info[i].image,
      };
    }
  }
  return wepones_images;
}
function missing_wepones(wepones_images) {
  for (const weapon of weaponList) {
    if (!wepones_images[weapon.name]) {
      console.log("Missing:", weapon.name);
    }
  }
}
async function CS2_steam_statues() {
  const user_info = await getuserInfo(API_Key, url_steam);
  const weapon_image_info = await GetImageInfo(Image_url);

  const imagesOFWepones = storing_images(weapon_image_info);
  getting_users_overview_data(user_info)
  retrieving_weapons(user_info, imagesOFWepones );
  retrieving_maps(user_info);
  return playerInfo;
}

CS2_steam_statues();
