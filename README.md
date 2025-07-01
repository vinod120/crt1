## Introduction

The Common Reporting Tool software named `web-crt`, built on [Ant Design 5](https://ant.design/) with a wide range of UI components, forms, tables, charts, and pages. This template leverages [React](https://react.dev/), [Vite](https://vitejs.dev/), [Syncfusion Charts](https://www.syncfusion.com/react-components/react-charts), and [Lucide React](https://lucide.dev/) for icons.

## Tech Stack

This project incorporates modern tools and best practices in web development!

### Framework

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling

#### Design System and Icons

- [Ant Design](https://ant.design/) - Enterprise-class UI design language and React UI library.
- [Lucide React](https://lucide.dev/) - Beautiful and consistent icons.

#### Charts

- [Syncfusion Charts](https://www.syncfusion.com/react-components/react-charts) - Advanced charting library.

<details>
<summary>View more stacks</summary>

#### State Management

- [Redux Toolkit](https://redux-toolkit.js.org/) - Efficient state management.
- [React Redux](https://react-redux.js.org/) - Official React bindings for Redux.

#### Data Fetching

- [Tanstack React Query](https://tanstack.com/query/) - Powerful data fetching and caching.
- [Axios](https://axios-http.com/) - Promise-based HTTP client.

#### Routing

- [React Router](https://reactrouter.com/) - Declarative routing for React.

#### Animations

- [Framer Motion](https://www.framer.com/motion/) - Animation library for React.
- [React Transition Group](https://reactcommunity.org/react-transition-group/) - Transition animations.

#### Utilities

- [Lodash](https://lodash.com/) - Utility library for common tasks.
- [Date-fns](https://date-fns.org/) - Modern date utility library.
- [React Responsive](https://github.com/yocontra/react-responsive) - Media queries in React.
- [React Toastify](https://fkhadra.github.io/react-toastify/) - Notifications.
- [React Virtuoso](https://virtuoso.dev/) - Virtualized lists.

#### Development Tools

- [ESLint](https://eslint.org/) - Linting for code quality.
- [Prettier](https://prettier.io/) - Code formatting.

</details>

## Quick Start

#### Download

- Clone this repo: `git clone url`

### Build Tools

You'll need to install Node.js. Once installed, run `npm install` to install the template's dependencies. All dependencies will be downloaded to the `node_modules` directory.

<details>
<summary>View commands</summary>

```bash
npm install
```

Start a local web server at `http://localhost:3000` (default port):

```bash
npm start
```

Build the project for production:

```bash
npm run build
```

</details>

## File Structure

<details>
<summary>View file tree</summary>

```files
📂 web-crt/
┣ 📂 public/                    # Public assets
┃ ┣ 📃 favicon.ico              # Browser tab icon
┣ 📂 src/                       # Source code
┃ ┣ 📂 components/              # Reusable UI components
┃ ┃ ┣ 📃 backBtn.tsx
┃ ┃ ┣ 📃 breadcrumb.tsx
┃ ┃ ┣ 📃 footer.tsx
┃ ┃ ┣ 📃 header.tsx
┃ ┃ ┣ 📃 preferences.tsx
┃ ┃ ┣ 📃 refreshBtn.tsx
┃ ┃ ┣ 📃 rightSidebar.tsx
┃ ┃ ┣ 📃 sideNav.tsx
┃ ┃ ┣ 📃 toolbar.tsx
┃ ┣ 📂 hooks/                   # Custom React hooks
┃ ┃ ┣ 📃 useAuth.ts
┃ ┃ ┣ 📃 useFullscreen.ts
┃ ┣ 📂 pages/                   # Page components
┃ ┃ ┣ 📃 assetDashboard.tsx
┃ ┃ ┣ 📃 assetDetails.tsx
┃ ┃ ┣ 📃 dashboard.tsx
┃ ┃ ┣ 📃 errors.tsx
┃ ┃ ┣ 📃 graph.tsx
┃ ┃ ┣ 📃 layout.tsx
┃ ┃ ┣ 📃 login.tsx
┃ ┃ ┣ 📃 recentAssets.tsx
┃ ┃ ┣ 📃 reports.tsx
┃ ┃ ┣ 📃 sensorTable.tsx
┃ ┃ ┣ 📃 setup.tsx
┃ ┃ ┣ 📃 study.tsx
┃ ┣ 📂 routes/                  # Routing configuration
┃ ┣ 📂 services/                # API services
┃ ┣ 📂 stores/                  # Redux store setup
┃ ┣ 📂 useQueries/              # Tanstack React Query utilities
┃ ┣ 📂 utils/                   # Utility functions
┃ ┃ ┣ 📃 colors.ts
┃ ┃ ┣ 📃 getGlobal.ts
┃ ┃ ┣ 📃 index.ts
┃ ┃ ┣ 📃 localDB.ts
┃ ┃ ┣ 📃 reportUtils.ts
┃ ┣ 📃 404.tsx                  # Custom 404 page
┃ ┣ 📃 App.tsx                  # Main app component
┃ ┣ 📃 index.css                # Global styles
┃ ┣ 📃 variables.css            # CSS variables
┃ ┣ 📃 main.tsx                 # Entry point
┣ 📃 .editorconfig              # Editor configuration
┣ 📃 .env                       # Environment variables
┣ 📃 .gitignore                 # Git ignore file
┣ 📃 .prettierrc                # Prettier configuration
┣ 📃 eslint.config.js           # ESLint configuration
┣ 📃 index.html                 # HTML entry point
┣ 📃 package.json               # Project dependencies
┣ 📃 package-lock.json          # Dependency lock file
┣ 📃 README.md                  # Project documentation
┣ 📃 tsconfig.json              # TypeScript configuration
┣ 📃 vercel.json                # Vercel deployment config
┣ 📃 vite.config.ts             # Vite configuration
```

</details>

## Coding Standards and Conventions

To maintain consistency and readability across the project, we follow these naming conventions:

## Files and Components: 

Use PascalCase for file names and React components. Example: UserProfile.tsx.

## Functions and Variables: 

Use camelCase for function and variable names. Example: getUserName.

## CSS/SCSS Files: 

Use kebab-case for CSS and SCSS file names. Example: user-profile.scss.