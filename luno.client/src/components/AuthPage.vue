<template>
  <div class="auth-page">
    <LoginForm v-if="currentView === 'login'" @switchToRegister="currentView = 'register'" />
    <RegisterForm v-else @switchToLogin="currentView = 'login'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";

// State
const currentView = ref<"login" | "register">("login");
</script>

<style scoped>
.auth-page {
  width: 100%;
  height: 100%;
}
</style>
