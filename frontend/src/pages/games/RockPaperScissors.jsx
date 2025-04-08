import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  useToast,
  ScaleFade,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const choices = [
  { name: "Rock", emoji: "🪨" },
  { name: "Paper", emoji: "📄" },
  { name: "Scissors", emoji: "✂️" },
];

const RockPaperScissors = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const playGame = (choice) => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setComputerChoice(randomChoice);
    determineWinner(choice.name, randomChoice.name);
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      setResult("🤝 It's a Draw!");
    } else if (
      (user === "Rock" && computer === "Scissors") ||
      (user === "Paper" && computer === "Rock") ||
      (user === "Scissors" && computer === "Paper")
    ) {
      setResult("🎉 You Win!");
      toast({
        title: "Victory!",
        description: "You beat the computer!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      setResult("😢 You Lose!");
      toast({
        title: "Oops!",
        description: "Try again, champ!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const restartGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult("");
  };

  return (
    <Box
      // bgGradient="linear(to-b, #fef3c7, #d8b4fe)"
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
        boxShadow="2xl"
        maxW="500px"
        width="100%"
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
        <Heading mb={4} color="purple.600" fontFamily="Comic Sans MS">
          🎮 Rock, Paper, Scissors
        </Heading>
        <Text fontSize="lg" mb={6} color="gray.700">
          Pick your move and challenge the computer!
        </Text>

        <HStack spacing={4} justify="center" wrap="wrap" mb={6}>
          {choices.map((choice) => (
            <Button
              key={choice.name}
              onClick={() => playGame(choice)}
              size="lg"
              colorScheme="pink"
              variant="solid"
              borderRadius="full"
              fontSize="2xl"
              px={6}
            >
              {choice.emoji} {choice.name}
            </Button>
          ))}
        </HStack>

        {userChoice && (
          <Text fontSize="lg" color="blue.600" mb={2}>
            👦 Your Choice: <strong>{userChoice.emoji} {userChoice.name}</strong>
          </Text>
        )}

        {computerChoice && (
          <Text fontSize="lg" color="red.600" mb={4}>
            🧠 Computer's Choice: <strong>{computerChoice.emoji} {computerChoice.name}</strong>
          </Text>
        )}

        <ScaleFade in={!!result}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color={
              result.includes("Win") ? "green.500" :
              result.includes("Lose") ? "red.500" : "gray.700"
            }
            mt={4}
          >
            {result}
          </Text>
        </ScaleFade>

        {result && (
          <Button
            onClick={restartGame}
            mt={6}
            colorScheme="yellow"
            size="md"
            borderRadius="full"
            px={6}
            fontSize="lg"
          >
            🔁 Restart Game
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default RockPaperScissors;
