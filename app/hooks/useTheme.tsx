import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ColorScheme {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  shadow: string;
  gradients: {
    bg: [string, string];
    surface: [string, string];
    primary: [string, string];
    success: [string, string];
    warning: [string, string];
    danger: [string, string];
    muted: [string, string];
    empty: [string, string];
  };
  backgrounds: {
    input: string;
    editInput: string;
  };
  statusBarStyle: "light-content" | "dark-content";
}

const lightTheme: ColorScheme = {
  bg: "#ffffff",
  surface: "#f2f2f2",
  text: "#1a1a1a",
  textMuted: "#666666",
  border: "#e0e0e0",
  primary: "#007bff",
  success: "#28a745",
  warning: "#ffc107",
  danger: "#dc3545",
  shadow: "rgba(0, 0, 0, 0.1)",
  gradients: {
    bg: ["#ffffff", "#f8f9fa"],
    surface: ["#f2f2f2", "#e9ecef"],
    primary: ["#007bff", "#0056b3"],
    success: ["#28a745", "#1e7e34"],
    warning: ["#ffc107", "#e0a800"],
    danger: ["#dc3545", "#bd2130"],
    muted: ["#6c757d", "#5a6268"],
    empty: ["#f8f9fa", "#e9ecef"],
  },
  backgrounds: {
    input: "#ffffff",
    editInput: "#f2f2f2",
  },
  statusBarStyle: "dark-content",
};

const darkTheme: ColorScheme = {
  bg: "#121212",
  surface: "#1e1e1e",
  text: "#ffffff",
  textMuted: "#aaaaaa",
  border: "#333333",
  primary: "#0d6efd",
  success: "#198754",
  warning: "#ffc107",
  danger: "#dc3545",
  shadow: "rgba(0, 0, 0, 0.7)",
  gradients: {
    bg: ["#121212", "#1c1c1c"],
    surface: ["#1e1e1e", "#2c2c2c"],
    primary: ["#0d6efd", "#084298"],
    success: ["#198754", "#146c43"],
    warning: ["#ffc107", "#e0a800"],
    danger: ["#dc3545", "#bd2130"],
    muted: ["#6c757d", "#5a6268"],
    empty: ["#1c1c1c", "#2c2c2c"],
  },
  backgrounds: {
    input: "#1e1e1e",
    editInput: "#2c2c2c",
  },
  statusBarStyle: "light-content",
};

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: ColorScheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("darkMode").then((value) => {
      if (value) setIsDarkMode(JSON.parse(value));
    })
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
  }

  const colors = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors}}>
      {children}
    </ThemeContext.Provider>
  )
};

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if(!context) {
    throw new Error("useTheme must be used within a Theme Provider");
  }
  return context;
};

export default useTheme;
