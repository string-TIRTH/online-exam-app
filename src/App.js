import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./pages/AppRoutes";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ChakraProvider>
  );
};

export default App;
