<template>
  <q-splitter
    v-model="consoleSplitter"
    horizontal
    style="height: calc(100vh - 86px)"
  >
    <template v-slot:before>
      <q-splitter v-model="querySplitter">
        <template v-slot:before>
          <q-toolbar class="bg-grey-3" dense>
            <q-toolbar-title>
              Query
            </q-toolbar-title>
            <q-btn dense flat round @click="saveQuery">
              <q-icon name="save"/>
              <q-tooltip>Save to Disk</q-tooltip>
            </q-btn>
            <q-btn dense flat round @click="runQuery">
              <q-icon name="play_arrow"/>
              <q-tooltip>Run Query</q-tooltip>
            </q-btn>
          </q-toolbar>
          <div class="q-ma-md">
            <q-input
              v-model="query"
              dense
              outlined
              rows="10"
              type="textarea"
            />
          </div>
        </template>
        <template v-slot:after>
          <ActivityTable></ActivityTable>
        </template>
      </q-splitter>
    </template>
    <template v-slot:after>
      <ResultsTable :loading="queryStore.resultLoading"></ResultsTable>
    </template>
  </q-splitter>
</template>

<script setup>
import ActivityTable from "components/ActivityTable";
import ResultsTable from "components/ResultsTable";
import {useQueryStore} from "stores/query-store";
import {computed, ref} from "vue";

const queryStore = useQueryStore();

const querySplitter = ref(60);
const consoleSplitter = ref(31);

const query = computed({
  get() {
    return queryStore.getCurrentTabQuery;
  },
  set(newValue) {
    return queryStore.setCurrentTabQuery(newValue);
  }
})

function saveQuery() {
  const a = document.createElement("a");
  const blob = new Blob([query.value],
    {type: "application/sql;charset=utf-8"});
  a.href = window.URL.createObjectURL(blob);
  a.download = "query.sql";
  a.click();
}

function runQuery() {
  queryStore.getQueryResults();
}
</script>

<style scoped>

</style>
