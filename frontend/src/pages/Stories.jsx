import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  Flex,
  Input,
  Container,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedStory, setSelectedStory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/stories").then((res) => {
      setStories(res.data);
      setFilteredStories(res.data);

      const uniqueLanguages = [...new Set(res.data.map((story) => story.language))];
      setLanguages(uniqueLanguages);
    });
  }, []);

  const filterStoriesByLanguage = (language) => {
    setSelectedLanguage(language);
    setSelectedStory(null);
    setSearchQuery("");

    if (language === "All") {
      setFilteredStories([...stories]);
    } else {
      const filtered = stories.filter((story) => story.language === language);
      setFilteredStories(filtered.length > 0 ? filtered : []);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedStory(null);

    if (!query) {
      setFilteredStories(
        selectedLanguage === "All"
          ? stories
          : stories.filter((story) => story.language === selectedLanguage)
      );
    } else {
      const searchFiltered = stories.filter(
        (story) =>
          story.title.toLowerCase().includes(query.toLowerCase()) &&
          (selectedLanguage === "All" || story.language === selectedLanguage)
      );
      setFilteredStories(searchFiltered);
    }
  };

  const getLanguageEmoji = (language) => {
    const emojiMap = {
      hindi: "",
      marathi: "",
      english: "",
    };
    return emojiMap[language] || "";
  };

  return (
    <Box
      // bgGradient="linear(to-b, yellow.50, blue.50)"
      bgImage="url('/storiesbackground.png')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      minH="100vh"
      position="relative"
      pb={10}
    >
      <Box position="absolute" top="5%" left="5%" fontSize="4xl" className="floating-slow">📚</Box>
      <Box position="absolute" top="10%" right="5%" fontSize="4xl" className="floating-medium">🔍</Box>
      <Box position="absolute" bottom="5%" left="10%" fontSize="4xl" className="floating-slow">🦄</Box>
      <Box position="absolute" bottom="10%" right="10%" fontSize="4xl" className="floating-medium">🌈</Box>

      <Container maxW="container.xl" pt={8}>
        <Flex justifyContent="center" alignItems="center" mb={8} className="bounce-in">
          <Heading
            fontSize={{ base: "3xl", md: "4xl" }}
            color="purple.600"
            textAlign="center"
            fontFamily="'Comic Sans MS', cursive"
            bgGradient="linear(to-r, purple.400, teal.400)"
            bgClip="text"
            p={2}
          >
            <Flex alignItems="center" justifyContent="center">
              <Text as="span" mr={2}>📚</Text>
              Magical Story Library
              <Text as="span" ml={2}>✨</Text>
            </Flex>
          </Heading>
        </Flex>

        <Box mx="auto" maxW="600px" mb={6} className="pop-in">
          <Flex
            bg="white"
            borderRadius="full"
            boxShadow="md"
            p={2}
            border="3px solid"
            borderColor="purple.200"
          >
            <Text fontSize="xl" mx={3}>🔍</Text>
            <Input
              placeholder="Find a magical story..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              variant="unstyled"
              fontSize="lg"
              color="gray.700"
            />
          </Flex>
        </Box>

        <Box overflowX="auto" pb={2} mb={6} className="fade-in">
          <HStack spacing={3} justify="center" flexWrap={{ base: "nowrap", md: "wrap" }}>
            <Button
              colorScheme={selectedLanguage === "All" ? "purple" : "gray"}
              onClick={() => filterStoriesByLanguage("All")}
              borderRadius="full"
              px={6}
              fontWeight="bold"
              _hover={{ transform: "scale(1.05)" }}
              boxShadow="sm"
            >
              <Text mr={1}>🌎</Text> All Stories
            </Button>
            {languages.map((language) => (
              <Button
                key={language}
                colorScheme={selectedLanguage === language ? "teal" : "gray"}
                onClick={() => filterStoriesByLanguage(language)}
                borderRadius="full"
                px={5}
                fontWeight="bold"
                _hover={{ transform: "scale(1.05)" }}
                boxShadow="sm"
              >
                {getLanguageEmoji(language)} {language}
              </Button>
            ))}
          </HStack>
        </Box>

        {selectedStory ? (
          <Box
            bg="white"
            borderRadius="2xl"
            p={6}
            boxShadow="xl"
            border="4px dashed"
            borderColor="purple.200"
            className="fade-in"
            maxW="900px"
            mx="auto"
          >
            <Button
              onClick={() => setSelectedStory(null)}
              colorScheme="pink"
              mb={6}
              leftIcon={<span>⬅️</span>}
              borderRadius="full"
              _hover={{ transform: "scale(1.05)" }}
            >
              Back to Stories
            </Button>

            <Flex direction={{ base: "column", md: "row" }} align={{ md: "start" }}>
              <Box position="relative" mb={{ base: 6, md: 0 }} className="float-bounce">
                {/* <Image
                  src={selectedStory.image}
                  alt={selectedStory.title}
                  w={{ base: "full", md: "300px" }}
                  h={{ base: "250px", md: "300px" }}
                  objectFit="cover"
                  borderRadius="xl"
                  boxShadow="lg"
                  border="4px solid white"
                  fallbackSrc="/api/placeholder/300/300"
                /> */}
                <Image
  src={`http://localhost:5000${selectedStory.image}`}
  fallbackSrc="https://via.placeholder.com/300x200"
  alt={selectedStory.title}
/>
                <Badge
                  position="absolute"
                  bottom={4}
                  right={4}
                  colorScheme="purple"
                  fontSize="md"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {getLanguageEmoji(selectedStory.language)} {selectedStory.language}
                </Badge>
              </Box>

              <Box ml={{ md: 8 }} flex={1}>
                <Heading
                  size="xl"
                  color="purple.600"
                  fontFamily="'Comic Sans MS', cursive"
                  mb={4}
                >
                  {selectedStory.title}
                </Heading>

                <Box
                  bg="blue.50"
                  p={5}
                  borderRadius="xl"
                  border="2px solid"
                  borderColor="blue.100"
                  fontSize="lg"
                  color="gray.700"
                  lineHeight="1.7"
                  position="relative"
                  className="story-container"
                  maxH="400px"
                  overflowY="auto"
                  css={{
                    '&::-webkit-scrollbar': { width: '8px' },
                    '&::-webkit-scrollbar-track': {
                      background: '#f0f0f0',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#cbd5e0',
                      borderRadius: '10px',
                    },
                  }}
                >
                  <Box position="absolute" top="-10px" left="10px" fontSize="lg">✨</Box>
                  <Box position="absolute" top="-10px" right="10px" fontSize="lg">✨</Box>

                  <Text>{selectedStory.content}</Text>
                </Box>

                <Flex justify="center" mt={6}>
                  <Button
                    colorScheme="green"
                    size="lg"
                    borderRadius="full"
                    leftIcon={<span>🔊</span>}
                    _hover={{ transform: "scale(1.05)" }}
                    mr={4}
                  >
                    Read Aloud
                  </Button>
                  <Button
                    colorScheme="blue"
                    size="lg"
                    borderRadius="full"
                    leftIcon={<span>⭐</span>}
                    _hover={{ transform: "scale(1.05)" }}
                  >
                    Add to Favorites
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Box>
        ) : (
          <Box className="fade-in">
            {filteredStories.length > 0 ? (
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
                {filteredStories.map((story) => (
                  <Box
                    key={story._id}
                    bg="white"
                    p={5}
                    borderRadius="xl"
                    boxShadow="md"
                    border="3px solid"
                    borderColor="blue.100"
                    onClick={() => setSelectedStory(story)}
                    cursor="pointer"
                    transition="all 0.3s"
                    _hover={{
                      transform: "translateY(-5px)",
                      boxShadow: "lg",
                      borderColor: "purple.200",
                    }}
                    position="relative"
                    overflow="hidden"
                  >
                    <Box h="180px" bg="gray.100" mb={4} borderRadius="lg" overflow="hidden">
                      <Image
                        src={`http://localhost:5000${story.image}`}
                        alt={story.title}
                        w="full"
                        h="full"
                        objectFit="cover"
                        fallbackSrc="/api/placeholder/300/200"
                        transition="transform 0.3s"
                        _hover={{ transform: "scale(1.05)" }}
                      />
                    </Box>

                    <Heading size="md" color="purple.600" fontWeight="bold" noOfLines={2}>
                      {story.title}
                    </Heading>

                    <Badge colorScheme="teal" mt={2} px={2} py={1} borderRadius="full">
                      {getLanguageEmoji(story.language)} {story.language}
                    </Badge>
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <Text fontSize="xl" color="gray.600" textAlign="center" mt={10}>
                No stories found 😢
              </Text>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Stories;
