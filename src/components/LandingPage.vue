<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-teal-100 to-cyan-100 py-16 px-6 text-center">
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        Fix Broken JSON in Seconds
      </h1>
      <p class="text-xl text-gray-700 max-w-2xl mx-auto mb-6">
        Let AI clean your data while you build. Try ClarifyAI for free.
      </p>
      <button class="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition">
        Start Free – No Credit Card Needed
      </button>
    </section>

    <!-- Demo Section -->
    <section class="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <h2 class="text-xl font-semibold text-gray-800 mb-2">Try ClarifyAI Now</h2>

      <div class="flex items-center justify-between mb-4">
        <label class="flex items-center space-x-2 text-sm">
          <input type="checkbox" v-model="isAuthMode" class="form-checkbox">
          <span>Authenticated Mode</span>
        </label>
        <input
          v-if="isAuthMode"
          v-model="apiKey"
          type="password"
          placeholder="Enter API Key"
          class="border border-gray-300 rounded px-3 py-1 text-sm w-64"
        />
      </div>

      <textarea
        v-model="jsonInput"
        placeholder="Paste your broken JSON here..."
        class="w-full h-40 border border-gray-300 rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-teal-500"
      ></textarea>

      <div class="flex items-center justify-between mt-4">
        <span class="text-sm text-gray-500">{{ jsonInput.length }} characters</span>
        <button @click="repairJson" class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
          <img v-if="repairLoading" src="/logo.svg" alt="logo" class="h-5 w-5 animate-spin">
          <span>{{ repairLoading ? 'Repairing...' : 'Repair JSON' }}</span>
        </button>
      </div>

      <div v-if="repairResult" class="bg-gray-50 mt-6 p-4 rounded-lg border border-teal-200">
        <h3 class="text-sm font-semibold text-teal-600 mb-1">Repaired JSON</h3>
        <pre class="overflow-x-auto text-sm font-mono">{{ repairResult }}</pre>
        <div class="text-xs text-gray-500 mt-2" v-if="tier || credits">
          <span v-if="tier">Tier: {{ tier }} </span>
          <span v-if="credits">• Remaining Credits: {{ credits }}</span>
        </div>
      </div>

      <div v-if="error" class="bg-red-100 mt-6 p-4 rounded-lg text-red-700">
        {{ error }}
      </div>
    </section>

    <!-- Feature Section -->
    <section class="max-w-6xl mx-auto px-6 py-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 class="text-lg font-bold text-gray-900 mb-2">
            AI-Powered Precision
          </h4>
          <p class="text-gray-600">ClarifyAI automatically corrects broken JSON formats using heuristics and large language models.</p>
        </div>
        <div>
          <h4 class="text-lg font-bold text-gray-900 mb-2">
            Save Development Time
          </h4>
          <p class="text-gray-600">Stop wasting hours debugging malformed payloads. Let our API handle the mess.</p>
        </div>
        <div>
          <h4 class="text-lg font-bold text-gray-900 mb-2">
            Built for Developers
          </h4>
          <p class="text-gray-600">“ClarifyAI saved me hours debugging malformed data.” – DevOps Lead</p>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="bg-white py-10 border-t">
      <div class="max-w-4xl mx-auto text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Plans & Pricing</h3>
        <div class="grid md:grid-cols-3 gap-6 mt-6">
          <div class="p-6 border rounded-lg">
            <h4 class="text-lg font-semibold">Free</h4>
            <p class="text-sm text-gray-600">10 repairs/day</p>
          </div>
          <div class="p-6 border-2 border-teal-600 rounded-lg shadow-lg">
            <h4 class="text-lg font-semibold text-teal-600">Pro</h4>
            <p class="text-sm text-gray-600">Up to 1,000 repairs/month</p>
          </div>
          <div class="p-6 border rounded-lg">
            <h4 class="text-lg font-semibold">Enterprise</h4>
            <p class="text-sm text-gray-600">Custom integrations & volume</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const jsonInput = ref('')
const apiKey = ref('')
const isAuthMode = ref(false)
const repairResult = ref('')
const error = ref('')
const tier = ref('')
const credits = ref('')
const repairLoading = ref(false)

const repairJson = async () => {
  error.value = ''
  repairResult.value = ''
  tier.value = ''
  credits.value = ''
  repairLoading.value = true

  try {
    if (!jsonInput.value) throw new Error('Please enter JSON to repair')
    if (jsonInput.value.length > 10000) throw new Error('Input JSON is too long (max 10,000 characters)')
    if (isAuthMode.value && !apiKey.value) throw new Error('API key is required in authenticated mode')

    const url = isAuthMode.value ? 'http://localhost:8080/repair' : 'http://localhost:8080/repair/demo'
    const headers = { 'Content-Type': 'application/json' }
    if (isAuthMode.value) headers['X-API-Key'] = apiKey.value

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ broken_json: jsonInput.value })
    })

    const result = await response.json()
    if (!response.ok) throw new Error(result.detail || 'Repair failed')

    repairResult.value = JSON.stringify(result.repaired_json, null, 2)
    if (result.tier) tier.value = result.tier
    if (result.credits_left !== undefined) credits.value = result.credits_left
  } catch (err) {
    error.value = err.message
  } finally {
    repairLoading.value = false
  }
}
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
