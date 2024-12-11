<template>
  <div
    class="flex flex-row flex-wrap justify-center p-[1rem] lg:items-center lg:p-[0] h-[100vh]"
  >
    <u-card class="border-[1px] border-gray-200 w-[30rem] lg:w-[50rem]">
      <template #header>
        <h2 class="text-3xl font-bold text-center">Login</h2>
      </template>
      <u-form :schema="schema" :state="dataLogin">
        <u-form-group label="Username" name="username">
          <u-input v-model="dataLogin.username"></u-input>
        </u-form-group>
        <u-form-group label="Password" name="password">
          <u-input v-model="dataLogin.password" type="password"></u-input>
        </u-form-group>
        <u-button type="submit" role="button" color="primary" block
          >Login</u-button
        >
      </u-form>
    </u-card>
  </div>
</template>
<script lang="ts" setup>
import * as yup from "yup";
import { Form, Field } from "vee-validate";

const schema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters")
    .max(50, "Username must not exceed 50 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters")
    .max(50, "Password must not exceed 50 characters"),
});

const dataLogin = ref({
  username: null,
  password: null,
});
</script>
