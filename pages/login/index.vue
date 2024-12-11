<template>
  <div class="flex flex-row flex-wrap justify-center items-center h-[100vh]">
    <u-card
      class="border-[1px] border-gray-200 w-[30rem] h-[20rem] lg:w-[30rem]"
    >
      <template #header>
        <h2 class="text-3xl font-bold text-center">Login</h2>
      </template>
      <u-form :schema="schema" :state="dataLogin" @submit="handleLoginSubmit">
        <u-form-group class="mb-[1rem]" label="Username" name="username">
          <u-input
            v-model="dataLogin.username"
            placeholder="Enter your username"
            aria-placeholder="Input your username"
          ></u-input>
        </u-form-group>
        <u-form-group label="Password" name="password">
          <u-input
            v-model="dataLogin.password"
            type="password"
            placeholder="Enter your passowrd"
            aria-placeholder="Input your password"
          ></u-input>
        </u-form-group>
        <div class="mt-[1rem]">
          <u-button
            class="disabled:bg-slate-400"
            type="submit"
            role="button"
            color="primary"
            block
            :loading="serverLoading"
          >
            <icon
              v-if="serverLoading"
              size="24"
              name="sync"
              library="mdi"
              class="animate-spin"
            ></icon>
            Login</u-button
          >
        </div>
      </u-form>
    </u-card>
  </div>
</template>
<script lang="ts" setup>
import * as yup from "yup";
import { Form, Field } from "vee-validate";
import { useToast } from "vue-toast-notification";

const $toast = useToast();

definePageMeta({
  layout: "blanks",
  middleware: ["auth"],
});

const router = useRouter();
const auth = useAuth();
const serverError = ref("");
const serverLoading = ref(false);

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
const dataLogin: InfAuthLogin = ref({
  username: "",
  password: "",
});

const handleLoginSubmit = async (event) => {
  serverError.value = "";
  serverLoading.value = true;

  try {
    const login = await auth.login(event.data.username, event.data.password);

    if (login) {
      setTimeout(() => {
        serverLoading.value = false;
        navigateTo("/");
      }, 800);
    } else {
      serverError.value = "Invalid credentials";
      $toast.error(serverError.value, {
        position: "bottom",
      });
    }
  } catch (error) {
    if (error.data?.message === "Validation failed") {
      serverError.value = "Please check your input and try again";
      $toast.error(serverError.value, {
        position: "bottom",
      });
    } else {
      serverError.value = "An error occurred during login";
      $toast.error(serverError.value, {
        position: "bottom",
      });
    }
  }
};
</script>
