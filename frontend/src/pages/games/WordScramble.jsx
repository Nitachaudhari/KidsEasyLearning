import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Heading,
  useColorModeValue,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FaPuzzlePiece } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const words = ["apple", "banana", "cherry", "grape", "orange"];

const shuffleWord = (word) =>
  word.split("").sort(() => Math.random() - 0.5).join("");

const WordScramble = () => {
  const [word, setWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [scrambled, setScrambled] = useState(shuffleWord(word));
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const checkGuess = () => {
    if (guess.toLowerCase() === word) {
      setMessage("🎉 Correct! Well done!");
    } else {
      setMessage("❌ Try again!");
    }
  };

  const newWord = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    setWord(newWord);
    setScrambled(shuffleWord(newWord));
    setGuess("");
    setMessage("");
  };

  const bgColor = useColorModeValue("orange.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Box
      // bgImage="url('/wordScrambleBg.png')"
      bgSize="cover"
      bgPosition="center"
      minH="100vh"
      py={10}
      px={4}
    >
      <Box
        maxW="400px"
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
          <Icon as={FaPuzzlePiece} boxSize={8} color="orange.400" mr={2} />
          <Heading
            fontSize="2xl"
            color="orange.500"
            fontFamily="'Comic Sans MS', cursive"
          >
            Word Scramble Game
          </Heading>
        </Flex>

        <Text fontSize="lg" fontWeight="bold" color="gray.600" mb={2}>
          Unscramble this word:
        </Text>

        <Text
          fontSize="3xl"
          fontWeight="extrabold"
          color="teal.500"
          fontFamily="'Comic Sans MS', cursive"
          mb={4}
        >
          {scrambled}
        </Text>

        <Input
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Your guess..."
          size="lg"
          textAlign="center"
          borderRadius="xl"
          bg="gray.100"
          mb={3}
        />

        <VStack spacing={3}>
          <Button
            colorScheme="teal"
            size="md"
            width="100%"
            borderRadius="full"
            fontWeight="bold"
            onClick={checkGuess}
          >
            Check Answer
          </Button>

          {message && (
            <Text fontSize="md" fontWeight="semibold" color="purple.500">
              {message}
            </Text>
          )}

          <Button
            colorScheme="orange"
            size="sm"
            width="100%"
            borderRadius="full"
            variant="outline"
            onClick={newWord}
          >
            🔄 New Word
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default WordScramble;
