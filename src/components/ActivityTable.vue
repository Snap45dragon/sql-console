<template>
  <q-table :columns="columns" :rows="rows" dense flat separator="cell" style="height: 100%" title="Activity"></q-table>
</template>

<script setup>
import {useQueryStore} from "stores/query-store";
import {computed} from "vue";

const queryStore = useQueryStore();
const columns = [
  {
    name: "timestamp",
    label: "Timestamp",
    field: "timestamp",
    sortable: true,
    align: 'left',
  },
  {
    name: "query",
    label: "Query",
    field: "query",
    sortable: true,
    align: 'left',
  },
  {
    name: "rows",
    label: "Rows",
    field: "rows",
    sortable: true,
    align: 'left',
  },
  {
    name: "execution",
    label: "Execution",
    field: "execution",
    sortable: true,
    align: 'left',
  },
  {
    name: "fetching",
    label: "Fetching",
    field: "fetching",
    sortable: true,
    align: 'left',
  },
];

const rows = computed(() => queryStore.getCurrentTabActivityLog)
</script>

<style scoped>

</style>
