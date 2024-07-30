import { StyleSheet, Text, View } from 'react-native';
import React, { createContext, FC, PropsWithChildren, useState } from 'react';
import AppwriteService from './service';

// Define the context type
type AppContextType = {
  appwrite: AppwriteService;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

// Create the context with a default value
export const AppwriteContext = createContext<AppContextType>({
  appwrite: new AppwriteService(),
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

// Define the provider component
export const AppwriteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const defaultValue = {
    appwrite: new AppwriteService(),
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider>
  );
};

// Define styles (update as needed)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default AppwriteProvider;
