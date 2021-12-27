<template>
    <div id="banner">
        <v-img
            gradient="to top, rgba(0, 0, 1, 0), rgba(0, 0, 0, 0.33)"
            height="340px"
            max-height="340px"
            min-height="340px"
            src="~@/assets/img_6.png"
        >
            <div class="fill-height mt-0 d-flex mx-auto">
                <v-row
                    align="center"
                    class="text-center"
                    justify="center"
                >
                    <v-col cols="12">
                        <div class="my-15 my-sm-0 mx-6 pa-4">
                            <div class="banner-title font-weight-black white--text">
                                MCBE MOTD
                            </div>
                            <p class="pt-5 white--text subtitle-2">我的世界基岩版服务器实时状态，随时随地查看你的服务器信息，提供众多展示接口并开放全部源代码。</p>
                            <div class="text-center">
                                <gh-btns-star show-count
                                              slug="BlackBEDevelopment/Minecraft-BedrockEdition-Server-Motd"></gh-btns-star>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </v-img>
    </div>
</template>

<script>
export default {
    name: "Banner"
}
</script>

<style>
@import "~vue-github-buttons/dist/vue-github-buttons.min.css";

.banner-title {
    font-size: clamp(1rem, 1rem + 5vw, 3rem);
}

.gh-button-container {
    float: none !important;
}
.gh-button-container a{
    color: black !important;
}
</style>