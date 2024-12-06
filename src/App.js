import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ComingSoon from "./components/ComingSoon";
import theme from "./theme/theme";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ComingSoon />
    </ChakraProvider>
  );
};

export default App;
