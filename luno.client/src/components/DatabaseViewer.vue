<template>
  <div class="database-viewer">
    <h2>Database Tables</h2>

    <button @click="loadTables" :disabled="loading" class="load-btn">
      {{ loading ? "Loading..." : "Load Tables" }}
    </button>

    <div v-if="error" class="error">Error: {{ error }}</div>

    <div v-if="tables.length > 0" class="tables-list">
      <h3>Found {{ tables.length }} tables:</h3>
      <ul>
        <li v-for="table in tables" :key="`${table.schema}.${table.name}`" class="table-item">
          <strong>{{ table.schema }}.{{ table.name }}</strong>
        </li>
      </ul>
    </div>

    <div v-else-if="!loading && !error" class="no-tables">
      No tables loaded yet. Click "Load Tables" to fetch from database.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

// Create a simple interface for our table data
interface TableData {
  name?: string;
  schema?: string;
}

// Reactive state
const tables = ref<TableData[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

// Function to load tables from the API using axios directly
const loadTables = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Call the API endpoint directly
    const response = await axios.get<TableData[]>("https://localhost:7096/api/Database/tables");
    tables.value = response.data;
    console.log("Loaded tables:", response.data);
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Unknown error occurred";
    console.error("Error loading tables:", err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.database-viewer {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.load-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.load-btn:hover:not(:disabled) {
  background: #0056b3;
}

.load-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.error {
  color: #dc3545;
  background: #f8d7da;
  padding: 0.75rem;
  border-radius: 4px;
  margin: 1rem 0;
}

.tables-list {
  margin-top: 1rem;
}

.table-item {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.no-tables {
  color: #6c757d;
  font-style: italic;
  margin-top: 1rem;
}
</style>
