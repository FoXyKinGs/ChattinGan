<template lang="pug">
.box(
  v-for="user in data"
  :keys='user.id'
  @click='change(user)'
)
  p {{ user.username }}
</template>

<script setup>
/* eslint-disable */
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  data: {
    type: Array
  }
})

const emit = defineEmits(['changeRoom'])

const change = (user) => {
  emit('changeRoom', user)
}

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
