<template>
    <v-app>
        <app-banner></app-banner>
        <v-main style="min-height: 60%" v-bind:class="{dark_background: this.$vuetify.theme.dark}">
            <v-container style="margin-top: -59px">
                <v-row
                    dense
                    justify="center"
                >
                    <v-col
                        cols="12"
                        lg="8"
                        md="8"
                        sm="12"
                        xl="6"
                    >
                        <server-info></server-info>
                    </v-col>
                    <v-col cols="12"></v-col>
                    <v-col
                        cols="12"
                        lg="8"
                        md="8"
                        sm="12"
                        xl="6"
                    >
                        <v-card>
                            <v-card-title>
                                <span class="subtitle-1">输入服务器信息</span>
                            </v-card-title>

                            <v-card-text>
                                <v-row dense>
                                    <v-col cols="12" md="7">
                                        <v-text-field
                                            v-model="input.ip"
                                            clearable
                                            dense
                                            label="Server IP Address"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col class="text-center align-center hidden-sm-and-down colon" md="1">
                                        <span>:</span>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-text-field
                                            v-model="input.port"
                                            clearable
                                            dense
                                            label="Server Port"
                                            outlined
                                        ></v-text-field>
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

        <app-footer></app-footer>
    </v-app>
</template>


<script>
import axios from "axios";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import ServerInfo from "@/components/ServerInfo";

export default {
    name: 'App',
    components: {
        'app-banner': Banner,
        'app-footer': Footer,
        'server-info': ServerInfo
    },
    data: () => ({
        input: { // 此处是默认显示的服务器状态信息
            ip: 'nyancat.xyz',
            port: 19132
        }
    }),
    created() {
        let dark = false;
        if (this.$store.state.dark == null) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                dark = true;
            } else {
                const hour = new Date().getHours();
                dark = hour < 5 || hour > 19;
            }
            this.$store.commit('mutationDark', dark);
        } else {
            dark = this.$store.state.dark;
        }
        this.$vuetify.theme.dark = dark;
    },
    methods: {
        async query(ip, port) {
            return await axios.get('/api?host=' + ip + ":" + port);
        },

    }
};
</script>


<style>
@import "assets/main.css";
</style>