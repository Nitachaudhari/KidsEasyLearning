import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  Text,
  FormControl,
  FormLabel,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData);
      alert("Registration Successful");
      navigate("/login");
      console.log(res.data);
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      // bgGradient="linear(to-br, #FFE5EC, #D0F4DE)"
      px={4}
    >
      <Box
        bg="white"
        p={8}
        borderRadius="2xl"
        boxShadow="2xl"
        w="full"
        maxW="400px"
        textAlign="center"
      >
        {/* <Image
          src="/register-kid.png"
          alt="Register"
          mb={4}
          mx="auto"
          boxSize="100px"
        /> */}

        <Heading fontSize="2xl" color="teal.500" mb={2} fontFamily="'Fredoka One', cursive">
          Let's Get Started!
        </Heading>
        <Text mb={6} color="gray.600" fontFamily="Poppins">
          Create your account and begin your learning adventure 🧠✨
        </Text>

        <VStack spacing={4}>
          <FormControl>
            <FormLabel fontWeight="bold" color="teal.500">Name</FormLabel>
            <Input
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              borderRadius="xl"
              bg="teal.50"
              _focus={{ borderColor: "teal.400", bg: "white" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="bold" color="teal.500">Email</FormLabel>
            <Input
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              borderRadius="xl"
              bg="teal.50"
              _focus={{ borderColor: "teal.400", bg: "white" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="bold" color="teal.500">Password</FormLabel>
            <Input
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              borderRadius="xl"
              bg="teal.50"
              _focus={{ borderColor: "teal.400", bg: "white" }}
            />
          </FormControl>

          <Button
            colorScheme="teal"
            w="full"
            borderRadius="xl"
            fontWeight="bold"
            onClick={handleRegister}
            _hover={{ bg: "teal.400" }}
          >
            Register
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Register;
