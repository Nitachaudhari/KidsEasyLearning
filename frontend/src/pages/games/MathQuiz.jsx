import React, { useState } from "react";
import { Box, Button, Text, Input, VStack, ScaleFade } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const generateRandomNumber = () => Math.floor(Math.random() * 10);

const MathQuiz = () => {
  const [num1, setNum1] = useState(generateRandomNumber());
  const [num2, setNum2] = useState(generateRandomNumber());
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const checkAnswer = () => {
    if (parseInt(answer) === num1 + num2) {
      setMessage("🎉 Correct! Great Job!");
    } else {
      setMessage("❌ Oops! Try Again!");
    }
    setShowMessage(true);
  };

  const newQuestion = () => {
    setNum1(generateRandomNumber());
    setNum2(generateRandomNumber());
    setAnswer("");
    setMessage("");
    setShowMessage(false);
  };

  return (
    <Box
      maxW="sm"
      mx="auto"
      mt={10}
      mb={60}
      p={6}
      borderRadius="2xl"
      boxShadow="lg"
      // bg="purple.100"
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

      <Text fontSize="3xl" fontWeight="bold" color="purple.700" mb={4}>
        🧮 Fun Math Quiz
      </Text>

      <Text fontSize="2xl" mb={3} color="purple.800">
        What is {num1} + {num2}?
      </Text>

      <VStack spacing={4}>
        <Input
          placeholder="Your Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          textAlign="center"
          fontSize="xl"
          bg="white"
          borderRadius="full"
          w="150px"
          boxShadow="sm"
        />

        <Button colorScheme="green" size="lg" borderRadius="full" onClick={checkAnswer}>
          ✅ Check Answer
        </Button>

        <Button colorScheme="blue" size="sm" variant="outline" onClick={newQuestion}>
          🔄 New Question
        </Button>

        <ScaleFade initialScale={0.9} in={showMessage}>
          <Text fontSize="xl" color={message.includes("Correct") ? "green.600" : "red.500"}>
            {message}
          </Text>
        </ScaleFade>
      </VStack>
    </Box>
  );
};

export default MathQuiz;
