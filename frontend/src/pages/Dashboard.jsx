// src/pages/Dashboard.jsx
import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";

const Dashboard = () => {
  // Initial user data (this could come from a database in a real app)
  const [user, setUser] = useState({
    name: "John Doe",
    age: "12",
    class: "6th Grade",
    interests: "Playing games, Reading comics, Math puzzles",
    avatar: "https://bit.ly/dan-abramov",
  });

  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => setIsEditing((prev) => !prev);

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "User details saved successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={6} maxW="700px" mx="auto">
      <VStack spacing={5}>
        <Avatar size="2xl" src={user.avatar} name={user.name} />
        <Heading color="blue.500">Welcome, {user.name}!</Heading>
        <Text color="gray.600">View and update your details below</Text>
      </VStack>

      <Box mt={8} borderWidth="1px" borderRadius="lg" p={6} boxShadow="lg">
        <VStack spacing={4}>
          <FormControl isDisabled={!isEditing}>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </FormControl>

          <FormControl isDisabled={!isEditing}>
            <FormLabel>Age</FormLabel>
            <Input
              name="age"
              value={user.age}
              onChange={handleChange}
              placeholder="Enter age"
              type="number"
            />
          </FormControl>

          <FormControl isDisabled={!isEditing}>
            <FormLabel>Class</FormLabel>
            <Input
              name="class"
              value={user.class}
              onChange={handleChange}
              placeholder="Enter class"
            />
          </FormControl>

          <FormControl isDisabled={!isEditing}>
            <FormLabel>Interests</FormLabel>
            <Textarea
              name="interests"
              value={user.interests}
              onChange={handleChange}
              placeholder="What do you love?"
              rows={3}
            />
          </FormControl>

          <Flex gap={4} mt={4}>
            {isEditing ? (
              <Button colorScheme="green" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <Button colorScheme="blue" onClick={handleEditToggle}>
                Edit Profile
              </Button>
            )}
            {isEditing && (
              <Button
                colorScheme="gray"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            )}
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};

export default Dashboard;
