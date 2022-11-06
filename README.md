# SQL Query Console
An sql console for data nerds. View demo - https://sql-console.pages.dev

<!-- About the Project -->
## About the Project
A web-based application capable of running SQL queries and displaying the results of said query. The application includes a space which accepts SQL queries in the form of user inputs, then runs the given query, and displays the result within the application..

<!-- TechStack -->
### Tech Stack
1. Quasar v2 (VueJs Framework)
2. Vue 3 (Frontend Framework)
3. Pinia (Store)
4. Axios (Http Client)
5. Papaparse (CSV parser)

<!-- Features -->
### Features

- Sliding windows UI (Like an IDE)
- Schema selection
  - Tree view of tables and columns
  - Switch active schema
- Multiple query consoles
  - Save queries as sql file to disk
- Activity log for console
  - Query stats
  - Individual logs for each console
- Tabular results
  - Pagination with custom page size
  - Virtual scrolling (render many rows without crashing)
  - Data types of columns on hover
  - Order based on columns
  - Search filter
  - Export table to csv file
  - Fullscreen mode

<!-- Performance -->
## Performance
### PageSpeed Insights
| Metrics                  | Results |
|--------------------------|---------|
| Performance              | 100     |
| First Contentful Paint   | 0.4 s   |
| Time to Interactive      | 0.6 s   |
| Speed Index              | 1.1 s   |
| Total Blocking Time      | 40 ms   |
| Largest Contentful Paint | 0.6 s   |
| Cumulative Layout Shift  | 0.001   |

<!-- Getting Started -->
## Getting Started

<!-- Prerequisites -->
### Prerequisites

This project uses Yarn as package manager

```bash
 npm install --global yarn
```

### Scripts

Install the dependencies

```bash
 yarn
```

Start the app in development

```bash
 yarn dev
```

build project for production

```bash
 yarn build
```
