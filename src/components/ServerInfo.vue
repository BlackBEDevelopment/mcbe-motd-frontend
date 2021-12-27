<template>
    <div id="server-info">
        <v-card elevation="0">
            <v-card-text>
                <v-container fluid>
                    <v-row>
                        <div class="d-flex">
                            <v-card elevation="0" height="80">
                                <v-img
                                    :aspect-ratio="1"
                                    lazy-src="@/assets/pm.png"
                                    src="@/assets/pm.png"
                                    width="80"
                                ></v-img>
                            </v-card>
                            <div class="ml-4">
                                <h2 class="title" v-html="color_replace(this.query_data.motd)"></h2>
                                <div class="text-subtitle-1">
                                    <v-icon size="16">mdi-server</v-icon>
                                    {{ this.query_data.host }}
                                </div>
                            </div>
                        </div>
                    </v-row>
                    <v-row
                        class="pt-4"
                    >
                        <v-btn
                            v-for="item in this.query_data"
                            class="mt-1"
                            color="primary"
                            depressed
                            small
                            style="margin-left: 10px"
                            tile
                        >
                            {{ item }}
                        </v-btn>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "ServerInfo",
    data: () => ({
        query_data: {
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
    methods: {
        color_replace(motd) {
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
            if (map.length > 1) {
                map.forEach((item, index) => {
                    if (color[item.substr(0, 1)] !== undefined) {
                        if (num > 0) {
                            map[index] = "</span>" + color[item.substr(0, 1)] + item.substr(1);
                        } else {
                            map[index] = color[item.substr(0, 1)] + item.substr(1);
                        }
                        num = num + 1;
                        result = result + map[index];
                    }
                });
            } else {
                result = motd;
            }
            return result;
        },
    }
}
</script>

<style scoped>

</style>