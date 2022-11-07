<template>
  <q-page>
    <q-tabs
      v-model="currentTab"
      active-bg-color="white"
      active-color="primary"
      align="left"
      class="bg-purple text-white shadow-2"
      dense
      indicator-color="transparent"
      inline-label
    >
      <q-tab
        v-for="queryTab in queryStore.queryTabs"
        :key="queryTab.name"
        :label="queryTab.label"
        :name="queryTab.name"
      >
        <template #default>
          <q-btn class="q-ml-md" dense flat icon="close" round size="8px" @click.stop="closeTab(queryTab.name)"/>
        </template>
      </q-tab>
      <q-tab icon="add" label="New Console" name="add" @click="addNewQueryTab"></q-tab>
    </q-tabs>
    <template v-if="queryStore.queryTabs && queryStore.queryTabs.length > 0">
      <SqlApp></SqlApp>
    </template>
    <template v-else>
      <div class="flex flex-center content-center text-h4" style="height: calc(100vh - 86px);">
        Open a console to write queries
      </div>
    </template>
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

function closeTab(queryTab) {
  queryStore.closeQueryTab(queryTab)
}

function addNewQueryTab() {
  queryStore.createNewQueryTab();
}
</script>
