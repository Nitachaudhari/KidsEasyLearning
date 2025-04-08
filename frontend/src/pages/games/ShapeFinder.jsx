import React, { useState } from "react";
import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  Grid,
  useToast,
  ScaleFade,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// Shape data (make sure images exist in /public/shapes/)
const shapes = [
  { name: "Circle", image: "/shapes/circle.png" },
  { name: "Square", image: "/shapes/square.png" },
  { name: "Triangle", image: "/shapes/triangle.png" },
  { name: "Rectangle", image: "/shapes/rect.png" },
  { name: "Pentagon", image: "/shapes/pentagon.png" },
];

const ShapeFinder = () => {
  const [currentShape, setCurrentShape] = useState(
    shapes[Math.floor(Math.random() * shapes.length)]
  );
  const [message, setMessage] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();


  const handleShapeClick = (shape) => {
    if (shape.name === currentShape.name) {
      setMessage("✅ Correct! Well done!");
      setShowFeedback(true);
      setTimeout(() => {
        setCurrentShape(shapes[Math.floor(Math.random() * shapes.length)]);
        setMessage("");
        setShowFeedback(false);
      }, 1200);
    } else {
      setMessage("❌ Oops! That's not it.");
      setShowFeedback(true);
      setTimeout(() => {
        setMessage("");
        setShowFeedback(false);
      }, 1000);
    }
  };

  return (
    <Box
      p={6}
      // bg="yellow.50"
      borderRadius="2xl"
      maxW="500px"
      mx="auto"
      mt={30}
      mb={40}
      boxShadow="xl"
    >
      <VStack spacing={5}>
      <Button
          onClick={() => navigate("/games")}
          colorScheme="teal"
          variant="outline"
          alignSelf="flex-start"
        >
          ← Back to Games
        </Button>

        <Text fontSize="2xl" fontWeight="bold" color="purple.600">
          🔍 Find this Shape
        </Text>
        <Box
          bg="purple.100"
          p={4}
          borderRadius="xl"
          boxShadow="md"
          textAlign="center"
        >
          <Text fontSize="xl" fontWeight="semibold" color="purple.700">
            {currentShape.name}
          </Text>
          <Image
            src={currentShape.image}
            alt={currentShape.name}
            boxSize="100px"
            mx="auto"
            mt={2}
          />
        </Box>

        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {shapes.map((shape, index) => (
            <Button
              key={index}
              onClick={() => handleShapeClick(shape)}
              variant="solid"
              colorScheme="teal"
              size="lg"
              h="auto"
              flexDirection="column"
              p={3}
              borderRadius="xl"
              _hover={{ transform: "scale(1.05)" }}
              _active={{ transform: "scale(0.95)" }}
            >
              <Image src={shape.image} alt={shape.name} boxSize="50px" />
              <Text mt={1} fontWeight="medium">
                {shape.name}
              </Text>
            </Button>
          ))}
        </Grid>

        <ScaleFade initialScale={0.9} in={showFeedback}>
          <Text
            fontSize="lg"
            fontWeight="semibold"
            color={message.includes("Correct") ? "green.500" : "red.400"}
          >
            {message}
          </Text>
        </ScaleFade>
      </VStack>
    </Box>
  );
};

export default ShapeFinder;
