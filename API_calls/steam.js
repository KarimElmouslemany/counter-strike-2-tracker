const API_Key = "0398A494A62EAB4D439E67759FF16A1E";
const url = `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?appid=730&key=${API_Key}&steamid=76561199043122406`;
let totalhits = 0;
let total_shots_fired = 0;
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
async function getuserInfo(API_Key, url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    let Player_info = data.playerstats.stats;
    return Player_info;
  } catch (error) {
    error.message;
  }
  return Player_info;
}
function user_info_simple_display(user_info) {
  for (s of user_info) {
    if (s.name === "total_shots_fired") {
      total_shots_fired = s.value;
    }
    if (s.name.startsWith("total_hits_")) {
      totalhits += s.value;
    }
    if (s.name === "total_kills") {
      playerInfo.overview.kills = s.value;
      totalKills = s.value;
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
    if (s.name === "total_wins") {
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
  playerInfo.overview.kdRatio =
    playerInfo.overview.kills / playerInfo.overview.deaths;
  playerInfo.overview.winRate =
    (playerInfo.overview.wins / playerInfo.overview.matches) * 100;
  playerInfo.overview.headshotPercent =
    (playerInfo.combat.headshotKills / playerInfo.overview.kills) * 100;
  playerInfo.overview.accuracy = (totalhits / total_shots_fired) * 100;
}
function retrieving_weapons(user_info) {
  let t_kills = 0;
  let t_hits = 0;
  let t_shots = 0;
  let weapon_accuracy = 0;

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
      weapon_accuracy = (t_hits / t_shots) * 100;
      killShare = (t_kills / playerInfo.overview.kills) * 100;
    }
    playerInfo.weapons.push({
      id: n.id,
      name: n.name,
      Kills: t_kills,
      hits: t_hits,
      shots: t_shots,
      accuracy: weapon_accuracy,
      KillShare: killShare,
    });
  }

  console.log(playerInfo);
}
async function main() {
  const user_info = await getuserInfo(API_Key, url);
  user_info_simple_display(user_info);
  retrieving_weapons(user_info);
}
main();
