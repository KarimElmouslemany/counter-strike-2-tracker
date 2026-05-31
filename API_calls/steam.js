const API_Key = "0398A494A62EAB4D439E67759FF16A1E";
const url = `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?appid=730&key=${API_Key}&steamid=76561199043122406`;
let totalhits = 0;
let total_shots_fired = 0;

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
  weapons: [{ id: 0, name: 0, kills: 0, shots: 0, hits: 0, accuracy: 0 }],
  maps: [{ id: 0, name: 0, wins: 0, rounds: 0, winRate: 0 }],
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
async function user_info_simple_display() {
  const user_info = await getuserInfo(API_Key, url);
  for (s of user_info) {
    // console.log(s.name, s.value);
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

  // console.log("this is the total hiites:",totalhits);
  // console.log("this is the total shots:",total_shots_fired);
}
async function retrieving_weapons() {
  const user_info = await getuserInfo(API_Key, url);
  for(w of user_info){
      
  }
}
user_info_simple_display();

