<template>
  <div class="homepage">
    <!-- Modern Navigation Header -->
    <header class="navbar">
      <div class="navbar-container">
        <div class="navbar-brand">
          <img src="../assets/logo.svg" alt="Luno Logo" class="navbar-logo" />
          <span class="brand-text">Luno</span>
        </div>
        <nav class="navbar-nav">
          <a href="#" class="nav-link">Home</a>
          <a href="#" class="nav-link">Features</a>
          <a href="#" class="nav-link">About</a>
          <router-link to="/auth" class="nav-link nav-link--primary">Get Started</router-link>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title">Welcome to <span class="text-gradient">Luno</span></h1>
          <p class="hero-subtitle">
            Build amazing applications with our modern, powerful platform. Start creating something
            extraordinary today.
          </p>
          <div class="hero-actions">
            <router-link to="/auth" class="btn btn--primary">Get Started</router-link>
            <button class="btn btn--secondary">Learn More</button>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-card">
            <div class="card-glow"></div>
            <div class="card-content">
              <div class="card-icon">🚀</div>
              <h3>Ready to Launch</h3>
              <p>Your project is set up and ready to go!</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">What You Can Build</h2>
        <p class="section-subtitle">Powerful tools and features at your fingertips</p>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Built with modern Vue.js and optimized for performance</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🛡️</div>
            <h3>Secure & Reliable</h3>
            <p>Enterprise-grade security with robust .NET backend</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3>Beautiful Design</h3>
            <p>Modern UI components and responsive design system</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔧</div>
            <h3>Developer Friendly</h3>
            <p>Full-stack development with TypeScript and modern tooling</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Database Section -->
    <section class="database-section">
      <div class="container">
        <h2 class="section-title">Database Management</h2>
        <p class="section-subtitle">Explore and manage your data</p>
        <div class="database-wrapper">
          <DatabaseViewer />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import DatabaseViewer from "./DatabaseViewer.vue";
</script>

<style scoped>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.homepage {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-attachment: fixed;
}

/* Navigation */
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.navbar-logo {
  width: 40px;
  height: 40px;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #667eea;
}

.nav-link--primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.nav-link--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  color: white;
}

/* Hero Section */
.hero {
  padding: 6rem 0;
  color: white;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.text-gradient {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn--primary {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
}

.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(251, 191, 36, 0.3);
}

.btn--secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn--secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Hero Visual */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: glow 3s ease-in-out infinite alternate;
}

@keyframes glow {
  0% {
    transform: scale(1) rotate(0deg);
  }
  100% {
    transform: scale(1.1) rotate(180deg);
  }
}

.card-content {
  position: relative;
  z-index: 1;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

/* Features Section */
.features {
  padding: 6rem 0;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #111827;
}

.section-subtitle {
  font-size: 1.125rem;
  text-align: center;
  color: #6b7280;
  margin-bottom: 4rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #111827;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
}

/* Database Section */
.database-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.database-wrapper {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar-container {
    padding: 0 1rem;
  }

  .navbar-nav {
    gap: 1rem;
  }

  .hero-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-actions {
    justify-content: center;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 4rem 0;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }

  .hero-actions {
    flex-direction: column;
    gap: 0.75rem;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>
