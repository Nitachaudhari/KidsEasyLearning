// src/pages/Games.jsx
import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Grid,
  useColorModeValue,
  Badge,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaGamepad,
  FaDice,
  FaPuzzlePiece,
} from "react-icons/fa";

const Games = () => {
  const gamesList = [
    {
      name: "Guess the Number",
      path: "/games/guess-number",
      description: "Try to guess a randomly chosen number within a given range.",
      howToPlay: "Enter a number and see if it matches the correct answer.",
      winCondition: "You win when your guess matches the correct number!",
      icon: FaDice,
      color: "purple.400",
    },
    {
      name: "Rock, Paper, Scissors",
      path: "/games/rock-paper-scissors",
      description: "Play Rock, Paper, Scissors against the computer.",
      howToPlay: "Pick Rock, Paper, or Scissors. The computer will choose randomly.",
      winCondition: "Rock beats Scissors, Scissors beat Paper, and Paper beats Rock.",
      icon: FaGamepad,
      color: "blue.400",
    },
    {
      name: "Word Scramble",
      path: "/games/word-scramble",
      description: "Unscramble the letters to form a correct word.",
      howToPlay: "Look at the scrambled word and type your answer.",
      winCondition: "You win when you unscramble the word correctly!",
      icon: FaPuzzlePiece,
      color: "green.400",
    },
    {
      name: "Color Matching",
      path: "/games/color-match",
      description: "Find and click the correct color shown in the task.",
      howToPlay: "Click the button with the color matching the given name.",
      winCondition: "You win when you select the correct color!",
      icon: FaPuzzlePiece,
      color: "pink.400",
    },
    {
      name: "Tic-Tac-Toe",
      path: "/games/tic-tac-toe",
      description: "Play Tic-Tac-Toe with a friend or against the computer.",
      howToPlay: "Take turns placing X or O on a 3x3 grid.",
      winCondition: "Get 3 of your marks in a row, column, or diagonal to win!",
      icon: FaGamepad,
      color: "red.400",
    },
    {
      name: "Memory Match",
      path: "/games/memory-match",
      description: "Flip the cards and match the pairs as fast as possible.",
      howToPlay: "Click on two cards to reveal them. Find all pairs.",
      winCondition: "You win when you match all pairs within the time limit!",
      icon: FaPuzzlePiece,
      color: "orange.400",
    },
    {
      name: "Hangman",
      path: "/games/hangman",
      description: "Guess the hidden word before you run out of attempts.",
      howToPlay: "Enter a letter to check if it's in the word.",
      winCondition: "You win when you guess the word before the hangman is complete!",
      icon: FaPuzzlePiece,
      color: "cyan.400",
    },
    {
      name: "Math Quiz",
      path: "/games/math-quiz",
      description: "Test your math skills by solving fun and challenging problems.",
      howToPlay: "Answer the math questions correctly within the given time.",
      winCondition: "You win when you answer all questions correctly before time runs out!",
      icon: FaDice,
      color: "yellow.500",
    },
    {
      name: "Maze Runner",
      path: "/games/maze-runner",
      description: "Navigate the maze and reach the goal without hitting walls.",
      howToPlay: "Use arrow keys to move through the maze.",
      winCondition: "You win when you reach the exit without touching the walls!",
      icon: FaGamepad,
      color: "teal.400",
    },
    {
      name: "Shape Finder",
      path: "/games/shape-finder",
      description: "Identify and match the correct shapes as fast as you can.",
      howToPlay: "Look at the shape shown and select the correct match.",
      winCondition: "You win when you select the correct shape multiple times in a row!",
      icon: FaPuzzlePiece,
      color: "blue.400",
    },
    {
      name: "Drawing Shapes",
      path: "/games/drawing-shapes",
      description: "Draw different shapes by connecting dots in the correct order.",
      howToPlay: "Follow the instructions to connect the dots and form shapes.",
      winCondition: "You win when you complete all shapes correctly!",
      icon: FaGamepad,
      color: "purple.400",
    },
  ];

  const bgColor = useColorModeValue("blue.50", "blue.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const titleColor = useColorModeValue("blue.600", "blue.300");

  return (
    <Box  
    // bgImage="url('/gamesBackground1.png')"
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          minH="100vh"
          position="relative"
          pb={10} py={8} px={4}>
      <Box maxW="1200px" mx="auto" textAlign="center">
        <Flex alignItems="center" justifyContent="center" mb={8}>
          <Icon as={FaStar} color="yellow.400" boxSize={8} mr={3} />
          <Heading
            color="purple.600"
            fontSize={["2xl", "3xl", "4xl"]}
            fontFamily="'Comic Sans MS', cursive"
          >
            Fun Games to Play!
          </Heading>
          <Icon as={FaStar} color="yellow.400" boxSize={8} ml={3} />
        </Flex>

        <Text fontSize="lg" mb={10} color="gray.200">
          Choose one of our exciting games and start having fun!
        </Text>

        <Grid
          templateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
          gap={6}
        >
          {gamesList.map((game, index) => (
            <Box
              key={index}
              bg={cardBg}
              p={5}
              borderRadius="2xl"
              boxShadow="lg"
              border="4px solid skyblue" 
              transition="all 0.3s"
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: "xl",
                borderColor: game.color,
                borderWidth: "4px",
              }}
              position="relative"
              h="100%"
            
            >
              <Flex alignItems="center" mb={3}>
                <Icon as={game.icon} color={game.color} boxSize={6} mr={2} />
                <Heading
                  size="md"
                  color={game.color}
                  fontFamily="'Comic Sans MS', cursive"
                >
                  {game.name}
                </Heading>
              </Flex>

              <Text fontSize="sm" mb={3}>
                {game.description}
              </Text>

              <Box
                bg="gray.50"
                p={3}
                borderRadius="md"
                mb={3}
                borderLeft={`4px solid ${game.color}`}
              >
                <Text fontSize="xs" fontWeight="bold" mb={1} color="gray.500">
                  HOW TO PLAY
                </Text>
                <Text fontSize="sm">{game.howToPlay}</Text>
              </Box>

              <Box mb={4}>
                <Badge colorScheme="green" px={2} py={1} borderRadius="full">
                  Win Condition
                </Badge>
                <Text fontSize="sm" mt={1}>
                  {game.winCondition}
                </Text>
              </Box>

              <Link to={game.path}>
                <Button
                  w="full"
                  colorScheme="blue"
                  bgColor={game.color}
                  size="md"
                  fontWeight="bold"
                  borderRadius="full"
                  boxShadow="md"
                  _hover={{
                    transform: "scale(1.05)",
                    boxShadow: "lg",
                  }}
                >
                  Play Now!
                </Button>
              </Link>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Games;
