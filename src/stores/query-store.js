import {api} from "boot/axios";
import Papa from "papaparse";
import {defineStore} from 'pinia';
import {PATHS} from "src/constants/paths";

export const useQueryStore = defineStore('query', {
  state: () => ({
    currentSchema: "northwind",
    queryTabs: [
      {label: "All Categories", name: "all_categories"},
      {label: "All customers", name: "all_customers"},
      {label: "All Orders", name: "all_orders"},
      {label: "All Order Details", name: "all_order_details"},
      {label: "Brownie Points", name: "brownie_points"},
    ],
    queryTabCounter: 1,
    currentQueryTab: "all_categories",
    queries: {
      all_categories: "Select * from categories;",
      all_customers: "Select * from customers;",
      all_orders: "Select * from orders;",
      all_order_details: "Select * from order_details;",
      brownie_points: "Select * from brownie_points",
    },
    results: {},
    resultLoading: false,
    activityLog: {},
  }),
  getters: {
    getCurrentTabQuery: (state) => {
      return state.queries[state.currentQueryTab]
    },
    getCurrentTabResults: (state) => {
      return state.results[state.currentQueryTab]
    },
    getCurrentTabActivityLog: (state) => {
      return state.activityLog[state.currentQueryTab]
    }
  },
  actions: {
    setCurrentSchema(schema) {
      this.currentSchema = schema;
    },
    setCurrentTabQuery(query) {
      this.queries[this.currentQueryTab] = query;
    },
    setCurrentQueryTab(queryTab) {
      this.currentQueryTab = queryTab;
    },
    createNewQueryTab() {
      this.queryTabs.push({label: `Query ${this.queryTabCounter}`, name: `query${this.queryTabCounter}`})
      this.currentQueryTab = `query${this.queryTabCounter}`;
      this.queryTabCounter++;
    },
    async getQueryResults() {
      this.resultLoading = true;
      let queryTab = this.currentQueryTab;
      if (queryTab === "brownie_points") queryTab = "all_order_details";
      const url = PATHS[queryTab.split(/_(.*)/s)[1]];
      return await api.get(url)
        .then((response) => {
          const data = response.data.content;
          let decodedData = atob(data);
          if (this.currentQueryTab === "brownie_points") decodedData = decodedData.repeat(10);
          this.results[this.currentQueryTab] = Papa.parse(decodedData, {
            delimiter: ",",
            newLine: "\n",
            dynamicTyping: true,
            header: true
          });
          const activityLog = this.activityLog[this.currentQueryTab] || [];
          activityLog.push({
            timestamp: Date.now(),
            query: this.queries[this.currentQueryTab],
            rows: ((this.results[this.currentQueryTab].data.length) - 1),
            // dummy data, expected to receive from backend
            execution: "2ms",
            fetching: "3ms",
          })
          this.activityLog[this.currentQueryTab] = activityLog;
          return Promise.resolve();
        })
        .catch(() => {
          return Promise.resolve();
        })
        .finally(() => {
          this.resultLoading = false;
          return Promise.resolve();
        })
    }
  },
});
