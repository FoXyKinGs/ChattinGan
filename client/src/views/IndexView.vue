<template lang="pug">
.wrapper
  .left-content
    .left-content__header
      h1 ChattinGan
    .left-content__card
      user-card(
        :data='data'
      )
  .right-content
</template>

<script setup>
/* eslint-disable */
import UserCard from '@/components/UserCard.vue'
import axios from 'axios'
import { ref } from 'vue'

const data = ref([])

axios.get('users', {
  token: localStorage.getItem('token')
})
  .then(response => {
    data.value = response.data.data
  })
  .catch(err => {
    console.log(err)
  })

/* eslint-enable */
</script>

<style lang="sass" scoped>
.wrapper
  display: flex
  height: 100vh

  .left-content
    width: 35%
    z-index: 2
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4)

    &__header
      width: 100%
      height: 70px
      border-bottom: 1px solid #efefef
      padding: 10px
      box-shadow: -5px 2px 20px 0 rgba(0, 0, 0, 0.4)

  .right-content
    z-index: 1
    width: 75%
    background: #efefef
</style>
