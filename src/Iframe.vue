<template>
    <div>
        <v-app>
            <div v-if="error" class="text-center pt-4">
                <h1>服务器不在线</h1>
            </div>
            <server-info v-else :query_data="data"></server-info>
        </v-app>
    </div>
</template>

<script>
import ServerInfo from "@/components/ServerInfo";
import router from "@/router";
import axios from "axios";

export default {
    name: "Iframe",
    components: {
        'server-info': ServerInfo
    },
    data: () => ({
        error: false,
        data: null,
        input: {
            ip: null,
            port: null
        }
    }),
    created() {
        let ip = router.currentRoute.query.ip;
        let port = router.currentRoute.query.port;
        if (ip === undefined || port === undefined || ip === null || port === null) {
            this.error = true;
        } else {
            this.input.ip = ip;
            this.input.port = port;
        }
    },
    mounted() {
        if (!this.error) {
            this.update(this.input.ip, this.input.port);
        }
    },
    methods: {
        async query(ip, port) {
            return await axios.get('/api?host=' + ip + ":" + port);
        },
        update(ip, port) {
            this.query(ip, port).then((res) => {
                this.data = res.data;
                this.data.status = res.data.status !== "offline";
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>

<style>
@import "assets/main.css";
</style>