<template>
  <div>
    <q-item-label header>Schemas</q-item-label>
    <q-separator/>
    <q-tree
      v-model:selected="selected"
      :nodes="schemas"
      class="q-px-md q-py-md"
      dense
      no-connectors
      no-transition
      node-key="label"
      selected-color="primary"
    ></q-tree>
  </div>
</template>

<script setup>
import {useQueryStore} from "stores/query-store";
import {computed, ref} from "vue";

const queryStore = useQueryStore();

const selected = computed({
  get() {
    return queryStore.currentSchema;
  },
  set(newValue) {
    queryStore.setCurrentSchema(newValue);
  }
})

// dummy list of schemas and its associated tabled and columns
const schemas = ref([
  {
    label: 'northwind',
    icon: 'schema',
    selectable: true,
    children: [
      {
        label: 'categories',
        icon: 'table_view',
        selectable: false,
        children: [
          {label: 'categoryId', icon: 'view_column', selectable: false},
          {label: 'categoryName', icon: 'view_column', selectable: false},
          {label: "description", icon: 'view_column', selectable: false},
          {label: "picture", icon: 'view_column', selectable: false},
        ]
      },
      {
        label: 'customers',
        icon: 'table_view',
        selectable: false,
        children: [
          {label: 'customerID', icon: 'view_column', selectable: false},
          {label: 'companyName', icon: 'view_column', selectable: false},
          {label: "contactName", icon: 'view_column', selectable: false},
          {label: "contactTitle", icon: 'view_column', selectable: false},
          {label: "address", icon: 'view_column', selectable: false},
          {label: "city", icon: 'view_column', selectable: false},
          {label: "region", icon: 'view_column', selectable: false},
          {label: "postalCode", icon: 'view_column', selectable: false},
          {label: "country", icon: 'view_column', selectable: false},
          {label: "phone", icon: 'view_column', selectable: false},
          {label: "fax", icon: 'view_column', selectable: false},
        ]
      },
      {
        label: 'employee_territories',
        icon: 'table_view',
        selectable: false,
        children: [
          {label: 'employeeID', icon: 'view_column', selectable: false},
          {label: 'territoryID', icon: 'view_column', selectable: false},
        ]
      },
      {
        label: 'employees',
        icon: 'table_view',
        selectable: false,
        children: [
          {label: 'employeeID', icon: 'view_column', selectable: false},
          {label: 'lastName', icon: 'view_column', selectable: false},
          {label: 'firstName', icon: 'view_column', selectable: false},
          {label: 'title', icon: 'view_column', selectable: false},
          {label: 'titleOfCourtesy', icon: 'view_column', selectable: false},
          {label: 'birthDate', icon: 'view_column', selectable: false},
          {label: 'hireDate', icon: 'view_column', selectable: false},
          {label: 'address', icon: 'view_column', selectable: false},
          {label: 'city', icon: 'view_column', selectable: false},
          {label: 'region', icon: 'view_column', selectable: false},
          {label: 'postalCode', icon: 'view_column', selectable: false},
          {label: 'country', icon: 'view_column', selectable: false},
          {label: 'homePhone', icon: 'view_column', selectable: false},
          {label: 'extension', icon: 'view_column', selectable: false},
          {label: 'photo', icon: 'view_column', selectable: false},
          {label: 'notes', icon: 'view_column', selectable: false},
          {label: 'reportsTo', icon: 'view_column', selectable: false},
          {label: 'photoPath', icon: 'view_column', selectable: false},
        ]
      }
    ]
  },
  {
    label: 'southbound',
    icon: 'schema',
    selectable: true,
    children: [
      {
        label: 'order_details',
        icon: 'table_view',
        selectable: false,
        children: [
          {label: 'orderID', icon: 'view_column', selectable: false},
          {label: 'productID', icon: 'view_column', selectable: false},
          {label: "quantity", icon: 'view_column', selectable: false},
          {label: "discount", icon: 'view_column', selectable: false},
        ]
      },
      {
        label: 'orders',
        icon: 'table_view',
        selectable: false,
        children: [
          {label: 'orderID', icon: 'view_column', selectable: false},
          {label: 'customerID', icon: 'view_column', selectable: false},
          {label: "employeeID", icon: 'view_column', selectable: false},
          {label: "orderDate", icon: 'view_column', selectable: false},
          {label: "requiredDate", icon: 'view_column', selectable: false},
          {label: "shippedDate", icon: 'view_column', selectable: false},
          {label: "shipVia", icon: 'view_column', selectable: false},
          {label: "freight", icon: 'view_column', selectable: false},
          {label: "shipName", icon: 'view_column', selectable: false},
          {label: "shipAddress", icon: 'view_column', selectable: false},
          {label: "shipCity", icon: 'view_column', selectable: false},
          {label: "shipRegion", icon: 'view_column', selectable: false},
          {label: "shipPostalCode", icon: 'view_column', selectable: false},
          {label: "shipCountry", icon: 'view_column', selectable: false},
        ]
      },
    ]
  }
]);

</script>

<style lang="scss" scoped>
</style>
