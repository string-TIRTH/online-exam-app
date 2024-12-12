import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Alert, AlertIcon } from "@chakra-ui/react";
import axios from "axios";
import {login} from "../../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 
  const navigate = useNavigate(); 

 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await login(email,password);

      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("role", response.data.role);
      console.log("Login successful:", response.data);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box bg="gray.100" minH="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box bg="white" p={6} rounded="md" shadow="md" maxW="400px" w="100%">
        <Heading mb={4} textAlign="center">Login</Heading>

        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button colorScheme="blue" size="lg" w="100%" type="submit" isLoading={isLoading}>
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
