# 🐱 Cats App

A React Native mobile application built with The Cat API that allows users to upload cat images, browse uploaded cats, favourite/unfavourite cats, and vote on them.

The app allows users to:

- Upload cat images
- Browse cat images
- Favourite / unfavourite cats
- Vote cats up or down
- View live vote scores

-----------------------------------------------------------------------------------------------------------------------------------------

# ✨ Feature
 
## 📤 Upload Cats
- Pick images from device gallery
- Upload images using TheCatAPI
- Validation for empty selections
- Success & error toast messages
- Loading indicators during upload

## 🖼️ Browse Cats
- Responsive grid layout
- Modern card-based UI
- Optimized image rendering
- Pull-to-refresh support

## ❤️ Favourite / Unfavourite
- Add cats to favourites
- Remove favourites
- Dynamic heart icon updates

## 👍👎 Voting System
- Upvote cats
- Downvote cats
- Real-time score updates
- Optimistic UI updates

## 🎨 UI/UX
- Clean modern interface
- Responsive design
- Empty state screens
- Accessible touch targets
- Smooth navigation

-----------------------------------------------------------------------------------------------------------------------------------------

# 🛠️ Tech Stack

- React Native
- TypeScript
- Redux Toolkit Query (RTK Query)
- React Navigation
- React Native Image Picker
- FontAwesome Icons
- React Native Toast Message
- TheCatAPI

-----------------------------------------------------------------------------------------------------------------------------------------

# 🔑 API Setup

This project uses The CatAPI.

Environment variables

Create a .env file in the root:

CATS_API_KEY=your_api_key_here

Usage

API key is injected into RTK Query configuration and used in headers/requests.

Note: API keys are kept outside service files to maintain separation of concerns.

-----------------------------------------------------------------------------------------------------------------------------------------

# 📦 Installation

▶️ How to Run the App:

1. Install dependencies

npm install

2. iOS setup

cd ios && pod install && cd ..

3. Run app

Android:
npm run android

iOS:
npm run ios

-----------------------------------------------------------------------------------------------------------------------------------------

## 🧪 Testing

This project uses:

@testing-library/react-native

To Run tests: npm test
To Run Each Individual File: npm test Filename.test.tsx
To check coverage: npx jest --coverage

♿ Accessibility

Accessibility support includes:

accessibility labels
accessibility roles
test IDs for testing

-----------------------------------------------------------------------------------------------------------------------------------------

## 🧠 State Management

The project uses Redux Toolkit Query (RTK Query) for:

API calls
Caching
Automatic refetching
Optimistic updates
Loading/error states

-----------------------------------------------------------------------------------------------------------------------------------------

## 📁 Project Structure

src/
│
├── components/
│   ├── CatCard.tsx
│   ├── EmptyState.tsx
│   └── ImagePicker.tsx
│
├── screens/
│   ├── HomeScreen.tsx
│   ├── UploadScreen.tsx
│   └── FavouritesScreen.tsx
│
├── navigation/
│   └── AppNavigator.tsx
│
├── services/
│   └── catApi.ts
│
├── constants/
│   └── strings.ts
│
├── utils/
│   └── toastConfig.ts
│
├── tests/
│   ├── components/
│   │   ├── CatCard.test.tsx
│   │   ├── EmptyState.test.tsx
│   │   └── ImagePicker.test.tsx
│   │
│   └── screens/
│       ├── HomeScreen.test.tsx
│       ├── UploadScreen.test.tsx
│       └── FavouritesScreen.test.tsx
│
├── types/
│   ├── catTypes.ts
│   └── env.d.ts

-----------------------------------------------------------------------------------------------------------------------------------------

## Trade-offs

- Used RTK Query for simpler API management and caching.
- Used optimistic UI updates for faster voting experience.
- Implemented custom responsive grid layout without external UI libraries.
- Used gallery image upload only to keep implementation simple.

-----------------------------------------------------------------------------------------------------------------------------------------

## Known Limitations

- No authentication or user accounts.
- No pagination or infinite scrolling.
- Limited offline support.
- No unit or integration tests yet.
- App is optimized mainly for mobile devices.

-----------------------------------------------------------------------------------------------------------------------------------------

## 📸 Screenshots:

![Alt text](<Simulator Screenshot - iPhone 17 Pro - 2026-05-11 at 06.39.08.png>)
![Alt text](<Simulator Screenshot - iPhone 17 Pro - 2026-05-11 at 06.39.37.png>)
![Alt text](<Simulator Screenshot - iPhone 17 Pro - 2026-05-11 at 06.39.41.png>)
![Alt text](<Simulator Screenshot - iPhone 17 Pro - 2026-05-11 at 06.39.46.png>)
![Alt text](<Simulator Screenshot - iPhone 17 Pro - 2026-05-11 at 06.40.02.png>)
![Alt text](<Simulator Screenshot - iPhone 17 Pro - 2026-05-11 at 06.40.09.png>)
![Alt text](<Simulator Screenshot - iPhone 17 Pro - 2026-05-11 at 06.40.23.png>)
![Alt text](<Screenshot 2026-05-11 at 06.41.14.png>)

-----------------------------------------------------------------------------------------------------------------------------------------

## 🚀 Future Improvements

Authentication
Infinite scrolling / pagination
Better image caching
Unit & integration tests
Dark mode
Animations
Offline support

-----------------------------------------------------------------------------------------------------------------------------------------