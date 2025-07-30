<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../supabase'

const loading = ref(true)
const session = ref()
const apiKey = ref('')
const credits = ref(0)
const profileFirstName = ref('')
const profileLastName = ref('')

async function getProfile() {
  loading.value = true
  const { data: { session: currentSession } } = await supabase.auth.getSession()
  session.value = currentSession

  if (!session.value) return

  try {
    const { data, error, status } = await supabase
      .from('profiles')
      .select('api_key, credits, first_name, last_name')
      .eq('id', session.value.user.id)
      .single()

    if (error && status !== 406) throw error

    if (data) {
      apiKey.value = data.api_key
      credits.value = data.credits
      profileFirstName.value = data.first_name
      profileLastName.value = data.last_name
    }
  } catch (error) {
    console.error('Error fetching profile:', error.message)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) alert(error.message)
}

onMounted(() => {
  getProfile()
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-12 px-6">
    <div class="max-w-5xl mx-auto">
      <header class="flex items-center justify-between mb-10">
        <h1 class="text-3xl font-bold text-gray-900">Welcome, {{ profileFirstName }}</h1>
        <button @click="signOut" class="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg">
          Sign Out
        </button>
      </header>

      <div v-if="loading" class="text-center text-gray-600">Loading your dashboard…</div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl border border-gray-200 shadow p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">Your API Key</h2>
          <p class="text-gray-600 text-sm mb-3">Use this key to authenticate with the ClarifyAI API.</p>
          <pre class="bg-gray-100 p-3 rounded text-sm overflow-x-auto">{{ apiKey || 'No API Key found.' }}</pre>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 shadow p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">Credits Remaining</h2>
          <p class="text-3xl font-bold text-teal-700">{{ credits }}</p>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 shadow p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">API Documentation</h2>
          <p class="text-gray-600 text-sm mb-3">Read our docs to start integrating ClarifyAI into your workflow.</p>
          <a href="#" class="text-teal-600 font-semibold hover:underline">View Docs</a>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 shadow p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">Manage Billing</h2>
          <p class="text-gray-600 text-sm mb-3">Upgrade your plan or update your payment details.</p>
          <a href="#" class="text-teal-600 font-semibold hover:underline">Go to Billing</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
pre {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
