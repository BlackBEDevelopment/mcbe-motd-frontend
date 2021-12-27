<template>
<div class="pa-3">
    <h1 class="title text-center">查&nbsp询&nbsp记&nbsp录</h1>
    <v-slide-group
        v-model="model"
        show-arrows
    >
        <v-slide-item
            v-for="n in 15"
            :key="n"
            v-slot="{ active, toggle }"
        >

            <v-card
                class="ma-4 hidden-sm-and-down"
                height="120"
                width="220"
                @click="toggle"
            >
                <v-card-text>
                   <v-container>
                       <v-row>
                           <div class="d-flex">
                               <v-card elevation="0" height="80" class="hidden-sm-and-down">
                                   <v-img
                                       :aspect-ratio="1"
                                       lazy-src="@/assets/img_4.png"
                                       src="@/assets/img_4.png"
                                       width="80"
                                   ></v-img>
                               </v-card>
                               <div class="ml-4">
                                   <h2 class="title">233333</h2>
                                   <div class="text-subtitle-1">
                                       <v-icon size="16">mdi-server</v-icon>
                                       2333
                                   </div>
                                   <div class="text-subtitle-2">
                                       <v-icon size="16">mdi-gamepad</v-icon>
                                       22222222
                                   </div>
                               </div>
                           </div>
                       </v-row>
                   </v-container>
                </v-card-text>
                <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                >
                    <v-scale-transition>
                        <v-icon
                            v-if="active"
                            color="white"
                            size="48"
                            v-text="'mdi-close-circle-outline'"
                        ></v-icon>
                    </v-scale-transition>
                </v-row>
            </v-card>
        </v-slide-item>
    </v-slide-group>

    <v-expand-transition>
        <v-sheet
            v-if="model != null"
            tile
        >
           <v-card>
               <v-card-text>

               </v-card-text>
           </v-card>
        </v-sheet>
    </v-expand-transition>
</div>
</template>

<script>
export default {
    name: "History",
    data: () => ({
        model: null,
    })
}
</script>

<style scoped>

</style>