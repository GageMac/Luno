<template>
  <div class="dashboard">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-brand">
          <span class="brand-text">Luno Dashboard</span>
        </div>

        <div class="navbar-nav">
          <div class="user-info">
            <span class="user-name">{{ authStore.userFullName }}</span>
            <span class="user-email">{{ authStore.user?.email }}</span>
          </div>
          <button @click="handleLogout" class="logout-button">Logout</button>
        </div>
      </div>
    </nav>

    <!-- Dashboard Content -->
    <div class="dashboard-content">
      <div class="container">
        <!-- Welcome Section -->
        <section class="welcome-section">
          <h1>Welcome back, {{ authStore.user?.firstName }}! 🎉</h1>
          <p>You've successfully logged into Luno. This is your personal dashboard.</p>
        </section>

        <!-- User Info Cards -->
        <section class="info-cards">
          <div class="card">
            <div class="card-header">
              <h3>👤 Profile Information</h3>
            </div>
            <div class="card-content">
              <div class="info-item">
                <label>Full Name:</label>
                <span>{{ authStore.userFullName }}</span>
              </div>
              <div class="info-item">
                <label>Email:</label>
                <span>{{ authStore.user?.email }}</span>
              </div>
              <div class="info-item">
                <label>Member Since:</label>
                <span>{{ formatDate(authStore.user?.createdAt) }}</span>
              </div>
              <div class="info-item">
                <label>Last Login:</label>
                <span>{{ formatDate(authStore.user?.lastLoginAt) || "First time!" }}</span>
              </div>
              <div class="info-item">
                <label>Email Verified:</label>
                <span
                  class="verification-status"
                  :class="{ verified: authStore.user?.isEmailVerified }"
                >
                  {{ authStore.user?.isEmailVerified ? "✅ Verified" : "❌ Not Verified" }}
                </span>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3>🚀 Getting Started</h3>
            </div>
            <div class="card-content">
              <p>Now that you're authenticated, you can:</p>
              <ul class="feature-list">
                <li>✨ Explore the authenticated routes</li>
                <li>🔒 Access protected resources</li>
                <li>👤 Update your profile information</li>
                <li>🔑 Change your password</li>
                <li>📊 View your personalized data</li>
              </ul>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3>🛠️ Next Steps</h3>
            </div>
            <div class="card-content">
              <p>This authentication system includes:</p>
              <ul class="feature-list">
                <li>🔐 JWT Token Authentication</li>
                <li>🛡️ Secure Password Hashing</li>
                <li>📱 Responsive Design</li>
                <li>⚡ Real-time Form Validation</li>
                <li>🔄 Automatic Token Refresh</li>
                <li>🎨 Modern UI Components</li>
              </ul>
              <button @click="showProfile = !showProfile" class="toggle-button">
                {{ showProfile ? "Hide" : "Show" }} Profile Management
              </button>
            </div>
          </div>
        </section>

        <!-- Profile Management (Toggleable) -->
        <section v-if="showProfile" class="profile-section">
          <div class="card">
            <div class="card-header">
              <h3>👤 Update Profile</h3>
            </div>
            <div class="card-content">
              <form @submit.prevent="updateProfile" class="profile-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input
                      id="firstName"
                      v-model="profileForm.firstName"
                      type="text"
                      class="form-input"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input
                      id="lastName"
                      v-model="profileForm.lastName"
                      type="text"
                      class="form-input"
                      required
                    />
                  </div>
                </div>
                <button type="submit" class="update-button" :disabled="authStore.isLoading">
                  {{ authStore.isLoading ? "Updating..." : "Update Profile" }}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

// Composables
const router = useRouter();
const authStore = useAuthStore();

// State
const showProfile = ref(false);
const profileForm = ref({
  firstName: "",
  lastName: "",
});

// Methods
const handleLogout = () => {
  authStore.logout();
  router.push("/auth");
};

const updateProfile = async () => {
  try {
    await authStore.updateProfile(profileForm.value);
    alert("Profile updated successfully!");
  } catch (error) {
    alert("Failed to update profile");
  }
};

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Initialize profile form with current user data
onMounted(() => {
  if (authStore.user) {
    profileForm.value.firstName = authStore.user.firstName;
    profileForm.value.lastName = authStore.user.lastName;
  }
});
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: #f8fafc;
}

/* Navigation */
.navbar {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-name {
  font-weight: 600;
  color: #111827;
}

.user-email {
  font-size: 0.875rem;
  color: #6b7280;
}

.logout-button {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-button:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

/* Dashboard Content */
.dashboard-content {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.welcome-section {
  margin-bottom: 3rem;
  text-align: center;
}

.welcome-section h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
}

.welcome-section p {
  font-size: 1.125rem;
  color: #6b7280;
}

/* Cards */
.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1.5rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.card-content {
  padding: 1.5rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item label {
  font-weight: 500;
  color: #374151;
}

.info-item span {
  color: #6b7280;
}

.verification-status {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
}

.verification-status.verified {
  background: #dcfce7;
  color: #166534;
}

.verification-status:not(.verified) {
  background: #fef2f2;
  color: #991b1b;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
}

.feature-list li {
  padding: 0.5rem 0;
  color: #6b7280;
}

.toggle-button {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.toggle-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

/* Profile Section */
.profile-section {
  margin-top: 2rem;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.form-input {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
}

.update-button {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.update-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

.update-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-container {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }

  .navbar-nav {
    width: 100%;
    justify-content: space-between;
  }

  .container {
    padding: 0 1rem;
  }

  .info-cards {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .welcome-section h1 {
    font-size: 2rem;
  }
}
</style>
