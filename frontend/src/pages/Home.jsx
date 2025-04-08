import { Box, Heading, Text, Button, Image, VStack, Grid, Flex, Container, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AnimatedCard = ({ icon, title, description, color }) => (
  <Box
    bg={color}
    p={5}
    borderRadius="xl"
    boxShadow="lg"
    textAlign="center"
    color="white"
    transition="all 0.3s"
    _hover={{ transform: "translateY(-10px)", boxShadow: "xl" }}
    position="relative"
    overflow="hidden"
  >
    <Text fontSize="4xl" mb={3}>{icon}</Text>
    <Heading fontSize="xl" mb={2}>{title}</Heading>
    <Text fontSize="md">{description}</Text>
    
    {/* Decorative corner elements */}
    <Box position="absolute" top="5px" left="5px" fontSize="lg">✨</Box>
    <Box position="absolute" bottom="5px" right="5px" fontSize="lg">✨</Box>
  </Box>
);

const Home = () => {
  return (
    <Box>
      {/* Hero Section with Background */}
      <Box
         bgImage="url('/storiesbackground.png')"
         bgSize="cover"
         bgPosition="center"
         bgRepeat="no-repeat"
         minH="100vh"
         position="relative"
         pb={10}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        textAlign="center"
        color="white"
        p={6}
        overflow="hidden"
      >
        {/* Background with overlay for better text readability */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bgImage="url('https://cdn.pixabay.com/photo/2016/04/05/11/07/kids-1309145_1280.jpg')"
          bgSize="cover"
          bgPosition="center"
          zIndex="-2"
        />
        
        {/* Colorful overlay with gradient */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="linear-gradient(135deg, rgba(75, 0, 130, 0.5), rgba(0, 191, 255, 0.5))"
          zIndex="-1"
        />
        
        {/* Floating clouds decoration */}
        <Box position="absolute" top="10%" left="5%" fontSize="4xl" className="floating-slow">☁️</Box>
        <Box position="absolute" top="15%" right="10%" fontSize="4xl" className="floating-medium">☁️</Box>
        <Box position="absolute" bottom="20%" left="15%" fontSize="4xl" className="floating-fast">🌈</Box>
        
        {/* Main Content */}
        <Box
          bg="rgba(255, 255, 255, 0.85)"
          p={8}
          borderRadius="2xl"
          boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
          maxW="800px"
          border="4px dashed"
          borderColor="purple.300"
          color="purple.800"
        >
          {/* Heading with fun typography */}
          <Heading
            fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
            fontFamily="'Comic Sans MS', 'Bubblegum Sans', cursive"
            bgGradient="linear(to-r, purple.500, blue.500, teal.500)"
            bgClip="text"
            fontWeight="extrabold"
            className="bounce-in"
          >
            🎈 Welcome to EduFun! 🎈
          </Heading>
          
          {/* Subtitle with playful elements */}
          <Text 
            fontSize={{ base: "lg", md: "2xl" }} 
            mt={4} 
            fontWeight="bold" 
            color="blue.600"
            className="fade-in"
          >
            Where Learning is an Adventure! 🚀
          </Text>
          
          {/* Mascot Image */}
          <Flex justify="center" my={6}>
            <Image
              src="./homeBackground.png"
              alt="Cute Cartoon Tiger"
              boxSize={{ base: "150px", md: "220px" }}
              className="float-bounce"
              fallbackSrc="/api/placeholder/220/220"
            />
          </Flex>
          
          {/* Action Buttons */}
          <Flex gap={4} justify="center" wrap="wrap" mt={2} className="pop-in">
            <Link to='/quizzes'>
              <Button
                colorScheme="purple"
                size="lg"
                borderRadius="full"
                boxShadow="lg"
                _hover={{ transform: "scale(1.05)" }}
                leftIcon={<span>🎮</span>}
              >
                Start Learning
              </Button>
            </Link>
            
            <Link to='./stories'>
              <Button
                colorScheme="teal"
                size="lg"
                borderRadius="full"
                boxShadow="lg"
                _hover={{ transform: "scale(1.05)" }}
                leftIcon={<span>📚</span>}
              >
                Explore Stories
              </Button>
            </Link>
           
          </Flex>
        </Box>
      </Box>
      
      {/* Features Section */}
      <Box 
        bg="linear-gradient(to bottom, #f0f9ff, #e6f7ff)" 
        py={16} 
        px={4}
        position="relative"
      >
        {/* Decorative elements */}
        <Box position="absolute" top="-30px" left="5%" fontSize="4xl">🌟</Box>
        <Box position="absolute" top="-30px" right="5%" fontSize="4xl">🌟</Box>
        
        <Container maxW="container.xl">
          <VStack spacing={10}>
            <Heading 
              fontSize={{ base: "2xl", md: "3xl" }} 
              color="purple.700"
              textAlign="center"
              fontFamily="'Comic Sans MS', cursive"
            >
              Discover Amazing Learning Adventures! ✨
            </Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mt={6}>
              <AnimatedCard
                icon="📚"
                title="Fun Stories"
                description="Read exciting stories with colorful characters and adventures!"
                color="linear-gradient(45deg, #FF6B6B, #FF8E8E)"
              />
              
              <AnimatedCard
                icon="🎮"
                title="Cool Games"
                description="Play educational games that make learning super fun!"
                color="linear-gradient(45deg, #4158D0, #C850C0)"
              />
              
              <AnimatedCard
                icon="❓"
                title="Brain Quizzes"
                description="Test your knowledge with our interactive quizzes!"
                color="linear-gradient(45deg, #0093E9, #80D0C7)"
              />
              
              <AnimatedCard
                icon="🏆"
                title="Win Badges"
                description="Earn special badges and track your progress!"
                color="linear-gradient(45deg, #FBAB7E, #F7CE68)"
              />
            </SimpleGrid>
            
            {/* Join Now CTA */}
            <Box 
              mt={10} 
              p={8} 
              bg="rgba(255, 255, 255, 0.8)" 
              borderRadius="xl" 
              boxShadow="xl"
              border="3px solid"
              borderColor="teal.300"
              maxW="700px"
              textAlign="center"
            >
              <Heading fontSize="2xl" color="purple.600" mb={4}>
                Ready for an Amazing Learning Journey? 🚀
              </Heading>
              <Text fontSize="lg" mb={6} color="gray.700">
                Join thousands of happy kids who love learning with EduFun!
              </Text>

              <Link to='./register'>
                <Button
                  colorScheme="pink"
                  size="lg"
                  borderRadius="full"
                  px={8}
                  fontSize="lg"
                  fontWeight="bold"
                  _hover={{ transform: "scale(1.05)" }}
                >
                  Join Now! 🎉
                </Button>
              </Link>
              
            </Box>
          </VStack>
        </Container>
      </Box>
      
      {/* CSS Animations */}
      <style>
        {`
          @keyframes float-slow {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(-15px) rotate(5deg); }
          }
          
          @keyframes float-medium {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(-10px) rotate(-5deg); }
          }
          
          @keyframes float-fast {
            0% { transform: translateY(0); }
            100% { transform: translateY(-20px); }
          }
          
          @keyframes float-bounce {
            0% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
            75% { transform: translateY(-5px); }
            100% { transform: translateY(-10px); }
          }
          
          @keyframes bounce-in {
            0% { transform: scale(0.5); opacity: 0; }
            80% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
          }
          
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes pop-in {
            0% { opacity: 0; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.05); }
            100% { opacity: 1; transform: scale(1); }
          }
          
          .floating-slow {
            animation: float-slow 4s infinite alternate;
          }
          
          .floating-medium {
            animation: float-medium 3s infinite alternate;
          }
          
          .floating-fast {
            animation: float-fast 2.5s infinite alternate;
          }
          
          .float-bounce {
            animation: float-bounce 3s infinite alternate;
          }
          
          .bounce-in {
            animation: bounce-in 1s;
          }
          
          .fade-in {
            animation: fade-in 1.2s 0.3s both;
          }
          
          .pop-in {
            animation: pop-in 0.8s 0.6s both;
          }
        `}
      </style>
    </Box>
  );
};

export default Home;