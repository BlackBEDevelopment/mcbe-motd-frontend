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
                        <server-info class="elevation-2" v-bind:query_data="data"></server-info>
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
<!--                  先鸽了  <v-col cols="12"></v-col>
                    <v-col
                        cols="12"

                    >
                        <history></history>
                    </v-col>-->
                </v-row>
            </v-container>
        </v-main>
        <app-footer></app-footer>

    </v-app>
</template>


<script>
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import ServerInfo from "@/components/ServerInfo";
import router from "@/router/index";
import axios from 'axios';
import History from "@/components/History";
export default {
    name: 'App',
    components: {
        'app-banner': Banner,
        'app-footer': Footer,
        'server-info': ServerInfo,
        'history': History
    },
    data: () => ({
        input: {
            ip: null,
            port: null
        },
        data: null
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

        let ip = router.currentRoute.query.ip;
        let port = router.currentRoute.query.port;
        if(ip === undefined || port === undefined || ip === null || port === null){
            // 此处是默认显示的服务器状态信息
            this.input.ip = 'nyan.xyz';
            this.input.port = 19132;
        }else{
            this.input.ip = ip;
            this.input.port = port;
        }
    },
    mounted() {
        this.update(this.input.ip,this.input.port);
    },
    methods: {
        async query(ip, port) {
            return await axios.get('/api?host=' + ip + ":" + port);
        },
        update(ip,port){
            this.query(ip,port).then((res) => {
                this.data = res.data;
                this.data.status = res.data.status !== "offline";
            }).catch((err) => {
                console.log(err);
            });
        }
    }
};
</script>


<style>
@import "assets/main.css";
</style>