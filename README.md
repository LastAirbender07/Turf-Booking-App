# Turf-Booking-App

<p align="center">
  <img  width="400px" src="https://github.com/LastAirbender07/Turf-Booking-App/assets/101379967/3fc3cfc2-3682-47c4-a8ed-0844fc806cc0" alt="Designer (2)" />
</p>

## Overview

Turf-Booking-App is a comprehensive mobile application built using React Native, TailwindCSS, and Firebase. It offers features such as user authentication, profile management, turf booking by location and date, and a chatbot powered by Google Generative AI (Gemini AI).

## Features

- **User Authentication**: Secure login and signup functionality using Firebase Authentication.
- **Profile Management**: Users can view, edit, and update their profile information.
- **Turf Booking**: Users can book turf by selecting the location, date, and other relevant information.
- **Chatbot**: Integrated chatbot using Gemini AI to assist users with their queries.
- **Smooth UI/UX**: Built with React Native and TailwindCSS for a seamless user experience.

## Screenshots
<table style="margin: auto;">
  <tr>
    <td align="center"><img src="https://github.com/LastAirbender07/Turf-Booking-App/assets/101379967/dcfa9d3e-06c9-47e7-b076-216b0726c822" alt="Screenshot_20240507_121000 (1)" width="400px" /></td>
    <td width="100px"></td>
    <td align="center"><img src="https://github.com/LastAirbender07/Turf-Booking-App/assets/101379967/28ddfba0-3c29-42ea-a19c-3d61057763e8" alt="Screenshot_20240507_120853 (1)" width="400px" /></td>
  </tr>
</table>

## Technologies Used

- **React Native**: For building the cross-platform mobile application.
- **TailwindCSS**: For styling the application.
- **Firebase**: For backend services including Authentication, Firestore Database, and Storage.
- **Google Generative AI (Gemini AI)**: For the chatbot feature.

## Installation

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js and npm installed on your machine.
- Firebase project set up (with Authentication, Firestore Database, and Storage enabled).
- Google Generative AI (Gemini AI) API key.

### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/Turf-Booking-App.git
    cd Turf-Booking-App
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up Firebase**:
    - Create a `.env` file in the root of your project.
    - Add your Firebase and Gemini AI configuration details:
      ```env
      API_KEY=your_gemini_ai_api_key
      FIREBASE_API_KEY=your_firebase_api_key
      FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
      FIREBASE_PROJECT_ID=your_firebase_project_id
      FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
      FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
      FIREBASE_APP_ID=your_firebase_app_id
      ```

4. **Start the application**:
    ```bash
    npm start
    ```
    - For iOS:
      ```bash
      npx react-native run-ios
      ```
    - For Android:
      ```bash
      npx react-native run-android
      ```

## Usage

- **Login/Signup**: Users can create an account or log in using their credentials.
- **Profile**: Users can view and edit their profile information.
- **Book a Turf**: Users can select a location, date, and other necessary details to book a turf.
- **Chatbot**: Users can interact with the chatbot for assistance.

## Firebase Integration

### Authentication

- User authentication is handled using Firebase Authentication.

### Firestore Database

- User profiles and bookings are stored and managed using Firestore.

### Storage

- User profile images are stored in Firebase Storage.

### Retrieving Data from Firebase

```javascript
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from './firebase';

useEffect(() => {
  const getUserInfo = async () => {
    const uid = auth.currentUser.uid;
    const docRef = doc(db, 'users', `${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      // Set user data in state
    }
  };
  getUserInfo();
}, []);
```

## Contribution

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## Contact

For any inquiries or issues, please contact jayarajviswanathan@gmail.com.
