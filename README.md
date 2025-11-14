# Playing With Marvel API (UNDER MAINTENANCE)

---

### ⚠️ Project temporarily unavailable (Marvel API sunset)

This project depended on the official **Marvel Developer API**, which was permanently shut down in November 2025.  
As a result, the application currently returns **server errors** and is temporarily unavailable.

## 🎯 For recruiters & hiring managers
### ✅ UI Component Library unaffected

The UI component library extracted from this project —  
👉 **eldav1d-marvel-ui** — **is fully functional** and unaffected by the API shutdown.

It is the part of the project that best represents my work as a **Design System / UI Engineer**.

🔗 **NPM:** https://www.npmjs.com/package/eldav1d-marvel-ui  
🔗 **GitHub repo:** https://github.com/ElDav1d/eldav1d-marvel-ui

This library demonstrates my work in:

- Design System architecture
- Component API design
- Accessibility-driven UI patterns
- Reusable composition patterns
- TypeScript + React component engineering
- Scalable design tokens and theming

---

# PROJECT DESCRIPTION

This project is a web application built with React and TypeScript that mimics the look and feel of the [Marvel Characters](https://www.marvel.com/characters) page.

It fetches data from the Marvel API and allows users to navigate through a list of characters to a character detail page.

This project is designed to practice and display my accesible UI development skills and sensibility.

Some of its UI patterns are being extracted to [eldav1d-marvel-ui](https://www.npmjs.com/package/eldav1d-marvel-ui), a UI components library. [Here you can check its repo](https://github.com/ElDav1d/eldav1d-marvel-ui)

## Features

- **Marvel API Integration**: Fetches character data from the Marvel API.
- **Search Functionality**: Search for characters by name.
- **Ordering Options**: Order the list of characters by name or modification date.
- **Filtering Options**: Filter the list of characters by presence/absence of image or short description.
- **Responsive Design**: The application is fully responsive and provides a robust user experience on both desktop and mobile devices, by its mobile first layout approach and also the implementation of device specific UX/UI patterns
- **Accessibility**: The application is designed with accessibility in mind, following best practices for accessible web design such as:
  - Keyboard navigation support
  - Screen Reader support (tested on VoiceOver)
  - Browser view magnification support
- **Unit Tests**: The application includes role based unit tests in order to ensure the features robustness and its accesibility compliance,

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need Node.js and npm installed on your machine. To check if you have Node.js installed, run this command in your terminal:

```bash
node -v
```

```bash
yarn -v
```

Clone the repository:

git clone <https://github.com/ElDav1d/playing-with-marvel-api.git>

Install the dependencies:

### `npm install` or `yarn`

## Available Scripts

### `npm run start` or `yarn start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run test` or `yarn test`

Launches the test runner in the interactive watch mode.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.
