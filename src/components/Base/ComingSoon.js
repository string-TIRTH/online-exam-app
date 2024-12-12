import React from "react";
import {Heading} from "@chakra-ui/react";
import Navbar from "../Dashboard/BaseNavbar";

const ComingSoon = () => {
  return (
    <>
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f3f4f6",
      }}>
      <Heading as="h1" size="2xl" color="black">
          Coming Soon...!
      </Heading>
  </div>
  </>
);
};

export default ComingSoon;
