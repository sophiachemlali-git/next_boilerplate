![next-js-and-cognito](https://github.com/revstarconsulting/next-js-and-cognito/blob/main/images/tamplate.png)

## Template Next Js + Typescript + AWS Cognito

This repository contains a Next.js application with comprehensive features for authentication using Amazon Cognito.

The project is structured following best practices, with separate concerns for components, configurations, features, hooks, layout, lib (external services logic), pages, stores (Redux Toolkit and Redux Persist), theme (global styles), api (Axios + React Query) types, and utils.

Additionally, the project includes Storybook for UI component development.

## Getting started

```bash

# 1. Clone the repository
git clone https://github.com/your-username/next-js-and-cognito.git my-next-app

# 2. Enter your newly-cloned folder.
cd my-next-app

# 3. Create Environment variables file.
cp .env.local.example .env.local

# 4. Node Version (Make sure nvm is installed according to your operating system (OS): https://github.com/nvm-sh/nvm#nvmrc)

A .nvmrc file is included to keep it in sync with the Node version. Use it or directly use nvm to use version v18.17.0

# 5. Install dependencies. (Make sure yarn is installed: https://yarnpkg.com/lang/en/docs/install)
yarn
```

### Development

```bash
# 6. Run development environmet and open http://localhost:3000
yarn dev

```

### Build

To build the App, run

```bash
yarn build
```

And you will see the generated file in `dist` that ready to be served.

## Tests

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn cypress:open
```

## Husky

The template is configured with Husky to enforce code standardization following best practices and clean code principles. Two processes have been established:

- **pre-commit:** This process runs before generating a successful commit. Here, `yarn format` is set up to ensure code cleanliness according to `prettier rules`. Following that, `yarn lint` is executed to ensure code quality by checking for errors and warnings. Finally, `git add .` is used to stage the changes from the formatting process.

- **pre-push:** In this process, a build is always performed before sending the code to the repository or creating a PR, ensuring its success.

## Github Template (Clean code and Code Review)

The template contains a `pull_request_template` for Github (.github folder), which is automatically generated when a new PR (Pull Request) is created.

In this template, you must enter information about the development, associated ticket, functional tests and report the Scope (Bugix, Enhancement, New Feature, Breaking change).

This ensures quick understanding of the intent of the PR, allows for better change control and a better code review process.

## Project Features

<dl>
  <dt><b>Next.js</b></dt>
  <dd>Framework for building React applications with Routing, Images, Link, Prerendering, Server-Side Rendering (SSR), Static Site Generation (SSG), etc.</dd>

  <dt><b>Amazon Cognito</b></dt>
  <dd>Integration for user authentication (Login, Forgot Password, Pages, etc) </dd>

  <dt><b>Store - Redux Toolkit and Redux Persist</b></dt>
  <dd>State management for authentication and Persistent session storage.</dd>

  <dt><b>Jest Unit Tests and Cypress E2E Tests</b></dt>
  <dd>Testing utilities for unit tests and End-to-end testing with Cypress.</dd>

  <dt><b>Next generation Typescript</b></dt>
  <dd>Always up to date typescript version.</dd>

  <dt><b>Industry-standard routing</b></dt>
  <dd>It's natural to want to add pages (e.g. /about`) to your application, and routing makes this possible.</dd>

  <dt><b>Environment Configuration</b></dt>
  <dd>development, staging and production environment configurations</dd>

  <dt><b>Storybook</b></dt>
  <dd>UI component development environment.</dd>

  <dt><b>React Query</b></dt>
  <dd>Take your API management further with React Query.</dd>

  <dt><b>Linter</b></dt>
  <dd>eslint + prettier = ❤️</dd>
</dl>

## Project Structure (src)

<dl>
  <dt><b>Api</b></dt>
  <dd>Management of the API with Axios, api-client general configuration, and authentication from the Store.</dd>

  <dt><b>Components</b></dt>
  <dd>Shared components used across the entire application</dd>

  <dt><b>Config</b></dt>
  <dd>All the global configuration, env variables etc. get exported from here and used in the app</dd>

  <dt><b>Features</b></dt>
  <dd>Feature based modules</dd>

  <dt><b>Hooks</b></dt>
  <dd>Shared hooks used across the entire application</dd>

  <dt><b>Layout</b></dt>
  <dd>Components for layout, such as Drawer and authentication-related components.</dd>

  <dt><b>Lib</b></dt>
  <dd>Re-exporting different libraries preconfigured for the application. Logic for external services, e.g., Cognito with Amazon Cognito Identity.</dd>

  <dt><b>Pages (Page Router - Next js)</b></dt>
  <dd>Routing, all pages, static pages, dynamic pages, including protected and public pages.</dd>

  <dt><b>Stores</b></dt>
  <dd>Global state stores</dd>

  <dt><b>Theme</b></dt>
  <dd>Global styles and default Material UI provider setup.</dd>

  <dt><b>Types</b></dt>
  <dd>Base types used across the application</dd>

  <dt><b>Utils</b></dt>
  <dd>Shared utility functions</dd>
</dl>

## Next Config `next.config.js`

The template is configured by default to be static and it also has `trailingSlash` set to true to guarantee the correct functioning of routing with AWS., so in the `next.config` we have the following configuration:

- **reactStrictMode: true:** Enables React Strict Mode for enhanced development checks.
- **output: 'export':** Specifies exporting the project as static HTML files.
- **distDir: 'dist':** Defines the directory for the production build output as 'dist'.
- **trailingSlash: true:** Enforces trailing slashes on all routes for consistent URLs.

## Next.js - Page Router - Dynamic Article Page Example

This example demonstrates how to create a dynamic article page in a Next.js project using the `getStaticPaths` and `getStaticProps` functions. These functions allow for the generation of static pages at build time, based on dynamic data.

- The example is implemented in `pages/articles/[id].tsx`.

### Code Overview:

**Sample Article Data:**

- An array named `ARTICLES` contains sample article data, each with an ID, title, and content.

**Article Interface:**

- An interface named `Article` defines the structure of an article, specifying the ID, title, and content.

**Article Page Component:**

- The `ArticlesPage` component is a React functional component that takes an article as a prop and displays its title and content.

**`getStaticPaths` Function:**

- The `getStaticPaths` function generates the paths for all articles during the build process.
- It maps through the articles to create an array of paths based on their IDs.

**`getStaticProps` Function:**

- The `getStaticProps` function fetches the data for a specific article at build time.
- It uses the article ID from the path parameters to find the corresponding article in the sample data.
- If the article is not found, a 404 page is returned.

### Access Dynamic Article (SSG - Static) Pages:

Visit [http://localhost:3000/articles/[id]](http://localhost:3000/articles/[id]) in your browser, replacing `[id]` with the ID of an existing article.

## Next.js - Page Router - Dynamic Pages - Server Side Rendering

Visit [http://localhost:3000/blogs/[id]](http://localhost:3000/blog/[id]) in your browser, replacing `[id]` with the ID of an existing blog.

The template also supports Server-Side Rendering (SSR), as the previous example was done, it would only be to adapt it to SSR with the `getServerSideProps` method and deleting the static methods, but it must be taken into account that for its use AWS ECS must be used to be able to support server themes.

Server-Side Rendering (SSR) is a web development approach where the server generates HTML content during the request, enhancing performance, SEO, and providing a fully rendered page directly from the server.

**`getServerSideProps` Function:**

- The `getServerSideProps` fetches data on the server side before rendering a page.
- In dynamic routing, it generates paths for articles during the build process by mapping IDs, ensuring efficient data availability for page rendering.

## MUI License and Data Grid Usage

MUI provides a robust and well-maintained component library with a flexible licensing model. For our project, we use MUI X Pro for the Data Grid (Table Component) because it offers advanced features such as multiple filtering options, sorting, and better performance optimizations. These features are typically well-received by clients, who are generally willing to purchase the license due to the additional value it provides.

### Default Data Grid (Table Component) Configuration

By default, our Table component utilizes the MUI Data Grid Pro version, ensuring access to all premium features. However, if needed, it is possible to use the standard version of the Data Grid by explicitly importing it. This allows flexibility while maintaining an optimized default experience.

### License Key Configuration

To use MUI X Pro, ensure that the license key is set up correctly. The key can be configured via environment variables:

`NEXT_PUBLIC_MUI_LICENSE_KEY=your-mui-license-key`

All necessary base configurations are already in place, meaning no additional setup is required beyond providing the license key.
