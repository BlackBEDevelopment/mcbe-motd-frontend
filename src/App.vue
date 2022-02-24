<template>
  <v-app>
    <v-snackbar
        v-model="snackbar"
        timeout="2000"
        top
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
            <server-info class="elevation-2" v-bind:loading="loading" v-bind:query_data="data" join_open></server-info>
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
                    <v-btn :disabled="loading" block color="primary" @click="update()">查询</v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
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
                <span class="subtitle-1">将服务器实时状态嵌入网页</span>
              </v-card-title>
              <v-card-text>
                <v-container fluid>
                  <v-row dense>
                    <v-col
                        cols="6"
                        md="2"
                    >
                      <v-text-field
                          v-model="width"
                          dense
                          label="Width"
                          outlined
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="6"
                        md="2"
                    >
                      <v-text-field
                          v-model="height"
                          dense
                          label="Height"
                          outlined
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col md="8">
                      <v-btn class="mr-2" v-on:click="()=>{
                        this.dark = !this.dark;
                      }">切换主题
                      </v-btn>
                      <v-btn :class="{'secondary': open_join}" v-on:click="open_join = !open_join">
                        <template v-if="open_join">关闭一键添加</template>
                        <template v-else>开启一键添加</template>
                      </v-btn>
                      <v-btn class="ml-2 primary" v-on:click="copyLink">一键复制代码</v-btn>
                    </v-col>
                    <v-col class="mt-2" cols="12">
                      <v-textarea
                          v-model="iframe"
                          label="代码"
                          outlined
                          rows="3"
                      ></v-textarea>
                      <div v-if="$vuetify.breakpoint.mdAndUp" class="elevation-2 mb-5 grey pa-3 text-center">
                        <iframe :src="link + '&demo=true&time='+(new Date()).valueOf()" border="0" frameborder="no" :height="height" marginheight="0" marginwidth="0"
                                scrolling=no :width="width"></iframe>
                      </div>
                    </v-col>
                  </v-row>

                </v-container>
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
    data: null,
    loading: false,
    iframe: null,
    height: '195px',
    width: '500px',
    link: '/iframe.html?ip=play.easecation.net&port=19132',
    dark: false,
    snackbar: false,
    text: '复制成功',
    open_join: false
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
    if (ip === undefined || port === undefined || ip === null || port === null) {
      // 此处是默认显示的服务器状态信息
      this.input.ip = 'play.easecation.net';
      this.input.port = 19132;
    } else {
      this.input.ip = ip;
      this.input.port = port;
    }

    this.refreshIframe();
  },
  mounted() {
    // this.loading = true;
    this.update(this.input.ip, this.input.port);
  },
  watch: {
    width() {
      this.refreshIframe();
    },
    height() {
      this.refreshIframe();
    },
    dark() {
      this.refreshIframe();
    },
    open_join(){
      this.refreshIframe();
    }
  },
  methods: {
    async query(ip, port) {
      return await axios.get('/api?host=' + ip + ":" + port);
    },
    refreshIframe() {
      this.link = '//' + window.location.host + '/iframe.html?ip=' + this.input.ip + '&port=' + this.input.port + "&dark=" + this.dark;
      if(this.open_join){
        this.link = this.link+'&join_open=true'
      }
      this.iframe = '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width="'+ this.width +'" height="'+ this.height +'" scrolling=no src="' + this.link + '"></iframe>';
    },
    async update(ip = null, port = null) {
      this.loading = true;
      if (ip === null && port === null) {
        ip = this.input.ip;
        port = this.input.port;
      }
      let query = await this.query(ip, port);

      if (query.status === 200) {
        this.data = query.data;
        this.data.status = query.data.status !== "offline";
        this.loading = false;
      } else {
        console.log(query);
        this.loading = false;
      }

      this.refreshIframe();
    },
    copyLink() {
      this.copyText(this.iframe, (res) => {
        this.snackbar = true;
      });
    },
    // 随便网上复制一个得了 （
    copyText(text, callback) { // text: 要复制的内容， callback: 回调
      let tag = document.createElement('input');
      tag.setAttribute('id', 'cp_hgz_input');
      tag.value = text;
      document.getElementsByTagName('body')[0].appendChild(tag);
      document.getElementById('cp_hgz_input').select();
      document.execCommand('copy');
      document.getElementById('cp_hgz_input').remove();
      if (callback) {
        callback(text)
      }
    }
  }
}
</script>


<style>
@import "assets/main.css";
</style>
