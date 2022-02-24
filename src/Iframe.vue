<template>
  <div>
    <v-app>
      <div v-if="error" class="text-center pt-4">
        <h1>服务器不在线</h1>
      </div>
      <server-info v-else :query_data="data" v-bind:loading="loading" v-bind:join_open="join_open"></server-info>
      <v-fade-transition v-if="demo">
        <v-overlay
            absolute
            color="grey darken-1"
            opacity="0.4"
        >
          <span class="title">预览图</span>
        </v-overlay>
      </v-fade-transition>
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
    },
    loading: true,
    demo: false,
    join_open: false
  }),
  created() {
    let ip = router.currentRoute.query.ip;
    let port = router.currentRoute.query.port;
    let dark = router.currentRoute.query.dark;
    let demo = router.currentRoute.query.demo;
    let join_open = router.currentRoute.query.join_open;
    if (ip === undefined || port === undefined || ip === null || port === null) {
      this.error = true;
    } else {
      this.input.ip = ip;
      this.input.port = port;
    }
    if (demo !== undefined && demo !== null) {
      this.demo = true;
    }
    if (join_open !== undefined && join_open !== null) {
      this.join_open = true;
    }
    if (dark === undefined || dark === null) {
      console.log(dark)
      this.$vuetify.theme.dark = false;
    } else this.$vuetify.theme.dark = dark === 'true';
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
        this.loading = false;
        this.data.status = res.data.status !== "offline";
      }).catch((err) => {
        this.loading = false;
        console.log(err);
      });
    }
  }
}
</script>

<style>
@import "assets/main.css";
</style>
