<template lang="pug">
.wrapper
  .box
    form(
      @submit.prevent='submit()'
    )
      h1 Login
      section
        label(
          for='email'
        ) Email
        input(
          id='email'
          required
          type='email'
          placeholder='Email@email.com'
          v-model='form.email'
        )
      section
        label(
          for='password'
        ) Password
        input(
          id='password'
          required
          type='password'
          placeholder='Password',
          v-model='form.password'
        )
      button(
        type='submit'
      ) Login
      p
        | doesn't have account?
        router-link(
          to='/auth/register'
        )  Register
</template>

<script setup>
/* eslint-disable */
import axios from 'axios'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const submit = () => {
  axios.post('/login', form)
    .then(response => {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('id', response.data.dataUser.id)
      localStorage.setItem('roomId', response.data.dataUser.room_id)
      router.push('/')
    })
    .catch(err => {
      console.log(err)
    })
}

/* eslint-enable */
</script>

<style lang="sass" scoped>
.wrapper
  position: relative
  display: flex
  justify-content: center
  align-items: center
  height: 100vh

  form
    width: 400px
    border-radius: 15px
    box-shadow: 10px 10px 9px 5px rgba(0, 0, 0, 0.4)
    padding: 10px 20px

    h1
      margin: 0 0 20px 0

    section
      input
        width: 100%
        height: 30px
        border-radius: 10px
        border: 1px solid black
        margin: 10px 0

    button
      width: 50%
      height: 30px
      border: 1px solid black
      color: black
      background: transparent
      border-radius: 10px
      margin: 10px 0
</style>
