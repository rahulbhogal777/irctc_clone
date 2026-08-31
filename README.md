# IRCTC Clone

An educational, front-end clone of the IRCTC train-booking experience. The application lets users search a sample train catalogue, inspect train routes and fares, enter passenger details, calculate the total fare, and view a booking confirmation. It also supports Firebase email/password and Google authentication and can store bookings in Cloud Firestore.

> This project is not affiliated with IRCTC or Indian Railways. It is a learning project and does not search live trains, check real seat availability, process payments, or create real railway tickets.

## Features

- Search by source, destination, journey date, class, and quota
- Swap source and destination
- Browse trains and view detailed routes and fares
- Add passengers and validate their contact details
- Calculate fares including GST, convenience fees, and catering charges
- Display a complete booking confirmation
- Register and log in with email/password or Google
- Store bookings in Firestore, with a local booking ID fallback
- Navigate client-side with responsive, component-scoped styling

## Tech Stack and Tools

| Tool | Purpose |
| --- | --- |
| React 19 | Component-based UI and state management |
| Vite 6 | Development server, hot reloading, and production builds |
| React Router DOM 7 | Client-side routing between booking screens |
| Firebase | Authentication and Firestore booking storage |
| CSS Modules | Component-scoped styling |
| React Icons | Interface icons |
| React Slick / Slick Carousel | Carousel support |
| ESLint | JavaScript and React code-quality checks |
| Local JSON | Mock train-list and train-detail data |

## Project Structure

```text
src/
├── assets/             # Logos and train images
├── components/         # Navbar, footer, search controls, and route guard
├── config/             # Firebase configuration and authentication helpers
├── context/            # Shared authentication context
├── pages/              # Search, train, booking, auth, and contact screens
├── public/data/        # Mock train data in JSON format
├── styles/             # CSS Modules for pages and components
├── App.jsx             # Application routes
└── main.jsx            # React entry point and AuthProvider setup
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer (Node.js 20 LTS is recommended)
- npm, which is included with Node.js
- A Firebase project for authentication and Firestore persistence

## Installation and Local Setup

1. Clone the repository and enter its directory:

   ```bash
   git clone <repository-url>
   cd irctc_clone
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your Firebase web-app configuration:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

   Find these values in **Firebase Console → Project settings → General → Your apps → SDK setup and configuration**. The measurement ID is optional unless Analytics is enabled.

4. Enable the Firebase services used by the app:

   - Under **Authentication → Sign-in method**, enable **Email/Password**.
   - Enable **Google** if Google sign-in is required.
   - Under **Firestore Database**, create a database with rules appropriate for your environment.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the URL printed by Vite, normally `http://localhost:5173`.

The `.env` file is ignored by Git. Never commit service-account keys, and always protect the Firebase project with suitable Authentication settings and Firestore security rules.

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create an optimized build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

To test a production build:

```bash
npm run build
npm run preview
```

## How the Application Works

1. The home page collects journey preferences and opens the train-results route.
2. Results are read from `src/public/data/trainData.json`.
3. Selecting a train loads route and fare information from `src/public/data/trainDetails.json`.
4. The selected train and class are passed to the booking page using React Router state.
5. The booking page validates passenger/contact data and calculates the fare.
6. It attempts to save the booking in the Firestore `bookings` collection. If Firestore is unavailable, the UI continues with a temporary local booking ID.
7. The confirmation page displays the booking details passed through router state.

Because confirmation details are held in navigation state, refreshing the confirmation page directly may show “No booking information found.”

## Data and Backend Notes

- Train information is mock data. Search filters and checkboxes are mainly UI demonstrations and are not connected to a live railway API.
- Firebase manages authentication state, which is exposed through `AuthContext`.
- Booking documents can include the user ID, train details, passengers, contact information, payment summary, status, and a server timestamp.
- Configure Firestore security rules before deployment. Front-end validation alone does not protect booking data.

## Production Deployment

Run `npm run build` and deploy the generated `dist/` directory to a static host such as Firebase Hosting, Netlify, or Vercel. Add the same `VITE_FIREBASE_*` environment variables to the hosting provider, authorize the deployed domain in Firebase Authentication, and configure the host to serve `index.html` for client-side routes.

## Possible Future Improvements

- Connect the search form and filters to real filtering logic or a railway API
- Add live availability, PNR, and payment integrations
- Protect the booking flow so only authenticated users can book
- Load saved bookings from Firestore and add a booking-history page
- Persist confirmation details so they survive a refresh
- Add automated component and end-to-end tests

## License

No license file is currently included. Add a license before distributing or reusing the project publicly.
