<template>
    <div>
        <v-app>
            <server-info></server-info>
        </v-app>
    </div>
</template>

<script>
import ServerInfo from "@/components/ServerInfo";

export default {
    name: "Iframe",
    components: {
        'server-info': ServerInfo
    }
}
</script>

<style>
@import "assets/main.css";
</style>