import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Text,
  useColorModeValue,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { GiCardRandom } from "react-icons/gi";
import { useNavigate } from "react-router-dom";


// 12 pairs (24 cards) + 1 dummy card to make 25
const emojis = [
  "🐶", "🐱", "🐰", "🦊", "🐼", "🐸",
  "🐵", "🐯", "🐮", "🦁", "🐷", "🐧",
];
const emojiPairs = [...emojis, ...emojis]; // 24 cards
const dummyCard = "🎲"; // Doesn't match with any
const fullDeck = [...emojiPairs, dummyCard].sort(() => Math.random() - 0.5);

const MemoryGame = () => {
  const [cards, setCards] = useState(fullDeck);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const navigate = useNavigate();

  const handleFlip = (index) => {
    if (flipped.includes(index) || matched.includes(index)) return;
    if (flipped.length === 2) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const resetGame = () => {
    const shuffled = [...emojiPairs, dummyCard].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
  };

  const cardBg = useColorModeValue("pink.200", "gray.700");
  const matchedBg = useColorModeValue("green.200", "green.500");

  return (
    <Box
      minH="100vh"
      py={10}
      px={4}
      // bgGradient="linear(to-b, yellow.100, pink.100)"
    >
      <Box
        maxW="700px"
        mx="auto"
        bg="whiteAlpha.900"
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
          <Icon as={GiCardRandom} boxSize={8} color="blue.400" mr={2} />
          <Text
            fontSize="2xl"
            fontWeight="bold"
            fontFamily="'Comic Sans MS', cursive"
            color="purple.600"
          >
            Memory Match Game – 5x5
          </Text>
        </Flex>

        <Grid
          templateColumns="repeat(5, 1fr)"
          gap={4}
          justifyContent="center"
          alignItems="center"
          mb={6}
        >
          {cards.map((emoji, index) => {
            const isFlipped = flipped.includes(index) || matched.includes(index);
            return (
              <GridItem
                key={index}
                w="70px"
                h="70px"
                bg={matched.includes(index) ? matchedBg : cardBg}
                borderRadius="xl"
                fontSize="2xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="md"
                cursor="pointer"
                transition="all 0.3s"
                _hover={{
                  transform: "scale(1.05)",
                  boxShadow: "lg",
                }}
                onClick={() => handleFlip(index)}
              >
                {isFlipped ? emoji : "❓"}
              </GridItem>
            );
          })}
        </Grid>

        <Button
          onClick={resetGame}
          colorScheme="purple"
          variant="outline"
          borderRadius="full"
        >
          🔄 Restart Game
        </Button>
      </Box>
    </Box>
  );
};

export default MemoryGame;
