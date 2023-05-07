import RPC from "discord-rpc";
import { APP_ID, RPC_CLIENT_ID, TOPGG_TOKEN } from "./config.js";
import {Api} from "@top-gg/sdk"
const api = new Api(TOPGG_TOKEN)
const client = new RPC.Client({ transport: "ipc" });

client.on("ready", () => {
    console.log("RPC is ready");
    setInterval(async () => {
        const bot = await api.getBot(APP_ID)
        const guilds = await api.getStats(APP_ID)
        client.setActivity({
            details: `Serving ${guilds.serverCount?.toLocaleString()} servers`,
            state: `${bot.monthlyPoints} Mounthly votes`,
            startTimestamp: new Date(),
            largeImageKey:`https://cdn.discordapp.com/avatars/${APP_ID}/${bot.avatar}.png`,
            largeImageText: "Bannerfly",
            buttons: [
                { label: "Invite", url: `https://discord.com/oauth2/authorize?client_id=${APP_ID}&scope=bot&permissions=8` },
                { label: "Vote", url: `https://top.gg/bot/${APP_ID}/vote` }
            ]
        });
    }, 30e3)
});
client.login({ clientId: RPC_CLIENT_ID})