import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Define the theme configuration
const themeConfig: ThemeConfig = {
  initialColorMode: "light",  // Default color mode
  useSystemColorMode: false, // Disable system color mode
};

// Extend Chakra UI default theme
const theme = extendTheme({
  config: themeConfig,
  // You can also customize other theme aspects like colors, fonts, etc.
});

export default theme;
