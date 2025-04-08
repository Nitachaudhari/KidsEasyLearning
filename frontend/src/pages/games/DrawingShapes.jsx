import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  HStack,
  VStack,
  Select,
  Text,
  Wrap,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const DrawingShapes = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("black");
  const [lineWidth, setLineWidth] = useState(5);
  const [mode, setMode] = useState("free");
  const [startPos, setStartPos] = useState(null);
  const prevColor = useRef("black");
  const navigate = useNavigate();


  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
  }, [color, lineWidth]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent || e.touches[0];
    setStartPos({ x: offsetX, y: offsetY });

    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent || e.touches[0];
    const ctx = canvasRef.current.getContext("2d");

    if (mode === "free" || mode === "eraser") {
      ctx.strokeStyle = mode === "eraser" ? "white" : color;
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }
  };

  const stopDrawing = (e) => {
    if (!startPos) return;
    const { offsetX, offsetY } = e.nativeEvent || e.changedTouches?.[0] || {};
    const ctx = canvasRef.current.getContext("2d");

    if (mode === "square" || mode === "circle") {
      ctx.beginPath();
      ctx.strokeStyle = color;
      if (mode === "square") {
        ctx.rect(
          startPos.x,
          startPos.y,
          offsetX - startPos.x,
          offsetY - startPos.y
        );
      } else {
        const radius = Math.sqrt(
          Math.pow(offsetX - startPos.x, 2) +
            Math.pow(offsetY - startPos.y, 2)
        );
        ctx.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2);
      }
      ctx.stroke();
    }

    setIsDrawing(false);
    setStartPos(null);
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleModeChange = (newMode) => {
    if (newMode === "eraser") {
      prevColor.current = color;
      setColor("white");
    } else if (mode === "eraser") {
      setColor(prevColor.current);
    }
    setMode(newMode);
  };

  const colorOptions = ["red", "blue", "green", "purple", "orange", "black"];

  const bg = useColorModeValue(
    // "linear-gradient(to right, #fdfbfb, #ebedee)",
    // "gray.700"
  );

  return (
    <Box
      minH="100vh"
      bg={bg}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={6}
    >
 

      <Box
        bg="white"
        borderRadius="2xl"
        boxShadow="2xl"
        p={6}
        w={["100%", "500px"]}
      >
        <VStack spacing={6}>
        <Button
          onClick={() => navigate("/games")}
          colorScheme="teal"
          variant="outline"
          alignSelf="flex-start"
        >
          ← Back to Games
        </Button>
          <Text fontSize="2xl" fontWeight="bold" color="teal.600">
            🎨 Let's Draw Some Shapes!
          </Text>

          <Wrap spacing={3} justify="center">
            {colorOptions.map((c) => (
              <WrapItem key={c}>
                <Button
                  size="sm"
                  bg={c}
                  color="white"
                  onClick={() => setColor(c)}
                  border={color === c ? "3px solid black" : "none"}
                  _hover={{ transform: "scale(1.1)" }}
                >
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </Button>
              </WrapItem>
            ))}
            <Button colorScheme="gray" onClick={clearCanvas}>
              Clear
            </Button>
          </Wrap>

          <HStack spacing={3}>
            <Select
              value={mode}
              onChange={(e) => handleModeChange(e.target.value)}
              w="150px"
            >
              <option value="free">✏️ Free Draw</option>
              <option value="square">⬛ Square</option>
              <option value="circle">⚪ Circle</option>
              <option value="eraser">🧽 Eraser</option>
            </Select>

            <Select
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              w="130px"
            >
              <option value="2">Thin</option>
              <option value="5">Medium</option>
              <option value="10">Thick</option>
            </Select>
          </HStack>

          <Box
            border="3px solid #333"
            bg="white"
            w="100%"
            h="400px"
            borderRadius="lg"
            boxShadow="lg"
            overflow="hidden"
          >
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              style={{ cursor: "crosshair", touchAction: "none" }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default DrawingShapes;
