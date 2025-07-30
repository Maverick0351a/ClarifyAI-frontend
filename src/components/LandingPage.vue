<template>
  <section class="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 text-white">
    <!-- Navbar -->
    <header class="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
      <h1 class="text-2xl font-bold tracking-tight">Clarify<span class="text-blue-400">AI</span></h1>
      <nav class="space-x-6 text-sm font-medium hidden md:flex">
        <a href="#features" class="hover:text-blue-300">Features</a>
        <a href="#demo" class="hover:text-blue-300">Demo</a>
        <a href="#pricing" class="hover:text-blue-300">Pricing</a>
        <a href="#contact" class="hover:text-blue-300">Contact</a>
      </nav>
      <a href="#" class="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-semibold shadow">Start Free</a>
    </header>

    <!-- Hero -->
    <div class="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h2 class="text-5xl font-extrabold leading-tight tracking-tight">
          Smart <span class="text-blue-400">AI Repair</span>
        </h2>
        <p class="mt-6 text-lg text-gray-200 max-w-lg">
          Fix broken JSON instantly with powerful heuristics + LLMs. Save dev time. Recover fast.
        </p>
        <div class="mt-8 flex space-x-4">
          <a href="#demo" class="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg text-sm font-semibold shadow">Try the Demo</a>
          <a href="#pricing" class="border border-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white hover:text-blue-900 transition">See Pricing</a>
        </div>
        <p class="mt-4 text-sm text-gray-400">No credit card required. Loved by developers.</p>
      </div>

      <!-- Screenshot or code panel -->
      <div class="rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
        <img src="/src/assets/logoIteration2.png" alt="ClarifyAI screenshot" class="w-full h-auto object-cover" />
      </div>
    </div>

    <!-- Features -->
    <section id="features" class="bg-blue-900 px-6 py-16 text-center">
      <h3 class="text-3xl font-bold mb-10">Why Developers Use ClarifyAI</h3>
      <div class="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <div>
          <h4 class="text-xl font-semibold mb-2">AI-Powered Precision</h4>
          <p class="text-gray-300">Smart heuristics + LLMs fix broken JSON effortlessly.</p>
        </div>
        <div>
          <h4 class="text-xl font-semibold mb-2">Save Dev Time</h4>
          <p class="text-gray-300">Skip the manual debugging. ClarifyAI repairs your payloads instantly.</p>
        </div>
        <div>
          <h4 class="text-xl font-semibold mb-2">Reliable for Teams</h4>
          <p class="text-gray-300">Fast, consistent output trusted by engineers worldwide.</p>
        </div>
      </div>
    </section>

    <!-- Demo CTA -->
    <section id="demo" class="bg-gradient-to-r from-blue-800 to-blue-700 px-6 py-20 text-center">
      <h3 class="text-3xl font-bold mb-6">Live JSON Repair Preview</h3>
      <p class="text-gray-300 mb-10">See real-time results from ClarifyAI's repair engine</p>
      <div class="max-w-4xl mx-auto bg-blue-950 p-6 rounded-xl shadow-md">
        <p class="text-sm text-gray-400 mb-2">Example Input:</p>
        <pre class="bg-blue-900 text-left p-4 rounded-md overflow-x-auto text-sm">{ "user": "Jane", "score": 98,, }</pre>
        <p class="text-sm text-gray-400 mt-4 mb-2">ClarifyAI Output:</p>
        <pre class="bg-blue-900 text-left p-4 rounded-md overflow-x-auto text-sm">{ "user": "Jane", "score": 98 }</pre>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="bg-blue-900 px-6 py-20 text-center">
      <h3 class="text-3xl font-bold mb-10">Pricing Plans</h3>
      <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div class="bg-blue-800 p-6 rounded-xl border border-blue-700">
          <h4 class="text-xl font-semibold mb-2">Free</h4>
          <p class="text-gray-300 mb-4">10 repairs/day</p>
          <p class="font-bold text-lg">$0</p>
        </div>
        <div class="bg-blue-800 p-6 rounded-xl border-2 border-blue-400 shadow-lg">
          <h4 class="text-xl font-semibold mb-2">Pro</h4>
          <p class="text-gray-300 mb-4">1,000 repairs/month</p>
          <p class="font-bold text-lg">$9/month</p>
        </div>
        <div class="bg-blue-800 p-6 rounded-xl border border-blue-700">
          <h4 class="text-xl font-semibold mb-2">Enterprise</h4>
          <p class="text-gray-300 mb-4">Custom usage & integrations</p>
          <p class="font-bold text-lg">Contact Us</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-blue-950 px-6 py-10 text-center text-sm text-gray-500">
      © 2025 ClarifyAI. Built with love by developers, for developers.
    </footer>
  </section>
</template>

<script setup>
// No interactivity here — handled elsewhere
</script>

<style scoped>
/* Optional custom styles */
</style>




