<template>
    <div id="footer">
        <v-footer
            padless
        >
            <v-card
                class="text-center"
                tile
                width="100%"
            >
                <v-card-text>
                    <v-fab-transition>
                        <v-btn
                            absolute
                            color="pink"
                            dark
                            right
                            top
                            @click="switchTheme"
                        >
                            <v-icon v-if="this.$vuetify.theme.dark" left>mdi-weather-night</v-icon>
                            <v-icon v-else left>mdi-weather-sunny</v-icon>
                            切换主题
                        </v-btn>
                    </v-fab-transition>
                    本项目由 BlackBE 云黑团队开发维护，BlakcBE云黑平台致力于维护服务器游戏平衡。
                    <br>
                    <v-btn
                        class="mx-4"
                        href="https://github.com/blackbedevlopment "
                        icon
                        target="_blank"
                    >
                        <v-icon size="24px">
                            mdi-github
                        </v-icon>
                    </v-btn>
                    <v-btn
                        class="mx-4"
                        href="#"
                        icon
                        target="_blank"
                    >
                        <v-icon size="24px">
                            mdi-email
                        </v-icon>
                    </v-btn>
                    <p>
                        Copyright &copy {{ new Date().getFullYear() }} <strong>BlackBEDevelopment</strong> All Right
                        Reserved.
                    </p>
                </v-card-text>

            </v-card>
        </v-footer>
    </div>
</template>

<script>
export default {
    name: "Footer",
    methods: {
        switchTheme() {
            this.$store.commit('mutationDark', !this.$vuetify.theme.dark);
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        }
    }
}
</script>

<style scoped>

</style>