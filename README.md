# Birthday Wish App

A personalized and interactive birthday greeting website built with React. The app presents a birthday message for Sanu through multiple animated pages, including a welcome screen, special reasons, a heartfelt note, and a final surprise.

## Features

- Four-page interactive birthday experience
- Personalized messages for Sanu
- Responsive layout for desktop and mobile devices
- Animated floating hearts, flowers, and decorative elements
- Birthday date display and custom artwork
- Cinematic instrumental version of the "Happy Birthday" melody
- Gift-box surprise animation
- Browser history support for page navigation

## Built With

- React
- JavaScript
- HTML5
- CSS3
- Web Audio API
- Create React App

## Getting Started

### Prerequisites

Install Node.js and npm on your computer.

### Installation

1. Open a terminal in the project directory:

   ```bash
   cd BirthdayWishApp
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

### `npm start`

Runs the app in development mode and reloads the page when the source code changes.

### `npm run build`

Creates an optimized production build inside the `build` directory.

### `npm test`

Launches the test runner in interactive watch mode.

## Project Structure

```text
BirthdayWishApp/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── App.js
│   ├── index.js
│   └── styles.css
├── package.json
└── README.md
```

## Customization

Personal content is stored in the `wish` object inside `src/App.js`. You can update:

- The recipient's name
- The sender's name
- Birthday messages
- Special reasons
- The final birthday note
- The birthday date

Images are stored in `src/assets`, while colors, animations, spacing, and responsive styles can be customized in `src/styles.css`.

## Audio

The final surprise uses the browser's Web Audio API to generate a cinematic instrumental birthday melody. Audio begins only after the visitor opens the gift, which keeps it compatible with browser autoplay policies.

## Production Build

Create a deployable version with:

```bash
npm run build
```

The generated `build` directory can be deployed to services such as Netlify, Vercel, GitHub Pages, or any static web server.

## Purpose

This project was created as a thoughtful digital birthday surprise, combining personal messages, cheerful visuals, gentle animations, and music in one memorable experience.
