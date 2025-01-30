#Task Management System

This is a task management system built using Vite, React, and TypeScript. The application allows users to manage their tasks efficiently. This readme will guide you through setting up the project, building, and running it.

##Features
- Create, Update, Delete Tasks: Users can add new tasks, edit existing ones, and remove them.
- Task Status: Tasks can be marked as completed or pending.
- Search Functionality: Filter tasks by name or status.
- Authentication: Users must log in to access the task management system. The current user is stored in the session, and users cannot access the app without being authenticated.

##Prerequisites
Before you begin, ensure you have the following installed on your system:
- Node.js (v16.0.0 or later)
- npm (or yarn as an alternative)

##Setup
Follow these steps to get your environment set up and start using the task management system.
1. Clone the Repository
   Clone this repository to your local machine:
   git clone https://github.com/your-username/task-management-system.git
2. Install Dependencies
   Navigate to the project directory and install the dependencies:
   cd task-management-system
   npm install
   Alternatively, you can use yarn:
   yarn install
3. Environment Variables
   If your application requires environment variables (e.g., for API endpoints), create a .env file in the root directory and add the necessary configurations.
   Example:
   VITE_API_URL=https://your-api-url.com
4. Start the Development Server
   Run the following command to start the development server:
   npm run dev
   Or, if you're using yarn:
   yarn dev
   The application will be accessible at http://localhost:3000.

##Authorization
To ensure the security of the task management system, users must log in to access the app. 
- The login page allows users to authenticate using their credentials.
- The registration page allows users to create new accounts.
- Upon successful login, the user’s session is stored to maintain their authenticated state.
- If the user is not authenticated, they will not be able to access the task management system.

##Folder Structure
The project follows a simple folder structure:
/src
  /assets       # Static assets like images or data
  /components   # Reusable UI components
  /pages        # Page components
  /styles       # Global styles
  App.tsx       # Main entry component
  main.tsx      # Entry point for React

##Scripts
- npm run dev or yarn dev: Starts the development server.
- npm run build or yarn build: Builds the app for production.
- npm run preview or yarn preview: Previews the production build locally.

##Usage
After setting up and starting the application, you can:
- Create new tasks via the input form.
- Update existing tasks by double clicking on the task name.
- Delete tasks using the trash icon.
- Mark tasks as completed by selecting their status.

##Technologies Used
- Vite for fast and optimized builds.
- React for building the UI.
- TypeScript for static typing and better development experience.
- React Router for page navigation.
- Session-based authentication to secure access to the task management system.
- Local Storage to store the user and task data.


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
