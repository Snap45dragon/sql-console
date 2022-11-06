<template>
  <q-table
    :columns="columns"
    :filter="filter"
    :loading="loading"
    :rows="rows"
    :rows-per-page-options="[0, 10, 50, 100, 500]"
    class="results-table"
    dense
    flat
    separator="cell"
    virtual-scroll
  >
    <template v-slot:top="props">
      <div class="col-2 q-table__title">Output</div>
      <q-space/>
      <template v-if="result">
        <q-input v-model="filter" borderless class="q-mr-md" debounce="300" dense placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
        <q-btn
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" class="q-ml-md" dense
          flat
          round
          @click="props.toggleFullscreen"
        >
          <q-tooltip>Fullscreen</q-tooltip>
        </q-btn>
      </template>
    </template>
    <template v-slot:header-cell="props">
      <q-th :props="props">
        {{ props.col.label }}
        <q-tooltip :offset="[-10, 5]" anchor="bottom start" self="top start">{{ props.col.type }}</q-tooltip>
      </q-th>
    </template>
  </q-table>
</template>

<script setup>
import Papa from "papaparse";
import {useQueryStore} from "stores/query-store";
import {computed, ref} from "vue";

const queryStore = useQueryStore();

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  }
})

const filter = ref("");
queryStore.$subscribe((mutation) => {
  if (mutation.events.key === "currentQueryTab") {
    // current tab changed, reset filters
    filter.value = "";
  }
})

const result = computed(() => queryStore.getCurrentTabResults);
const columns = computed(() => {
  const cols = [];
  if (!result.value) return cols;
  const columnNames = result.value.meta.fields;
  for (const columnName of columnNames) {
    cols.push({
      name: columnName,
      label: columnName,
      field: columnName,
      sortable: true,
      align: 'left',
      type: "Data Type",
    })
  }
  return cols;
})
const rows = computed(() => {
  return result.value ? result.value.data.slice(0, -1) : [];
});

function exportTable() {
  const a = document.createElement("a");
  const blob = new Blob([Papa.unparse(rows.value)],
    {type: "text/csv;charset=utf-8"});
  a.href = window.URL.createObjectURL(blob);
  a.download = "output.csv";
  a.click();
}
</script>

<style lang="scss">
.results-table {
  /* height or max-height is important */
  height: 100%;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th { /* bg color is important for th; just specify one */
    background-color: #fff;
  }

  thead tr th {
    position: sticky;
    z-index: 1 /* this will be the loading indicator */
  }

  thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px;
  }

  thead tr:first-child th {
    top: 0
  }
}
</style>
