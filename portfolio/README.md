# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Backend (Contact Form Email)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in `backend/` with your email credentials:
   ```env
   GMAIL_USER=your_gmail@gmail.com
   GMAIL_PASS=your_app_password
   RECEIVER_EMAIL=sk9664150090@gmail.com
   ```
3. Start the backend server:
   ```bash
   npm run backend
   ```

The backend will run on port 5000 by default.
