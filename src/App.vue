<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from './supabase'
import LandingPage from './components/LandingPage.vue'
import Dashboard from './components/Dashboard.vue'

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_event, _session) => {
    session.value = _session
  })
})
</script>

<template>
  <div class="app-root">
    <Dashboard v-if="session" :key="session.user.id" />
    <LandingPage v-else />
  </div>
</template>

<style>
:root {
  --primary-color: #014e61;
  --accent-color: #008c9e;
  --background-color: #f8fafc;
  --card-border: #e1e8ed;
  --text-dark: #0a1f29;
  --text-muted: #4b6472;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  background-color: var(--background-color);
  color: var(--text-dark);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-root {
  min-height: 100vh;
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
}
</style>

