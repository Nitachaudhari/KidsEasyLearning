import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaPalette } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const colors = ["red", "blue", "green", "yellow", "purple"];

const ColorMatch = () => {
  const [targetColor, setTargetColor] = useState(
    colors[Math.floor(Math.random() * colors.length)]
  );
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const checkColor = (color) => {
    if (color === targetColor) {
      setMessage("🎉 Correct Match!");
    } else {
      setMessage("❌ Wrong! Try Again.");
    }
  };

  const newGame = () => {
    setTargetColor(colors[Math.floor(Math.random() * colors.length)]);
    setMessage("");
  };

  const bgColor = useColorModeValue("yellow.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Box
      // bgImage="url('/colorMatchBg.png')"
      bgSize="cover"
      bgPosition="center"
      minH="100vh"
      py={10}
      px={4}
    >
      <Box
        maxW="420px"
        mx="auto"
        bg={cardBg}
        borderRadius="2xl"
        boxShadow="2xl"
        p={8}
        textAlign="center"
      >
       <Button
          onClick={() => navigate("/games")}
          colorScheme="teal"
          variant="outline"
          alignSelf="flex-start"
        >
          ← Back to Games
        </Button>

        <Flex justify="center" align="center" mb={4}>
          <Icon as={FaPalette} boxSize={8} color="pink.400" mr={2} />
          <Heading
            fontSize="2xl"
            color="pink.500"
            fontFamily="'Comic Sans MS', cursive"
          >
            Color Match Game
          </Heading>
        </Flex>

        <Text fontSize="lg" fontWeight="bold" color="gray.600" mb={2}>
          Match this color:
        </Text>

        <Text
          fontSize="2xl"
          fontWeight="extrabold"
          color={targetColor}
          fontFamily="'Comic Sans MS', cursive"
          mb={4}
        >
          {targetColor.toUpperCase()}
        </Text>

        <Flex flexWrap="wrap" justify="center" mb={4}>
          {colors.map((color) => (
            <Button
              key={color}
              bg={color}
              color="white"
              size="lg"
              m={2}
              borderRadius="full"
              _hover={{ transform: "scale(1.1)", boxShadow: "lg" }}
              onClick={() => checkColor(color)}
              fontWeight="bold"
              px={6}
            >
              {color.toUpperCase()}
            </Button>
          ))}
        </Flex>

        {message && (
          <Text fontSize="md" fontWeight="semibold" color="purple.600" mb={3}>
            {message}
          </Text>
        )}

        <Button
          colorScheme="yellow"
          size="md"
          borderRadius="full"
          variant="outline"
          onClick={newGame}
        >
          🔄 New Color
        </Button>
      </Box>
    </Box>
  );
};

export default ColorMatch;
