import React, { useState, useEffect, useRef } from "react";
import { Box, Text, Grid, GridItem, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// 🧱 = Wall | 👦 = Player | 🚀 = Goal
const initialMaze = [
  ["🧱", " ", " ", "", "🚀"],
  ["🧱", "🧱", " ", "🧱", "🧱"],
  ["👦", " ", " ", " ", "🧱"],
  ["🧱", "🧱", "🧱", " ", "🧱"],
  ["🧱", "🧱", "🧱", " ", "🧱"],
];

const MazeGame = () => {
  const [playerPos, setPlayerPos] = useState({ row: 2, col: 0 });
  const [message, setMessage] = useState("");
  const mazeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    mazeRef.current?.focus(); // Focus for keyboard input on mount

    const handleKeyPress = (e) => {
      if (message) return;

      let { row, col } = playerPos;
      if (e.key === "ArrowUp" && row > 0 && initialMaze[row - 1][col] !== "🧱") row--;
      else if (e.key === "ArrowDown" && row < 4 && initialMaze[row + 1][col] !== "🧱") row++;
      else if (e.key === "ArrowLeft" && col > 0 && initialMaze[row][col - 1] !== "🧱") col--;
      else if (e.key === "ArrowRight" && col < 4 && initialMaze[row][col + 1] !== "🧱") col++;

      setPlayerPos({ row, col });

      if (initialMaze[row][col] === "🚀") {
        setMessage("🎉 You reached the rocket! 🚀");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [playerPos, message]);

  const restartGame = () => {
    setPlayerPos({ row: 2, col: 0 });
    setMessage("");
    mazeRef.current?.focus();
  };

  return (
    <Box textAlign="center" p={5} ref={mazeRef} tabIndex={0} outline="none">
      <Button
        onClick={() => navigate("/games")}
        colorScheme="teal"
        variant="outline"
        alignSelf="flex-start"
      >
        ← Back to Games
      </Button>

      <Text fontSize="3xl" fontWeight="bold" mb={3} color="white">
        🧩 Maze Runner Game 🚀
      </Text>

      {/* Hint message */}
      <Text fontSize="md" color="white" mb={4}>
        Hint: Reach the 🚀 rocket without touching the 🧱 walls.
      </Text>

      <Grid templateColumns="repeat(5, 60px)" gap={1} justifyContent="center">
        {initialMaze.map((row, rIdx) =>
          row.map((cell, cIdx) => {
            const isPlayer = rIdx === playerPos.row && cIdx === playerPos.col;
            const isGoal = cell === "🚀";
            const isWall = cell === "🧱";
            const bgColor = isPlayer
              ? "yellow.300"
              : isWall
              ? "gray.600"
              : isGoal
              ? "pink.200"
              : "gray.200";

            return (
              <GridItem
                key={`${rIdx}-${cIdx}`}
                w="60px"
                h="60px"
                fontSize="2xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="2px solid black"
                bg={bgColor}
                color={isGoal ? "red.500" : "black"}
                transition="background 0.2s"
              >
                {isPlayer ? "👦" : cell}
              </GridItem>
            );
          })
        )}
      </Grid>

      {message && (
        <Text mt={4} fontSize="lg" fontWeight="semibold" color="green.500">
          {message}
        </Text>
      )}

      {message && (
        <Button mt={3} colorScheme="blue" onClick={restartGame}>
          🔁 Restart Game
        </Button>
      )}
    </Box>
  );
};

export default MazeGame;
