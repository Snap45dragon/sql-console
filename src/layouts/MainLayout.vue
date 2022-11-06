<template>
  <q-layout view="hHr lpR fFf">

    <q-header class="bg-primary text-white" elevated>
      <q-toolbar>
        <q-toolbar-title>
          SQL Console
        </q-toolbar-title>

        <q-btn dense flat icon="schema" :label="queryStore.currentSchema" @click="toggleRightDrawer"/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" bordered side="right">
      <SchemaList/>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import SchemaList from "components/SchemaList";
import {useQueryStore} from "stores/query-store";
import {ref} from 'vue'

const queryStore = useQueryStore();

const rightDrawerOpen = ref(false)

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>
