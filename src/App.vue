<template>
    <v-app>
        <v-img
            src="~@/assets/img.png"
            gradient="to top, rgba(0, 0, 1, 0), rgba(0, 0, 0, 0.33)"
            max-height="380px"
        >
            <div class="fill-height mt-0 mt-md-n15 d-flex mx-auto">
                <v-row
                    justify="center"
                    align="center"
                    class="text-center"
                >
                    <v-col cols="12">
                        <div class="my-15 my-sm-0 mx-6 pa-4">
                            <div class="banner-title font-weight-black white--text">
                                MCBE MOTD
                            </div>
                            <p class="pt-5 white--text subtitle-2">随时随地查看你的服务器信息</p>
                            <a class="github-button" href="https://github.com/BlackBEDevelopment/Minecraft-BedrockEdition-Server-Motd" data-size="large" data-show-count="true" aria-label="Star BlackBEDevelopment/Minecraft-BedrockEdition-Server-Motd on GitHub">Star</a>
                        </div>
                    </v-col>
                </v-row>

            </div>
        </v-img>

        <v-main style="min-height: 60%">
            <v-container style="margin-top: -76px">
                <v-row
                    justify="center"
                >
                    <v-col
                        cols="12"
                        sm="8"
                        md="8"
                        lg="8"
                    >
                        <v-card>
                            <v-card-text>
                                <v-container fluid>
                                    <v-row>
                                        <div class="d-flex">
                                            <v-card elevation="0" height="80">
                                                <v-img
                                                    width="80"
                                                    src="@/assets/pm.png"
                                                    lazy-src="@/assets/pm.png"
                                                    :aspect-ratio="1"></v-img>
                                            </v-card>
                                            <div class="ml-4">
                                                <h2 class="title" v-html="color_replace(this.query.motd)"></h2>
                                                <div class="text-subtitle-1">
                                                    <v-icon size="16">mdi-server</v-icon>
                                                    {{ this.query.host }}
                                                </div>
                                            </div>
                                        </div>
                                    </v-row>
                                    <v-row
                                        class="pt-4"
                                    >
                                        <v-btn
                                            v-for="item in this.query"
                                            small
                                            depressed
                                            tile
                                            color="primary"
                                            style="margin-left: 10px"
                                            class="mt-1"
                                        >
                                            {{ item }}
                                        </v-btn>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="8"
                        md="8"
                        lg="8"
                    >
                        <v-card>
                            <v-card-title>
                                <span class="subtitle-1">输入服务器信息</span>
                            </v-card-title>

                            <v-card-text>
                                <v-row>
                                    <v-col cols="7">
                                        <v-text-field
                                            label="Server IP Address"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="5">
                                        <div>
                                            <span>:</span>
                                            <v-text-field
                                                label="Server Port"
                                            ></v-text-field>
                                        </div>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-btn block color="primary">查询</v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <v-footer
            padless
        >
            <v-card
                tile
                class="text-center"
                width="100%"
            >
                <v-card-text>
                    本项目由 BlackBE 云黑团队开发维护，BlakcBE云黑平台致力于维护服务器游戏平衡。
                    <br>
                    <v-btn
                        class="mx-4"
                        icon
                        href="https://github.com/blackbedevlopment "
                        target="_blank"
                    >
                        <v-icon size="24px">
                            mdi-github
                        </v-icon>
                    </v-btn>
                    <v-btn
                        class="mx-4"
                        icon
                        href="#"
                        target="_blank"
                    >
                        <v-icon size="24px">
                            mdi-email
                        </v-icon>
                    </v-btn>
                    <p>
                        Copyright &copy {{ new Date().getFullYear() }} <strong>BlackBEDevelopment</strong> All Right Reserved.
                    </p>
                </v-card-text>

            </v-card>
        </v-footer>
    </v-app>
</template>

<style>
.banner-title {
    font-size: clamp(1rem, 1rem + 5vw, 3rem);
}
</style>
<script>
import axios from "axios";

export default {
    name: 'App',
    data: () => ({
        query: {
            status: "online",
            host: "nyan.xyz:19132",
            motd: "§3欢迎加入 §eN§2y§4a§6n§2服§4务§6器§e",
            agreement: "471",
            version: "1.17.40",
            online: "0",
            max: "100",
            level_name: "PocketMine-MP",
            gamemode: "Survival",
            delay: 12
        }
    }),
    created() {

    },
    methods:{
        async query(ip,port){
            return await axios.get('/api?host='+ip+":"+port);
        },
        color_replace(motd){
            const escape = '§';
            const color = {
                "0": "<span style=color:#000>",
                "1": "<span style=color:#00A>",
                "2": "<span style=color:#0A0>",
                "3": "<span style=color:#0AA>",
                "4": "<span style=color:#A00>",
                "5": "<span style=color:#A0A>",
                "6": "<span style=color:#FA0>",
                "7": "<span style=color:#AAA>",
                "8": "<span style=color:#555>",
                "9": "<span style=color:#55F>",
                "a": "<span style=color:#5F5>",
                "b": "<span style=color:#5FF>",
                "c": "<span style=color:#F55>",
                "d": "<span style=color:#F5F>",
                "e": "<span style=color:#FF5>",
                "f": "<span style=color:#FFF>",
            };
            let map = motd.split(escape);
            let num = 0;
            let result = "";
            if(map.length > 1){
                map.forEach((item,index) => {
                    if(color[item.substr(0, 1)] !== undefined){
                        if(num > 0){
                            map[index] = "</span>"+color[item.substr(0, 1)] + item.substr(1);
                        }else{
                            map[index] = color[item.substr(0, 1)] + item.substr(1);
                        }
                        num = num+1;
                        result = result + map[index];
                    }
                });
            }else{
                result = motd;
            }
            return result;
        }
    }
};
</script>
