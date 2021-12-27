<template>
    <div id="server-info">
        <v-card elevation="0" :loading="loading" :disabled="loading">
            <v-card-text>
                <v-container fluid>
                    <v-row>
                        <div class="d-flex">
                            <v-card elevation="0" height="80">
                                <v-img
                                    v-if="this.query_data !== null || this.query_data.status === true"
                                    :aspect-ratio="1"
                                    lazy-src="@/assets/img_5.png"
                                    src="@/assets/img_5.png"
                                    width="80"
                                ></v-img>
                                <v-img
                                    v-else
                                    :aspect-ratio="1"
                                    lazy-src="@/assets/img_4.png"
                                    src="@/assets/img_4.png"
                                    width="80"
                                ></v-img>
                            </v-card>
                            <div class="ml-4" v-if="this.loading !== true && this.query_data !== null && this.query_data.status === true">
                                <h2 class="title" v-html="text_format(this.query_data.motd)"></h2>
                                <div class="text-subtitle-1">
                                    <v-icon size="16">mdi-server</v-icon>
                                    {{ this.query_data.host }}
                                </div>
                                <div class="text-subtitle-2">
                                    <v-icon size="16">mdi-gamepad</v-icon>
                                    MCBE: {{ this.query_data.version }} | Protocol: {{ this.query_data.agreement }}
                                </div>
                            </div>
                            <div class="ml-4" v-else-if="loading === true">
                                <h2 class="title">正在加载</h2>
                                <div class="text-subtitle-1">
                                    如果迟迟不响应，请刷新页面重试，也许是🐱的api炸了呢
                                </div>
                            </div>
                            <div class="ml-4" v-else>
                                <h2 class="title">当前服务器离线</h2>
                                <div class="text-subtitle-2">
                                    所谓的携手共进不就是这样吗？如果平坦的道理上只有一个人的宽度，那么我会很开心地走上长满荆棘的道路。 --- 樱小路露娜
                                </div>
                            </div>

                        </div>
                    </v-row>
                    <v-row
                        class="pt-4"
                        v-if="this.query_data !== null && this.query_data.status === true"
                    >
                        <v-btn
                            class="mt-1"
                            :color="(this.query_data.gamemode === 'Survival')? 'deep-orange': 'red' "
                            depressed
                            small
                            style="margin-left: 10px"
                            tile
                            dark
                        >
                           游戏模式: {{ this.query_data.gamemode }}
                        </v-btn>
                        <v-btn
                            class="mt-1"
                            color="cyan"
                            depressed
                            small
                            style="margin-left: 10px"
                            tile
                            dark
                        >
                            在线人数: {{ this.query_data.online }} / {{ this.query_data.max }}
                        </v-btn>

                        <v-btn
                            class="mt-1"
                            color="indigo"
                            depressed
                            small
                            style="margin-left: 10px"
                            tile
                            dark
                        >
                            地图名: {{ this.query_data.level_name }}
                        </v-btn>
                        <v-btn
                            class="mt-1"
                            :color="(this.query_data.delay > 50)? 'warning': 'success' "
                            depressed
                            small
                            style="margin-left: 10px"
                            tile
                            dark
                        >
                            延迟: {{ this.query_data.delay }} ms
                        </v-btn>
                    </v-row>
                    <v-row
                        class="pt-4"
                        v-else
                    >
                        <v-btn
                            class="mt-1"
                            depressed
                            small
                            color="primary"
                            style="margin-left: 10px"
                            tile
                            text
                            disabled
                        >
                            加载中
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
    data: () => ({}),
    props: {
        query_data: {
            type: Object | Boolean,
            default() {
                return null;
            }
        },
        loading: {
            type: Boolean,
            default() {
                return true;
            }
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        // 参考: https://github.com/pmmp/PocketMine-MP/blob/stable/src/utils/TextFormat.php
        // 基本实现了基础的替换 有人需要再发npm包吧? 应该不会有吧(((
        // 感觉不是太完美 希望有人提pr吧（（ 也欢迎issue和我讨论
        text_format(motd) {
            const escape = '§';
            const formats = {
                "k": "<span style=text-decoration:line-through>", // 这个好像没啥办法做（（ 就先这样吧
                "l": "<span style=font-weight:bold>",
                "m": "<span style=text-decoration:line-through>",
                "n": "<span style=text-decoration:underline>",
                "o": "<span style=font-style:italic>"
            };
            const reset = {
                "r": "</span>"
            };
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
            let color_state = false;
            let result = "";
            let format_state = false;
            let reset_state = false;
            if (map.length > 1) {
                map.forEach((item, index) => {
                    if (color[item.substr(0, 1)] !== undefined) {
                        if (color_state) {
                            if (reset_state) {
                                reset_state = false;
                            } else {
                                map[index] = "</span>" + color[item.substr(0, 1)] + item.substr(1);
                            }
                        } else {
                            map[index] = color[item.substr(0, 1)] + item.substr(1);
                        }
                        result = result + map[index];
                    } else if (formats[item.substr(0, 1)] !== undefined) {
                        if (format_state) {
                            if (reset_state) {
                                reset_state = false;
                            } else {
                                map[index] = "</span>" + formats[item.substr(0, 1)] + item.substr(1);
                            }
                        } else {
                            map[index] = formats[item.substr(0, 1)] + item.substr(1);
                        }
                        result = result + map[index];
                    } else if (reset[item.substr(0, 1)] !== undefined) {
                        map[index] = "</span>" + item.substr(1);
                        reset_state = true;
                        result = result + map[index];
                    } else {
                        result = result + item.substr(1);
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