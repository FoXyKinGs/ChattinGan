<template lang="pug">
.chat-room
  .header
    p {{ props.data.username }}
  .content
    .chat(
      v-for='i in 25'
      :keys='i'
      :class="i % 2 === 0 ? 'odd' : 'even'")
      | Hallo
  .footer
    form
      input(
        type='text'
        placeholder='Text message here'
      )
      button(
        type='submit'
      ) Send
</template>

<script setup>
/* eslint-disable */
import { defineProps } from 'vue'

const props = defineProps({
  data: {
    Type: Object
  }
})

/* eslint-enable */
</script>

<style lang="sass" scoped>
.chat-room
  position: relative
  height: 100vh
  width: 100%

  .header
    width: 100%
    height: 70px
    border-bottom: 1px solid black
    padding: 20px

    p
      text-align: left
      font-size: 24px

  .content
    widows: 100%
    height: calc(100vh - 70px - 55px)
    overflow: auto
    padding: 20px 0

    .chat
      width: 60%
      border: 1px solid black
      display: flex
      flex-direction: columns
      margin: 10px
      padding: 10px

    .chat.even
      float: right

  .footer
    position: absolute
    width: 100%
    height: 40px
    border-top: 1px solid black
    bottom: 10px
    padding: 10px

    form
      display: flex
      gap: 5px

      input
        width: 70%
        height: 30px
        border-radius: 15px
        border: 1px solid black

      button
        width: 30%
        border-radius: 15px
        border: 1px solid black
        color: black
        background: transparent
</style>
