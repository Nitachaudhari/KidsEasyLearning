// Footer.jsx
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Text,
  Link,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  HStack
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  const links = [
    { label: "Home", path: "/" },
    { label: "Stories", path: "/stories" },
    { label: "Games", path: "/games" },
    { label: "Quizzes", path: "/quizzes" },
    // { label: "Learning Path", path: "/learning-path" },
    // { label: "Parent Guide", path: "/parent-guide" },
  ];

  return (
    <Box
      as="footer"
      bg="linear-gradient(to bottom, rgb(47, 27, 50), rgb(160, 124, 224))"
      color="white"
      py={8}
      borderTopRadius="3xl"
      position="relative"
      overflow="hidden"
    >
      {/* Decorative elements */}
      <Box position="absolute" top="10px" left="5%" zIndex="0">
        <Text fontSize="4xl">🌟</Text>
      </Box>
      <Box position="absolute" top="20px" right="8%" zIndex="0">
        <Text fontSize="4xl">🦄</Text>
      </Box>
      <Box position="absolute" bottom="15px" left="15%" zIndex="0">
        <Text fontSize="4xl">🎨</Text>
      </Box>
      <Box position="absolute" bottom="25px" right="12%" zIndex="0">
        <Text fontSize="4xl">🧩</Text>
      </Box>

      <Container maxW="container.xl" position="relative" zIndex="1">
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={8}
        >
          {/* About section */}
          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <Flex
                align="center"
                bg="yellow.300"
                px={4}
                py={2}
                borderRadius="full"
                boxShadow="md"
                color="purple.700"
                fontWeight="bold"
                fontSize="xl"
              >
                <Box as="span" mr={2}>✏️</Box>
                EduFun
                <Box as="span" ml={2}>🚀</Box>
              </Flex>

              <Text fontSize="md" lineHeight="tall">
                Where learning meets adventure! We make education fun through 
                interactive stories, games and quizzes designed just for kids.
              </Text>

              <HStack spacing={4}>
                <Link href="#" aria-label="Facebook">
                  <Box
                    bg="blue.500"
                    p={2}
                    borderRadius="full"
                    boxShadow="md"
                    _hover={{ transform: "scale(1.1)", transition: "0.3s" }}
                  >
                    <Text fontSize="lg">📱</Text>
                  </Box>
                </Link>
                <Link href="#" aria-label="Instagram">
                  <Box
                    bg="pink.500"
                    p={2}
                    borderRadius="full"
                    boxShadow="md"
                    _hover={{ transform: "scale(1.1)", transition: "0.3s" }}
                  >
                    <Text fontSize="lg">📷</Text>
                  </Box>
                </Link>
                <Link href="#" aria-label="Twitter">
                  <Box
                    bg="blue.400"
                    p={2}
                    borderRadius="full"
                    boxShadow="md"
                    _hover={{ transform: "scale(1.1)", transition: "0.3s" }}
                  >
                    <Text fontSize="lg">🐦</Text>
                  </Box>
                </Link>
                <Link href="#" aria-label="YouTube">
                  <Box
                    bg="red.500"
                    p={2}
                    borderRadius="full"
                    boxShadow="md"
                    _hover={{ transform: "scale(1.1)", transition: "0.3s" }}
                  >
                    <Text fontSize="lg">📺</Text>
                  </Box>
                </Link>
              </HStack>
            </VStack>
          </GridItem>

          {/* Quick Links */}
          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <Box
                bg="green.400"
                px={4}
                py={2}
                borderRadius="full"
                color="white"
                fontWeight="bold"
                boxShadow="md"
              >
                <Flex align="center">
                  <Box as="span" mr={2}>🔍</Box>
                  Quick Links
                </Flex>
              </Box>

              {links.map((item) => (
                <Link
                  as={RouterLink}
                  to={item.path}
                  key={item.label}
                  _hover={{ textDecoration: "none" }}
                  width="100%"
                >
                  <Box
                    bg="whiteAlpha.300"
                    px={4}
                    py={1}
                    borderRadius="full"
                    _hover={{
                      bg: "whiteAlpha.400",
                      transform: "translateX(5px)",
                      transition: "0.3s",
                    }}
                    display="flex"
                    alignItems="center"
                  >
                    <Text as="span" mr={2}>➡️</Text>
                    {item.label}
                  </Box>
                </Link>
              ))}
            </VStack>
          </GridItem>

          {/* For Parents */}
          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <Box
                bg="orange.400"
                px={4}
                py={2}
                borderRadius="full"
                color="white"
                fontWeight="bold"
                boxShadow="md"
              >
                <Flex align="center">
                  <Box as="span" mr={2}>👨‍👩‍👧‍👦</Box>
                  For Parents
                </Flex>
              </Box>

              {["Safety", "Privacy", "Support", "FAQ"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  _hover={{ textDecoration: "none" }}
                >
                  <Box
                    bg="whiteAlpha.300"
                    px={4}
                    py={1}
                    borderRadius="full"
                    _hover={{
                      bg: "whiteAlpha.400",
                      transform: "translateX(5px)",
                      transition: "0.3s",
                    }}
                    display="flex"
                    alignItems="center"
                  >
                    <Text as="span" mr={2}>➡️</Text>
                    {item}
                  </Box>
                </Link>
              ))}
            </VStack>
          </GridItem>

          {/* Newsletter */}
          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <Box
                bg="blue.400"
                px={4}
                py={2}
                borderRadius="full"
                color="white"
                fontWeight="bold"
                boxShadow="md"
              >
                <Flex align="center">
                  <Box as="span" mr={2}>✉️</Box>
                  Parent Newsletter
                </Flex>
              </Box>

              <Text fontSize="md">
                Get weekly updates on new content and learning tips!
              </Text>

              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  placeholder="Your email"
                  bg="whiteAlpha.300"
                  borderRadius="full"
                  _placeholder={{ color: "whiteAlpha.700" }}
                  _hover={{ bg: "whiteAlpha.400" }}
                  _focus={{ bg: "whiteAlpha.500", borderColor: "yellow.300" }}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    colorScheme="yellow"
                    borderRadius="full"
                    mr={1}
                  >
                    Join
                  </Button>
                </InputRightElement>
              </InputGroup>
            </VStack>
          </GridItem>
        </Grid>

        {/* Bottom section */}
        <Box mt={12} textAlign="center" position="relative">
          <Box
            position="absolute"
            top="-30px"
            left="0"
            right="0"
            height="2px"
            bgGradient="linear(to-r, purple.500, pink.500, blue.500, green.500, yellow.500)"
          />

          <Flex
            justify="space-between"
            direction={{ base: "column", md: "row" }}
            align="center"
            gap={4}
          >
            <Text fontSize="sm">
              © 2025 EduFun Learning. All rights reserved.
            </Text>

            <HStack spacing={4} wrap="wrap" justify={{ base: "center", md: "flex-end" }}>
              {["Terms", "Privacy", "Cookies", "Accessibility", "Contact"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  fontSize="sm"
                  color="whiteAlpha.800"
                  _hover={{ color: "yellow.300" }}
                >
                  {item}
                </Link>
              ))}
            </HStack>
          </Flex>

          <Text fontSize="sm" mt={4} color="whiteAlpha.800">
            Made with 💖 for curious young minds
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
