<template>
  <div class="bg-gray-50 min-h-screen font-sans text-gray-800">
    <!-- Hero -->
    <section class="bg-gradient-to-r from-teal-100 to-cyan-100 text-center py-20 px-6">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-5xl font-extrabold text-teal-800">
          Clarify<span class="text-cyan-600">{AI}</span>
        </h1>
        <p class="mt-4 text-xl text-gray-700">
          Fix Broken JSON Instantly with Smart AI Repair
        </p>
        <button class="mt-6 bg-teal-600 hover:bg-teal-700 text-white text-lg px-6 py-3 rounded-lg shadow-lg font-semibold transition">
          Start Free – No Credit Card Needed
        </button>
      </div>
    </section>

    <!-- Demo Section -->
    <section class="max-w-4xl mx-auto bg-white p-8 mt-12 rounded-xl shadow">
      <h2 class="text-2xl font-bold mb-4">Try ClarifyAI Now</h2>

      <div class="flex items-center justify-between mb-4">
        <label class="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" v-model="isAuthMode" class="form-checkbox rounded">
          Authenticated Mode
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
        class="w-full h-40 border border-gray-300 rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-teal-500 resize-none"
      ></textarea>

      <div class="flex justify-between items-center mt-3">
        <span class="text-sm text-gray-500">{{ jsonInput.length }} characters</span>
        <button @click="repairJson" class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded font-medium">
          {{ repairLoading ? 'Repairing...' : 'Repair JSON' }}
        </button>
      </div>

      <div v-if="repairResult" class="bg-gray-50 mt-6 p-4 rounded-lg border border-teal-200">
        <h3 class="text-sm font-semibold text-teal-600 mb-1">Repaired JSON</h3>
        <pre class="overflow-x-auto text-sm font-mono">{{ repairResult }}</pre>
        <div class="text-xs text-gray-500 mt-2" v-if="tier || credits">
          <span v-if="tier">Tier: {{ tier }}</span>
          <span v-if="credits"> • Remaining Credits: {{ credits }}</span>
        </div>
      </div>

      <div v-if="error" class="bg-red-100 mt-6 p-4 rounded-lg text-red-700">
        {{ error }}
      </div>
    </section>

    <!-- Features -->
    <section class="max-w-6xl mx-auto px-6 py-20">
      <div class="grid md:grid-cols-3 gap-8 text-center">
        <div>
          <h4 class="text-lg font-bold text-gray-900 mb-2">AI-Powered Precision</h4>
          <p class="text-gray-600 text-sm">ClarifyAI uses heuristics and LLMs to correct broken JSON effortlessly.</p>
        </div>
        <div>
          <h4 class="text-lg font-bold text-gray-900 mb-2">Save Dev Time</h4>
          <p class="text-gray-600 text-sm">No more debugging malformed payloads. Focus on what matters.</p>
        </div>
        <div>
          <h4 class="text-lg font-bold text-gray-900 mb-2">Reliable for Teams</h4>
          <p class="text-gray-600 text-sm">Loved by engineers who need fast, reliable JSON recovery.</p>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section class="bg-white py-16 border-t">
      <div class="max-w-5xl mx-auto text-center px-4">
        <h3 class="text-2xl font-bold text-gray-900 mb-8">Pricing Plans</h3>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="border rounded-lg p-6 shadow">
            <h4 class="text-lg font-semibold">Free</h4>
            <p class="text-gray-600 text-sm">10 repairs/day</p>
          </div>
          <div class="border-2 border-teal-600 rounded-lg p-6 shadow-lg">
            <h4 class="text-lg font-semibold text-teal-600">Pro</h4>
            <p class="text-gray-600 text-sm">1,000 repairs/month</p>
          </div>
          <div class="border rounded-lg p-6 shadow">
            <h4 class="text-lg font-semibold">Enterprise</h4>
            <p class="text-gray-600 text-sm">Custom usage & integrations</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const jsonInput = ref('');
const apiKey = ref('');
const isAuthMode = ref(false);
const repairResult = ref('');
const error = ref('');
const tier = ref('');
const credits = ref('');
const repairLoading = ref(false);

const repairJson = async () => {
  error.value = '';
  repairResult.value = '';
  tier.value = '';
  credits.value = '';
  repairLoading.value = true;

  try {
    if (!jsonInput.value) throw new Error('Please enter JSON to repair');
    if (jsonInput.value.length > 10000) throw new Error('Input JSON is too long (max 10,000 characters)');
    if (isAuthMode.value && !apiKey.value) throw new Error('API key is required in authenticated mode');

    const url = isAuthMode.value ? 'http://localhost:8080/repair' : 'http://localhost:8080/repair/demo';
    const headers = { 'Content-Type': 'application/json' };
    if (isAuthMode.value) headers['X-API-Key'] = apiKey.value;

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ json: jsonInput.value })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Repair failed');

    repairResult.value = JSON.stringify(JSON.parse(result.repaired_json), null, 2);
    if (result.tier) tier.value = result.tier;
    if (result.remaining_credits !== undefined) credits.value = result.remaining_credits;
  } catch (err) {
    error.value = err.message;
  } finally {
    repairLoading.value = false;
  }
};
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>


