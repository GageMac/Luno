<template>
  <div class="homepage">
    <header class="homepage__header">
      <img src="../assets/logo.svg" alt="Luno Logo" class="homepage__logo" />
      <h1>Welcome to Luno</h1>
      <nav class="homepage__nav">
        <a href="#" class="homepage__nav-link">Home</a>
        <a href="#" class="homepage__nav-link">Features</a>
        <a href="#" class="homepage__nav-link">About</a>
      </nav>
    </header>
    <main class="homepage__main">
      <section class="homepage__section">
        <h2>Get Started</h2>
        <p>This is your new project homepage. Start building your app here!</p>
        <ul>
          <li>Add new features to this page</li>
          <li>Connect to your backend API</li>
          <li>Customize the layout and navigation</li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
// Add composition API logic here as you build features
</script>

<style scoped>
.homepage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8fafc;
}
.homepage__header {
  width: 100%;
  background: #2c3e50;
  color: #fff;
  padding: 2rem 0 1rem 0;
  text-align: center;
}
.homepage__logo {
  width: 80px;
  margin-bottom: 1rem;
}
.homepage__nav {
  margin-top: 1rem;
}
.homepage__nav-link {
  color: #fff;
  margin: 0 1rem;
  text-decoration: none;
  font-weight: 500;
}
.homepage__nav-link:hover {
  text-decoration: underline;
}
.homepage__main {
  flex: 1;
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 2rem;
}
.homepage__section {
  text-align: center;
}
</style>
