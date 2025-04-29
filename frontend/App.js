import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
      
  );
}
// This is the main entry point of the application. It imports the AppNavigator and renders it.
