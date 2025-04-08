import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Input,
  VStack,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// ✅ List of words with hints
const words = [
  { word: "APPLE", hint: "A red or green fruit that's crunchy" },
  { word: "BANANA", hint: "A long yellow fruit monkeys love" },
  { word: "ORANGE", hint: "A juicy citrus fruit and a color" },
  { word: "GRAPES", hint: "Tiny purple or green fruits in bunches" },
  { word: "ZEBRA", hint: "Striped animal like a horse" },
  { word: "LION", hint: "The king of the jungle" },
  { word: "TIGER", hint: "A big striped cat" },
  { word: "ELEPHANT", hint: "Largest land animal with a trunk" },
  { word: "MONKEY", hint: "Animal that swings on trees" },
  { word: "RAINBOW", hint: "Colorful arc seen after rain" },
  { word: "UMBRELLA", hint: "Used to protect from rain" },
  { word: "PENCIL", hint: "Used for writing or drawing" },
  { word: "SCHOOL", hint: "A place to learn and play" },
  { word: "PLANET", hint: "Earth is one of them" },
  { word: "ROCKET", hint: "Used to travel into space" },
  { word: "FISH", hint: "Lives in water and swims" },
  { word: "BREAD", hint: "You can toast it for breakfast" },
  { word: "CHEESE", hint: "Made from milk, used on pizza" },
  { word: "SUNFLOWER", hint: "A tall yellow flower that follows the sun" },
  { word: "BUTTERFLY", hint: "It starts as a caterpillar" }
];

// ✅ Utility to get a random word with hint
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const Hangman = () => {
  const [wordObj, setWordObj] = useState(getRandomWord());
  const [hiddenWord, setHiddenWord] = useState("_ ".repeat(wordObj.word.length));
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(6);
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();

  const cardBg = useColorModeValue("orange.100", "gray.700");

  const checkGuess = () => {
    if (gameOver || !guess.trim()) return;

    let newHidden = "";
    let found = false;

    for (let i = 0; i < wordObj.word.length; i++) {
      if (wordObj.word[i] === guess.toUpperCase()) {
        newHidden += guess.toUpperCase() + " ";
        found = true;
      } else {
        newHidden += hiddenWord[i * 2] + " ";
      }
    }

    if (!found) setAttempts((prev) => prev - 1);
    setHiddenWord(newHidden.trim());
    setGuess("");

    if (newHidden.replace(/ /g, "") === wordObj.word || attempts - (found ? 0 : 1) === 0) {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    const newWordObj = getRandomWord();
    setWordObj(newWordObj);
    setHiddenWord("_ ".repeat(newWordObj.word.length));
    setAttempts(6);
    setGuess("");
    setGameOver(false);
  };

  return (
    <Center minH="100vh" 
    // bg="orange.50"
    >
      <Box
        bg="white"
        p={8}
        borderRadius="2xl"
        boxShadow="2xl"
        textAlign="center"
        w={["90%", "400px"]}
      >
        <Button
          onClick={() => navigate("/games")}
          colorScheme="teal"
          variant="outline"
          alignSelf="flex-start"
        >
          ← Back to Games
        </Button>

        <Text fontSize="3xl" fontWeight="bold" mb={3} color="orange.500">
          🍭 Hangman Game 🍬
        </Text>

        {/* ✅ Hint */}
        <Text fontSize="lg" color="gray.600" mb={2}>
          💡 Hint: <strong>{wordObj.hint}</strong>
        </Text>

        {/* ✅ Hidden Word */}
        <Text fontSize="2xl" fontFamily="mono" letterSpacing={4} mb={3}>
          {hiddenWord}
        </Text>

        <Text fontSize="lg" mb={2}>
          Attempts Left: <b>{attempts}</b>
        </Text>

        {/* ✅ Input + Button */}
        <VStack spacing={3}>
          <Input
            w="60px"
            h="50px"
            fontSize="2xl"
            textAlign="center"
            maxLength={1}
            value={guess}
            onChange={(e) => setGuess(e.target.value.toUpperCase())}
            isDisabled={gameOver}
          />
          <Button colorScheme="orange" size="lg" onClick={checkGuess} isDisabled={gameOver}>
            Guess
          </Button>
        </VStack>

        {/* ✅ Result Messages */}
        {hiddenWord.replace(/ /g, "") === wordObj.word && (
          <Text mt={4} fontSize="xl" color="green.500">🎉 You Won!</Text>
        )}

        {attempts === 0 && (
          <Text mt={4} fontSize="xl" color="red.500">
            ❌ Game Over! The word was <b>{wordObj.word}</b>.
          </Text>
        )}

        {gameOver && (
          <Button mt={5} colorScheme="purple" onClick={restartGame}>
            🔄 Play Again
          </Button>
        )}
      </Box>
    </Center>
  );
};

export default Hangman;
