<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2>Create Account</h2>
        <p>Join Luno and start building</p>
      </div>

      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input
              id="firstName"
              v-model="registerForm.firstName"
              type="text"
              placeholder="Enter your first name"
              required
              :disabled="authStore.isLoading"
              class="form-input"
              :class="{ error: firstNameError }"
            />
            <span v-if="firstNameError" class="error-message">{{ firstNameError }}</span>
          </div>

          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
              id="lastName"
              v-model="registerForm.lastName"
              type="text"
              placeholder="Enter your last name"
              required
              :disabled="authStore.isLoading"
              class="form-input"
              :class="{ error: lastNameError }"
            />
            <span v-if="lastNameError" class="error-message">{{ lastNameError }}</span>
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="registerForm.email"
            type="email"
            placeholder="Enter your email"
            required
            :disabled="authStore.isLoading"
            class="form-input"
            :class="{ error: emailError }"
          />
          <span v-if="emailError" class="error-message">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-input-container">
            <input
              id="password"
              v-model="registerForm.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Create a password"
              required
              :disabled="authStore.isLoading"
              class="form-input"
              :class="{ error: passwordError }"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="password-toggle"
              :disabled="authStore.isLoading"
            >
              {{ showPassword ? "👁️" : "👁️‍🗨️" }}
            </button>
          </div>
          <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
          <div class="password-strength">
            <div class="strength-indicators">
              <div class="strength-indicator" :class="{ active: passwordStrength >= 1 }"></div>
              <div class="strength-indicator" :class="{ active: passwordStrength >= 2 }"></div>
              <div class="strength-indicator" :class="{ active: passwordStrength >= 3 }"></div>
              <div class="strength-indicator" :class="{ active: passwordStrength >= 4 }"></div>
            </div>
            <span class="strength-text">{{ passwordStrengthText }}</span>
          </div>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <div class="password-input-container">
            <input
              id="confirmPassword"
              v-model="registerForm.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm your password"
              required
              :disabled="authStore.isLoading"
              class="form-input"
              :class="{ error: confirmPasswordError }"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="password-toggle"
              :disabled="authStore.isLoading"
            >
              {{ showConfirmPassword ? "👁️" : "👁️‍🗨️" }}
            </button>
          </div>
          <span v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</span>
        </div>

        <div v-if="authStore.error" class="error-alert">
          {{ authStore.error }}
        </div>

        <button type="submit" class="auth-button" :disabled="authStore.isLoading || !isFormValid">
          <span v-if="authStore.isLoading" class="loading-spinner"></span>
          {{ authStore.isLoading ? "Creating Account..." : "Create Account" }}
        </button>
      </form>

      <div class="auth-footer">
        <p>
          Already have an account?
          <button @click="$emit('switchToLogin')" class="link-button">Sign in here</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import type { RegisterRequest } from "../stores/auth";

// Emits
defineEmits<{
  switchToLogin: [];
}>();

// Composables
const router = useRouter();
const authStore = useAuthStore();

// Form state
const registerForm = ref<RegisterRequest>({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Form validation
const firstNameError = computed(() => {
  if (!registerForm.value.firstName) return "";
  return registerForm.value.firstName.length >= 2 ? "" : "First name must be at least 2 characters";
});

const lastNameError = computed(() => {
  if (!registerForm.value.lastName) return "";
  return registerForm.value.lastName.length >= 2 ? "" : "Last name must be at least 2 characters";
});

const emailError = computed(() => {
  if (!registerForm.value.email) return "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(registerForm.value.email) ? "" : "Please enter a valid email";
});

const passwordError = computed(() => {
  if (!registerForm.value.password) return "";
  if (registerForm.value.password.length < 6) return "Password must be at least 6 characters";
  return "";
});

const confirmPasswordError = computed(() => {
  if (!registerForm.value.confirmPassword) return "";
  return registerForm.value.password === registerForm.value.confirmPassword
    ? ""
    : "Passwords do not match";
});

// Password strength calculation
const passwordStrength = computed(() => {
  const password = registerForm.value.password;
  let strength = 0;

  if (password.length >= 6) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  return Math.min(strength, 4);
});

const passwordStrengthText = computed(() => {
  if (!registerForm.value.password) return "";

  switch (passwordStrength.value) {
    case 1:
      return "Weak";
    case 2:
      return "Fair";
    case 3:
      return "Good";
    case 4:
      return "Strong";
    default:
      return "Very Weak";
  }
});

const isFormValid = computed(() => {
  return (
    registerForm.value.firstName &&
    registerForm.value.lastName &&
    registerForm.value.email &&
    registerForm.value.password &&
    registerForm.value.confirmPassword &&
    !firstNameError.value &&
    !lastNameError.value &&
    !emailError.value &&
    !passwordError.value &&
    !confirmPasswordError.value
  );
});

// Methods
const handleRegister = async () => {
  if (!isFormValid.value || authStore.isLoading) return;

  try {
    await authStore.register(registerForm.value);
    // Redirect to dashboard or intended route
    router.push("/dashboard");
  } catch (error) {
    // Error is handled by the store
    console.error("Registration failed:", error);
  }
};

// Clear errors when component mounts
onMounted(() => {
  authStore.clearError();
});
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.auth-card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header h2 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.auth-header p {
  color: #6b7280;
  font-size: 0.875rem;
}

.auth-form {
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
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input.error {
  border-color: #ef4444;
}

.form-input:disabled {
  background-color: #f9fafb;
  cursor: not-allowed;
}

.password-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  font-size: 1rem;
}

.password-toggle:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.password-strength {
  margin-top: 0.5rem;
}

.strength-indicators {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.25rem;
}

.strength-indicator {
  height: 4px;
  flex: 1;
  background-color: #e5e7eb;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.strength-indicator.active {
  background-color: #10b981;
}

.strength-text {
  font-size: 0.75rem;
  color: #6b7280;
}

.error-message {
  font-size: 0.75rem;
  color: #ef4444;
}

.error-alert {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
}

.auth-button {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.auth-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgba(102, 126, 234, 0.4);
}

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.auth-footer {
  margin-top: 2rem;
  text-align: center;
}

.auth-footer p {
  color: #6b7280;
  font-size: 0.875rem;
}

.link-button {
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  font-size: 0.875rem;
  text-decoration: underline;
}

.link-button:hover {
  color: #5b67d1;
}

/* Mobile responsive */
@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .auth-container {
    padding: 1rem;
  }

  .auth-card {
    padding: 2rem;
  }
}
</style>
