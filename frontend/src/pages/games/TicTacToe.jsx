import React, { useState, useEffect } from "react";
import { 
  Box, 
  Button, 
  Grid, 
  GridItem, 
  Text, 
  Heading,
  Flex,
  Icon,
  useColorModeValue,
  Badge,
  useToast
} from "@chakra-ui/react";
import { FaStar, FaRedo, FaTrophy } from "react-icons/fa";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameHistory, setGameHistory] = useState({ x: 0, o: 0, tie: 0 });
  const [winningLine, setWinningLine] = useState([]);
  const toast = useToast();

  // Color theme
  const bgColor = useColorModeValue("blue.50", "blue.900");
  const boardBg = useColorModeValue("white", "gray.800");
  const titleColor = useColorModeValue("blue.600", "blue.300");
  const cellEmptyBg = useColorModeValue("gray.100", "gray.700");
  
  // X and O colors
  const xColor = "red.500";
  const oColor = "blue.500";

  // Check for winner
  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinningLine(lines[i]);
        return squares[a];
      }
    }
    
    // Check for tie (all cells filled)
    if (squares.every(cell => cell !== null)) {
      return "Tie";
    }
    
    return null;
  };

  const winner = checkWinner(board);

  // Show celebration when game ends
  useEffect(() => {
    if (winner === "X" || winner === "O") {
      // Update score
      setGameHistory({
        ...gameHistory,
        [winner.toLowerCase()]: gameHistory[winner.toLowerCase()] + 1
      });
      
      // Show congratulations toast
      toast({
        title: `🎉 ${winner} Wins!`,
        description: "Great job playing!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    } else if (winner === "Tie") {
      setGameHistory({
        ...gameHistory,
        tie: gameHistory.tie + 1
      });
      
      toast({
        title: "It's a Tie!",
        description: "Good game! Try again?",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    }
  }, [winner]);

  const handleClick = (index) => {
    // Don't allow moves if cell is filled or game is over
    if (board[index] || winner) return;
    
    // Create a new board with the move
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine([]);
  };

  // Custom X and O components for more visual appeal
  const XSymbol = () => (
    <Box 
      color={xColor} 
      fontWeight="bold" 
      fontSize="4xl" 
      fontFamily="'Comic Sans MS', cursive, sans-serif"
    >
      X
    </Box>
  );
  
  const OSymbol = () => (
    <Box 
      color={oColor} 
      fontWeight="bold" 
      fontSize="4xl" 
      fontFamily="'Comic Sans MS', cursive, sans-serif"
    >
      O
    </Box>
  );

  // Game status message
  const getStatusMessage = () => {
    if (winner === "X" || winner === "O") {
      return (
        <Flex alignItems="center" justifyContent="center">
          <Icon as={FaTrophy} color="yellow.400" mr={2} boxSize={6} />
          <Text color={winner === "X" ? xColor : oColor} fontWeight="bold">
            {winner} Wins!
          </Text>
        </Flex>
      );
    } else if (winner === "Tie") {
      return <Text>It's a Tie!</Text>;
    } else {
      return (
        <Flex alignItems="center" justifyContent="center">
          <Text mr={2}>Next Player:</Text>
          <Box 
            bg={isXNext ? xColor : oColor} 
            color="white" 
            px={3} 
            py={1} 
            borderRadius="md"
            fontWeight="bold"
          >
            {isXNext ? "X" : "O"}
          </Box>
        </Flex>
      );
    }
  };

  return (
    <Box 
    // bg={bgColor} 
    minH="100vh" py={8} px={4}>
      <Box 
        maxW="500px" 
        mx="auto" 
        textAlign="center"
        bgImage="linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.9))"
        p={6}
        borderRadius="xl"
        boxShadow="xl"
      >
        <Flex alignItems="center" justifyContent="center" mb={6}>
          <Icon as={FaStar} color="yellow.400" boxSize={6} mr={3} />
          <Heading 
            color={titleColor} 
            fontSize="3xl" 
            fontFamily="'Comic Sans MS', cursive, sans-serif"
          >
            Tic-Tac-Toe
          </Heading>
          <Icon as={FaStar} color="yellow.400" boxSize={6} ml={3} />
        </Flex>
        
        <Flex justifyContent="center" mb={6}>
          <Badge colorScheme="red" p={2} borderRadius="md" m={1}>
            X Wins: {gameHistory.x}
          </Badge>
          <Badge colorScheme="blue" p={2} borderRadius="md" m={1}>
            O Wins: {gameHistory.o}
          </Badge>
          <Badge colorScheme="gray" p={2} borderRadius="md" m={1}>
            Ties: {gameHistory.tie}
          </Badge>
        </Flex>
        
        <Box 
          bg={boardBg} 
          p={4} 
          borderRadius="lg" 
          boxShadow="lg"
          mb={4}
        >
          <Text fontSize="xl" mb={4} fontWeight="bold">
            {getStatusMessage()}
          </Text>
          
          <Grid 
            templateColumns="repeat(3, 1fr)" 
            gap={3} 
            mx="auto"
            maxW="300px"
          >
            {board.map((value, index) => (
              <GridItem 
                key={index} 
                h="80px" 
                bg={winningLine.includes(index) ? "yellow.100" : cellEmptyBg}
                display="flex" 
                alignItems="center"
                justifyContent="center" 
                cursor={!value && !winner ? "pointer" : "default"}
                onClick={() => handleClick(index)}
                transition="all 0.2s"
                _hover={{
                  transform: !value && !winner ? "scale(1.05)" : "none",
                  boxShadow: !value && !winner ? "md" : "none"
                }}
                borderRadius="md"
                boxShadow="md"
                border={winningLine.includes(index) ? "2px dashed gold" : "none"}
              >
                {value === "X" ? <XSymbol /> : value === "O" ? <OSymbol /> : null}
              </GridItem>
            ))}
          </Grid>
        </Box>
        
        <Button 
          leftIcon={<FaRedo />} 
          colorScheme="green" 
          onClick={resetGame}
          size="lg"
          fontWeight="bold"
          boxShadow="md"
          borderRadius="full"
          px={8}
        >
          Play Again!
        </Button>
        
        <Box mt={6} p={3} bg="blue.50" borderRadius="lg">
          <Flex alignItems="center" mb={1}>
            <Icon as={FaTrophy} color="orange.400" mr={2} />
            <Text fontWeight="bold" color="blue.700">
              How to Play:
            </Text>
          </Flex>
          <Text fontSize="sm" color="gray.600">
            Take turns placing X and O on the board. Get three in a row, column, or diagonal to win!
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default TicTacToe;