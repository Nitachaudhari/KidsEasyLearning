import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  Radio,
  RadioGroup,
  Stack,
  HStack,
  Container,
  Heading,
  Flex,
  Progress,
  useColorModeValue,
  Badge
} from "@chakra-ui/react";
const apiUrl = import.meta.env.VITE_API_URL;

// Correct way to import keyframes
import { keyframes } from "@emotion/react";

// Animation keyframes
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Chakra UI color mode values
  const bgColor = useColorModeValue("yellow.50", "blue.900");
  const cardBg = useColorModeValue("white", "blue.800");
  const titleColor = useColorModeValue("purple.500", "purple.300");
  const bounceAnimation = `${bounce} 2s ease-in-out infinite`;

  useEffect(() => {
    fetch(`${apiUrl}/quizzes`)
      .then(res => res.json())
      .then(data => setQuizzes(data))
      .catch(err => {
        console.error(err);
        // Fallback sample data if fetch fails
        setQuizzes([
          {
            question: "Which animal says 'Meow'?",
            options: ["Dog", "Cat", "Cow", "Duck"],
            correctAnswer: "Cat"
          },
          {
            question: "What color is the sky during the day?",
            options: ["Green", "Red", "Blue", "Yellow"],
            correctAnswer: "Blue"
          },
          {
            question: "How many legs does a dog have?",
            options: ["2", "4", "6", "8"],
            correctAnswer: "4"
          }
        ]);
      });
  }, []);

  const handleNext = () => {
    if (selectedAnswer) {
      setAttempted(attempted + 1);
      if (selectedAnswer === quizzes[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }

    if (currentQuestion < quizzes.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setShowResult(true);
    }
  };

  const handleEndQuiz = () => {
    setShowResult(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setAttempted(0);
    setShowResult(false);
  };

  // Array of fun emoji to use throughout the quiz
  const funEmojis = ["🦄", "🐶", "🦁", "🐢", "🦋", "🌈", "🌟", "🎈"];
  
  // Get a random emoji from the array
  const getRandomEmoji = () => {
    return funEmojis[Math.floor(Math.random() * funEmojis.length)];
  };

  return (
    <Box  
    // bgImage="url('/quizBackground.png')"
    bgSize="cover"
    bgPosition="center"
    bgRepeat="no-repeat"
    minH="100vh"
    position="relative"
    pb={10}>

<Container maxW="container.sm" p={4} >
      <Box 
        borderRadius="xl" 
        p={6} 
        bg="blue.100" 
        boxShadow="lg"
        borderWidth="3px"
        borderColor="purple.200"
        borderStyle="dashed"
        position="relative"
        overflow="hidden"
      >
        {/* Decorative elements */}
        <Box position="absolute" top="10px" left="10px" fontSize="2xl">
          {getRandomEmoji()}
        </Box>
        <Box position="absolute" top="10px" right="10px" fontSize="2xl">
          {getRandomEmoji()}
        </Box>
        
        <Heading 
          as="h1" 
          size="xl" 
          textAlign="center" 
          color={titleColor} 
          mb={6}
          animation={bounceAnimation}
        >
          🎈 Kids Quiz Fun! 🎈
        </Heading>

        {showResult ? (
          <Box 
            bg={cardBg} 
            p={6} 
            borderRadius="xl" 
            boxShadow="md"
            borderWidth="2px"
            borderColor="green.200"
          >
            <VStack spacing={6} align="center">
              <Text 
                fontSize="2xl" 
                fontWeight="bold" 
                color="green.500"
                animation={bounceAnimation}
              >
                🎉 Hooray! You Did It! 🎉
              </Text>
              
              <Flex 
                direction="column" 
                align="center" 
                justify="center"
                bg="green.100"
                p={4}
                borderRadius="lg"
                w="full"
              >
                <Text fontSize="lg" color="purple.600" fontWeight="bold">
                  Your Score: {score} out of {quizzes.length}
                </Text>
                
                {score === quizzes.length ? (
                  <Text mt={2} fontSize="xl" color="green.600">
                    🌟 Perfect Score! Amazing! 🌟
                  </Text>
                ) : score >= quizzes.length / 2 ? (
                  <Text mt={2} fontSize="xl" color="green.600">
                    🎊 Great Job! 🎊
                  </Text>
                ) : (
                  <Text mt={2} fontSize="xl" color="blue.600">
                    🌈 Good Try! Keep Learning! 🌈
                  </Text>
                )}
              </Flex>

              <VStack spacing={2} w="full" align="flex-start">
                <HStack w="full" justify="space-between">
                  <Text fontSize="lg" color="blue.600">📌 Questions Tried:</Text>
                  <Text fontSize="lg" fontWeight="bold">{attempted} / {quizzes.length}</Text>
                </HStack>
                
                <HStack w="full" justify="space-between">
                  <Text fontSize="lg" color="green.600">✅ Correct Answers:</Text>
                  <Text fontSize="lg" fontWeight="bold" color="green.600">{score}</Text>
                </HStack>
                
                <HStack w="full" justify="space-between">
                  <Text fontSize="lg" color="red.600">❌ Oopsies:</Text>
                  <Text fontSize="lg" fontWeight="bold" color="red.600">{attempted - score}</Text>
                </HStack>
              </VStack>
              
              <Button 
                colorScheme="purple" 
                size="lg" 
                onClick={restartQuiz}
                borderRadius="full"
                px={8}
                fontSize="lg"
              >
                Play Again! 🎮
              </Button>
            </VStack>
          </Box>
        ) : quizzes.length > 0 ? (
          <VStack spacing={6}>
            {/* Progress bar with friendly text */}
            <Box w="full">
              <Flex justify="space-between" mb={1}>
                <Text fontSize="sm" fontWeight="medium" color="purple.600">
                  Question {currentQuestion + 1} of {quizzes.length}
                </Text>
                <Badge colorScheme="purple" px={2} borderRadius="full">
                  Score: {score}
                </Badge>
              </Flex>
              <Progress 
                value={(currentQuestion / quizzes.length) * 100} 
                size="md" 
                colorScheme="purple" 
                borderRadius="full"
                hasStripe
                isAnimated
              />
            </Box>
            
            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              boxShadow="md"
              w="full"
              borderWidth="2px"
              borderColor="blue.200"
            >
              <VStack spacing={6}>
                <Flex align="center">
                  <Text fontSize="xl" fontWeight="bold" color="blue.600">
                    {getRandomEmoji()} {quizzes[currentQuestion].question}
                  </Text>
                </Flex>
                
                <RadioGroup 
                  onChange={setSelectedAnswer} 
                  value={selectedAnswer}
                  w="full"
                >
                  <Stack direction="column" spacing={4} w="full">
                    {quizzes[currentQuestion].options.map((option, index) => (
                      <Box
                        key={index}
                        borderWidth="2px"
                        borderRadius="xl"
                        p={4}
                        cursor="pointer"
                        onClick={() => setSelectedAnswer(option)}
                        bg={selectedAnswer === option ? "purple.100" : "transparent"}
                        borderColor={selectedAnswer === option ? "purple.300" : "gray.200"}
                        _hover={{ 
                          bg: selectedAnswer === option ? "purple.100" : "blue.50",
                          transform: "scale(1.02)",
                          transition: "all 0.2s ease"
                        }}
                        transition="all 0.2s ease"
                      >
                        <Radio 
                          value={option} 
                          colorScheme="purple" 
                          size="lg"
                        >
                          <Text fontSize="lg">{option}</Text>
                        </Radio>
                      </Box>
                    ))}
                  </Stack>
                </RadioGroup>

                <HStack spacing={4}>
                  <Button 
                    colorScheme="red" 
                    onClick={handleEndQuiz}
                    borderRadius="full"
                    variant="outline"
                  >
                    End Quiz
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={handleNext}
                    isDisabled={!selectedAnswer}
                    borderRadius="full"
                    size="lg"
                    _disabled={{
                      opacity: 0.6,
                      cursor: "not-allowed"
                    }}
                  >
                    {currentQuestion === quizzes.length - 1 ? "Finish! 🎯" : "Next Question! 👉"}
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        ) : (
          <VStack spacing={4} p={6} bg={cardBg} borderRadius="xl">
            <Text fontSize="xl" color="blue.600">Loading fun questions...</Text>
            <Text fontSize="3xl">{getRandomEmoji()}</Text>
          </VStack>
        )}
        
        {/* More decorative elements */}
        <Box position="absolute" bottom="10px" left="10px" fontSize="2xl">
          {getRandomEmoji()}
        </Box>
        <Box position="absolute" bottom="10px" right="10px" fontSize="2xl">
          {getRandomEmoji()}
        </Box>
      </Box>
    </Container>
    </Box>
    
  );
};

export default Quizzes;