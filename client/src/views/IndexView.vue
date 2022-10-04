<template lang="pug">
.wrapper
  .left-content
    .left-content__header
      h1 ChattinGan
    .left-content__card
      button(
        @click="init()"
      ) Refresh people list
      user-card(
        :data='data'
        @changeRoom='openRoom'
      )
      button(
        @click="logout()"
      ) Logout
  .right-content
    .no-person(
      v-if='Object.keys(userTo).length === 0'
    )
      p No room has clicked
    chat-room(
      :data='userTo'
      v-else
    )
</template>

<script setup>
/* eslint-disable */
import ChatRoom from '@/components/ChatRoom.vue'
import UserCard from '@/components/UserCard.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const data = ref([])
const userTo = ref({})
const router = useRouter()

const init = () => {
  axios.get(`users/${localStorage.getItem('id')}`, {
    token: localStorage.getItem('token')
  })
    .then(response => {
      data.value = response.data.data
    })
    .catch(err => {
      console.log(err)
    })
}

const openRoom = (user) => {
  userTo.value = user
}

const logout = () => {
  localStorage.clear()
  router.push('/auth/login')
}

/* eslint-enable */
</script>

<style lang="sass" scoped>
.wrapper
  display: flex
  height: 100vh

  .left-content
    width: 35%
    height: 100vh
    z-index: 2
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4)
    overflow: auto

    &__header
      width: 100%
      height: 70px
      border-bottom: 1px solid #efefef
      padding: 10px
      box-shadow: -5px 2px 20px 0 rgba(0, 0, 0, 0.4)

    &__card
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center

      button
        padding: 10px
        cursor: pointer
        width: 50%
        height: 100%
        border: 1px solid black
        color: black
        background: transparent
        border-radius: 10px
        margin: 10px 0

  .right-content
    z-index: 1
    width: 75%
    background: #efefef
    height: 100vh
    display: flex
    justify-content: center
    align-items: center
</style>
