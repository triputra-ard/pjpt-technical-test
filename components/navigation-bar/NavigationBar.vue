<template>
  <nav
    class="fixed top-0 z-[1020] bg-slate-200 p-[1rem] w-[100%] flex flex-wrap justify-center"
  >
    <div class="flex flex-wrap flex-row gap-1">
      <nuxt-link
        class="ms-[1rem] me-[1rem] hover:font-bold"
        to="/"
        active-class="text-sky-700 font-bold"
        ><icon name="home" library="mdi" size="16"></icon> Home</nuxt-link
      >
      <nuxt-link
        v-if="userData.getUserRole === 'admin'"
        class="ms-[1rem] me-[1rem] hover:font-bold"
        to="/admin"
        active-class="text-sky-700 font-bold"
        ><icon name="account-group" library="mdi" size="16"></icon>
        Admin</nuxt-link
      >
      <nuxt-link
        class="ms-[1rem] me-[1rem] hover:font-bold"
        href="javascript:void(0)"
        @click="logout"
        ><icon name="logout" library="mdi" size="16"></icon> Logout</nuxt-link
      >
    </div>
  </nav>
</template>
<script setup lang="ts">
const { logout } = useAuth();
const userData = useUserStore();
</script>
