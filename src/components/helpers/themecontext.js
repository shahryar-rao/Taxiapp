import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme(); 
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');
  const [email, setemail] = useState(null);

  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleTheme = async () => {
    const newTheme = isDarkMode ? 'light' : 'dark'; // Switch theme
    setIsDarkMode(!isDarkMode); // Update state
    await AsyncStorage.setItem('theme', newTheme);
  };
  const login = (email) => {
    setemail(email); 
  };

  const logout = () => {
    setemail(null);
  };

  const theme = {
    colors: {
      background: isDarkMode ? '#191a1f' : '#fff',
      text: isDarkMode ? '#fff' : '#000',
      googlebutton: isDarkMode ? '#1F222B' : '#fff',
      bordercolor: isDarkMode ? '#1F222B' : '#FBFBFB',
      inputcolor: isDarkMode ? '#1F222B' : '#FFFAED',
      line: isDarkMode ? '#1F222B' : '#EEEEEE',
      apple: isDarkMode ? '#fff' : '#000',
      circlecolor: isDarkMode ? '#312E29' : '#FFFAEE',
    },
    isDarkMode,
    toggleTheme,
    email,
    login,
    logout
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
