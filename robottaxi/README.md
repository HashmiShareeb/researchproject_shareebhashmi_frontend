# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).


## Installation Guide

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)

### Getting Started

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies:

    ```sh
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. Create a `.env` file in the root of your project and add the following environment variables:

    ```env
    VITE_API_BASE_URL=https://api.yourbackend.com
    VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
    ```

### Running the Development Server

Start the development server:

```sh
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Building for Production

To create a production build, run:

```sh
npm run build
# or
yarn build
# or
pnpm build
```

### Using Pinia for State Management

This project uses [Pinia](https://pinia.vuejs.org/) for state management. You can learn more about setting up and using Pinia in the [Pinia documentation](https://pinia.vuejs.org/introduction.html).

### Additional Resources

- [Vue 3 Documentation](https://v3.vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Mapbox GL JS Documentation](https://docs.mapbox.com/mapbox-gl-js/api/)