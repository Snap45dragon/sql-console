<template>
  <q-page>
    <q-tabs
      v-model="currentTab"
      align="left"
      class="bg-purple text-white shadow-2"
      dense
      inline-label
      narrow-indicator
    >
      <q-tab v-for="queryTab in queryStore.queryTabs" :key="queryTab.name" :label="queryTab.label" :name="queryTab.name"/>
      <q-tab icon="add" label="New Query" name="add" @click="addNewQueryTab"></q-tab>
    </q-tabs>
    <SqlApp></SqlApp>
  </q-page>
</template>

<script setup>
import SqlApp from "components/SqlApp";
import {useQueryStore} from "stores/query-store";
import {computed} from "vue";

const queryStore = useQueryStore();

const currentTab = computed({
  get() {
    return queryStore.currentQueryTab;
  },
  set(newValue) {
    queryStore.setCurrentQueryTab(newValue);
  }
})

function addNewQueryTab() {
  queryStore.createNewQueryTab();
}
</script>
