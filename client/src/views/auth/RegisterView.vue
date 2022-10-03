<template lang="pug">
.wrapper
  .box
    form(
      @submit.prevent='submit()'
    )
      h1 Register
      section
        label(
          for='username'
        ) Username
        input(
          id='username'
          required
          type='text'
          placeholder='John doe'
          v-model='form.username'
        )
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
          placeholder='Password'
          v-model='form.password'
        )
      button(
        type='submit'
      ) Register
      p
        | have an account?
        router-link(
          to='/auth/login'
        )  Login
</template>

<script setup>
/* eslint-disable */
import axios from 'axios'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  username: '',
  email: '',
  password: ''
})

const submit = () => {
  axios.post('/register', form)
    .then(response => {
      router.push('/auth/login')
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
