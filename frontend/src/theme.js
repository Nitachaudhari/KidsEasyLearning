import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#FF6F61", // A bright, playful red-orange
    secondary: "#FFD166", // A warm yellow
    backgroundGradient: "linear-gradient(135deg, rgb(243, 166, 232), rgb(192, 230, 255))",
    text: "#333333", // Dark text for contrast
  },
  fonts: {
    heading: "'Fredoka One', cursive",
    body: "'Poppins', sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "backgroundGradient",
        color: "text",
        backgroundImage: "url('/storiesbackground.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      },
    },
  },
});

export default theme;
