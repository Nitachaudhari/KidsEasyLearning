// src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Image,
  VStack,
  Text,
} from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/home");
    } catch (error) {
      alert("Invalid credentials!");
      console.error(error);
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      // bgGradient="linear(to-br, #FFDEE9, #B5FFFC)"
      px={4}
    >
      <Box
        bg="white"
        p={8}
        borderRadius="2xl"
        boxShadow="xl"
        w="full"
        maxW="400px"
        textAlign="center"
      >
        {/* <Image
          src="/login-kid.png"
          alt="Login Image"
          mb={4}
          mx="auto"
          boxSize="100px"
        /> */}

        <Heading fontSize="2xl" color="pink.500" mb={2} fontFamily="'Fredoka One', cursive">
          Welcome Back!
        </Heading>
        <Text mb={6} color="gray.600" fontFamily="Poppins">
          Please login to continue your fun journey ✨
        </Text>

        <VStack spacing={4}>
          <FormControl>
            <FormLabel fontWeight="bold" color="purple.500">Email</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              borderRadius="xl"
              bg="purple.50"
              _focus={{ borderColor: "purple.400", bg: "white" }}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight="bold" color="purple.500">Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              borderRadius="xl"
              bg="purple.50"
              _focus={{ borderColor: "purple.400", bg: "white" }}
            />
          </FormControl>
          <Button
            colorScheme="pink"
            w="full"
            borderRadius="xl"
            fontWeight="bold"
            onClick={handleLogin}
            _hover={{ bg: "pink.400" }}
          >
            Login
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
