import {api} from "boot/axios";
import Papa from "papaparse";
import {defineStore} from 'pinia';
import {PATHS} from "src/constants/paths";

export const useQueryStore = defineStore('query', {
  // initialize state with dummy values where required
  state: () => ({
    // current selected schema to run query on
    currentSchema: "northwind",
    // sql console tabs
    queryTabs: [
      {label: "All Categories", name: "all_categories"},
      {label: "All customers", name: "all_customers"},
      {label: "All Orders", name: "all_orders"},
      {label: "All Order Details", name: "all_order_details"},
      {label: "Brownie Points", name: "brownie_points"},
    ],
    queryTabCounter: 1,
    currentQueryTab: "all_categories",
    // queries for each tab in queryTabs
    queries: {
      all_categories: "Select * from categories;",
      all_customers: "Select * from customers;",
      all_orders: "Select * from orders;",
      all_order_details: "Select * from order_details;",
      brownie_points: "Select * from brownie_points",
    },
    // results for each tab in queryTabs
    results: {},
    resultLoading: false,
    // activity log for each tab in queryTabs
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
      // create new query tabs with the name Query followed by no.
      this.queryTabs.push({label: `Query ${this.queryTabCounter}`, name: `query${this.queryTabCounter}`})
      this.currentQueryTab = `query${this.queryTabCounter}`;
      this.queryTabCounter++;
    },
    updateResults(csv) {
      // parse csv string to rows and columns js objects
      this.results[this.currentQueryTab] = Papa.parse(csv, {
        delimiter: ",",
        newLine: "\n",
        dynamicTyping: true,
        header: true
      });
    },
    updateActivityLog() {
      // initialise with empty array if its first time running query
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
    },
    async getQueryResults() {
      // set loading state to show loading bar in UI
      this.resultLoading = true;
      let queryTab = this.currentQueryTab;
      if (queryTab === "brownie_points") queryTab = "all_order_details";
      // fallback to default categories path for new queries
      const url = PATHS[queryTab.split(/_(.*)/s)[1]] || PATHS["categories"];
      return await api.get(url)
        .then((response) => {
          const data = response.data.content;
          // decode base64 encoded content from GitHub API
          let decodedData = atob(data);
          // replicate data for many rows example
          if (this.currentQueryTab === "brownie_points") decodedData = decodedData.repeat(10);
          this.updateResults(decodedData);
          this.updateActivityLog();
          return Promise.resolve();
        })
        .catch(() => {
          return Promise.resolve();
        })
        .finally(() => {
          // loading complete
          this.resultLoading = false;
          return Promise.resolve();
        })
    }
  },
});
