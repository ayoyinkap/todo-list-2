Cross-Platform Task Manager
A sleek, high-performance Todo application built with React Native and Expo. This project demonstrates mobile-first design, local data persistence, and efficient state management.

Features
* Persistent Storage: Uses `AsyncStorage` so your tasks are saved even after closing the app.
* Platform Specific UI: Optimized layouts for both iOS and Android using Flexbox.
* Interactive UX: Smooth task completion toggles and "swipe-to-delete" functionality.
* Clean Architecture: Component-based structure for easy scalability.

 Tech Stack
* Framework: [React Native](https://reactnative.dev/)
* Workflow: [Expo](https://expo.dev/)
* Language: [TypeScript]
* Storage: [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)
* Styling: [NativeWind / StyleSheet API]


 Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```
4. Open the **Expo Go** app on your phone and scan the QR code.

 Lessons Learned
While building this, I tackled the challenge of **asynchronous data handling**. Ensuring that the UI updated immediately while the data was being saved to the device's storage taught me a lot about the React lifecycle and effective use of the `useEffect` hook.

