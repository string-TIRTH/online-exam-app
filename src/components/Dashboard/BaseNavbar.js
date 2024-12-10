import React, { useState, useEffect } from "react";
import { Box, Flex, Link, Button, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if(sessionStorage.getItem("token") != null){
      setIsLoggedIn(true); 
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/"); 
  };

  return (
    <Flex bg="blue.500" color="white" p={4} alignItems="center">
      <Box fontWeight="bold">Online Exam App</Box>
      <Spacer />
      <Box>
        {isLoggedIn && <Link mx={2} href="/dashboard">
          Dashboard
          </Link>
        }
        {isLoggedIn && <Link mx={2} href="/coming-soon">
            Profile
          </Link>
        }
        {isLoggedIn ? (
          <Button ml={4} colorScheme="whiteAlpha" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button ml={4} colorScheme="whiteAlpha" size="sm" onClick={() => navigate("/")}>
            Login
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
