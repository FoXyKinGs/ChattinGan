<template lang="pug">
.box(
  v-for="user in data"
  :keys='user.id'
)
  p {{ user.username }}
</template>

<script setup>
/* eslint-disable */
import { defineProps } from 'vue'

const props = defineProps({
  data: {
    type: Array
  }
})

console.log(props.data)

/* eslint-enable */
</script>

<style lang="sass" scoped>
.box
  cursor: pointer
  width: 100%
  height: 40px
  margin: 10px 0
  border-bottom: 1px solid black
</style>
