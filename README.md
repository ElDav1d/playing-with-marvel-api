# Playing With Marvel API

---

## ⚠️ Important Note: Mock Data

This project originally consumed the official Marvel API, which has been discontinued.
To maintain functionality and showcase the `eldav1d-marvel-ui` Design System capabilities,
the application now uses statically mocked data.

### Mock Data Strategy

**Characters (100 unique):**

- Real Marvel characters with unique names, descriptions, and images
- Images from Marvel's CDN (`i.annihil.us`) which remains accessible
- **Tradeoff:** With 100 characters but limited unique CDN images, some images repeat in the list
  - 88 characters have working images (cycling through available valid URLs)
  - 12 characters use `image_not_available` placeholder
- Full navigation support - each character has its own detail page
- Search, filtering, and ordering fully functional
- **Infinite scroll clearly visible with 100 characters**

**Comics (30 generic):**

- ⚠️ **Limitation:** All characters share the same 30 generic Marvel comics
- ⚠️ **Image Solution:** Comic CDN URLs were invalid (404 errors), so we reused character image URLs
  - 20 comics use working character images (cycling through 10 verified URLs)
  - 10 comics intentionally use `image_not_available` placeholder
  - **Tradeoff:** Comic images repeat across the comics list
- This is an acceptable compromise for a Design System showcase
- Comics pagination, ordering, and all UI components work perfectly
- A subtle disclaimer is shown in the UI to maintain transparency

**Pagination Systems:**

- Characters: Infinite scroll with `useInfiniteQuery` (100 items)
- Comics: Manual pagination with Previous/Next buttons (30 items, 3 pages)

**Purpose:**
This approach ensures the project remains functional and serves as a reliable showcase
for the UI library components, patterns, and functionality without external API dependencies.

### Technical Implementation

The mock data strategy maintains:

- ✅ Full Design System component showcase
- ✅ All user interactions (search, filter, paginate, sort)
- ✅ Realistic loading states and delays
- ✅ Proper TypeScript interfaces and data structures
- ✅ Honest communication about limitations
- ✅ 100 unique character pages for thorough navigation testing

**Image CDN Challenges:**

During migration, we discovered Marvel's CDN (`i.annihil.us`) has mixed availability:
- ✅ Many character images remain accessible
- ❌ Most comic-specific image URLs return 404 errors
- **Solution:** Comics reuse working character image URLs
- **Result:** Images repeat in both character and comic lists, but all UI components function correctly
- This tradeoff prioritizes functionality and Design System showcase over unique imagery

---

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

It displays Marvel character data (now using mock data due to API discontinuation) and allows users to navigate through a list of characters to a character detail page.

This project is designed to practice and display my accessible UI development skills and sensibility.

Some of its UI patterns are being extracted to [eldav1d-marvel-ui](https://www.npmjs.com/package/eldav1d-marvel-ui), a UI components library. [Here you can check its repo](https://github.com/ElDav1d/eldav1d-marvel-ui)

## Features

- **Mock Data Implementation**: Uses statically mocked Marvel character data with realistic pagination and interactions.
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
