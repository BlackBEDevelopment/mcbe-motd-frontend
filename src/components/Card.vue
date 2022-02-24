<template>
  <v-card>
    <v-card-title>
      <span class="subtitle-1">{{ title }}</span>
    </v-card-title>
    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Card",
  props: ['title']
}
</script>

<style scoped>

</style>
