import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const GuessNumberGame = () => {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast();
  const navigate = useNavigate();


  function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  const handleGuess = () => {
    const num = parseInt(guess, 10);
    if (isNaN(num)) {
      setMessage("🚫 Please enter a valid number!");
      return;
    }

    if (num === targetNumber) {
      setMessage("🎉 Correct! You guessed the number!");
      toast({
        title: "Congratulations!",
        description: "You guessed it right! 🎉",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else if (num < targetNumber) {
      setMessage("⬆️ Too low! Try again.");
    } else {
      setMessage("⬇️ Too high! Try again.");
    }
  };

  const restartGame = () => {
    setTargetNumber(generateRandomNumber());
    setGuess("");
    setMessage("");
  };

  return (
    <Box
      // bgGradient="linear(to-b, #fef9d7, #d299c2)"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box
        bg="white"
        p={8}
        borderRadius="2xl"
        boxShadow="lg"
        width="100%"
        maxW="400px"
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
        <Heading mb={6} color="purple.600" fontSize="3xl" fontFamily="Comic Sans MS">
          🎯 Guess the Number
        </Heading>
        <Text mb={4} fontSize="lg" color="gray.600">
          I'm thinking of a number between 1 and 10. Can you guess it?
        </Text>

        <VStack spacing={4}>
          <Input
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Type your number here"
            size="lg"
            bg="yellow.100"
            borderColor="purple.300"
            _placeholder={{ color: "gray.500" }}
            fontSize="xl"
            textAlign="center"
            borderRadius="full"
          />

          <Button
            colorScheme="purple"
            onClick={handleGuess}
            width="100%"
            size="lg"
            borderRadius="full"
            fontSize="xl"
          >
            🎮 Check
          </Button>

          {message && (
            <Text fontSize="xl" color="teal.600" fontWeight="bold">
              {message}
            </Text>
          )}

          <Button
            colorScheme="pink"
            onClick={restartGame}
            variant="outline"
            borderRadius="full"
            size="sm"
          >
            🔄 Restart Game
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default GuessNumberGame;
