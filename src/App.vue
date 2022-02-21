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
            <server-info class="elevation-2" v-bind:query_data="data" v-bind:loading="loading"></server-info>
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
                    <v-btn block color="primary" @click="update()" :disabled="loading">查询</v-btn>
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
                          outlined
                          dense
                          v-model="width"
                          label="Width"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="6"
                        md="2"
                    >
                      <v-text-field
                          outlined
                          dense
                          v-model="height"
                          label="Height"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col md="8">
                      <v-btn class="mr-2" v-on:click="()=>{
                        this.dark = !this.dark;
                      }">切换主题</v-btn>
                      <v-btn class="primary" v-on:click="copyLink">一键复制代码</v-btn>
                    </v-col>
                    <v-col cols="12" class="mt-2">
                      <v-textarea
                          rows="3"
                          outlined
                          v-model="iframe"
                          label="代码"
                      ></v-textarea>
                      <div class="elevation-2 mb-5 grey pa-3 text-center" v-if="$vuetify.breakpoint.mdAndUp">
                        <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=500 height=195 scrolling=no :src="link + '&demo=true'"></iframe>
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
    text: '复制成功'
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
      this.input.ip = 'play.easecation.net';
      this.input.port = 19132;
    }else{
      this.input.ip = ip;
      this.input.port = port;
    }

    this.refreshIframe();
  },
  mounted() {
    // this.loading = true;
    this.update(this.input.ip,this.input.port);
  },
  watch: {
    width(){
      this.refreshIframe();
    },
    height(){
      this.refreshIframe();
    },
    dark(){
      this.refreshIframe();
    }
  },
  methods: {
    async query(ip, port) {
      return await axios.get('/api?host=' + ip + ":" + port);
    },
    refreshIframe(){
      this.link = '//' + window.location.host + '/iframe.html?ip='+this.input.ip+'&port='+this.input.port+"&dark="+this.dark;
      this.iframe = '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=500 height=195 scrolling=no src="'+this.link +'"></iframe>';
    },
    update(ip = null,port = null){
      this.loading = true;
      if(ip === null && port === null){
        ip = this.input.ip;
        port = this.input.port;
      }
      this.query(ip,port).then((res) => {
        this.data = res.data;
        this.data.status = res.data.status !== "offline";
        this.loading = false;
      }).catch((err) => {
        console.log(err);
        this.loading = false;
      });
    },
    copyLink(){
      this.copyText(this.iframe,(res)=>{
        this.snackbar = true;
      });
    },
    // 随便网上复制一个得了 （
    copyText(text, callback){ // text: 要复制的内容， callback: 回调
      let tag = document.createElement('input');
      tag.setAttribute('id', 'cp_hgz_input');
      tag.value = text;
      document.getElementsByTagName('body')[0].appendChild(tag);
      document.getElementById('cp_hgz_input').select();
      document.execCommand('copy');
      document.getElementById('cp_hgz_input').remove();
      if(callback) {callback(text)}
    }
  }
};
</script>


<style>
@import "assets/main.css";
</style>
