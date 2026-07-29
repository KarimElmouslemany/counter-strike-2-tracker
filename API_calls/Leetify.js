import  {Sending_steam_info} from "./steam.js";

const playerInfo = Sending_steam_info();



export async function Sending_User_Fullinfo(){
    console.log("leetify.js has been tirgired and Sending_User_Fullinfo has been trigired");
    return playerInfo;
}