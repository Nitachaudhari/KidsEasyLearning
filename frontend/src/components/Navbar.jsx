import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  Text,
  useBreakpointValue,
  Stack,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const buttonFontSize = useBreakpointValue({ base: "sm", md: "md" });
  const isMobile = useBreakpointValue({ base: true, md: false });

  const NavLinks = () => (
    <Stack direction={{ base: "column", md: "row" }} spacing="4" align="center">
      <Link to="/">
        <Button colorScheme="yellow" borderRadius="full" size="md" fontWeight="bold" fontSize={buttonFontSize} leftIcon={<span role="img" aria-label="home">🏠</span>}>
          Home
        </Button>
      </Link>
      <Link to="/stories">
        <Button colorScheme="green" borderRadius="full" size="md" fontWeight="bold" fontSize={buttonFontSize} leftIcon={<span role="img" aria-label="stories">📚</span>}>
          Stories
        </Button>
      </Link>
      <Link to="/games">
        <Button colorScheme="pink" borderRadius="full" size="md" fontWeight="bold" fontSize={buttonFontSize} leftIcon={<span role="img" aria-label="games">🎮</span>}>
          Games
        </Button>
      </Link>
      <Link to="/quizzes">
        <Button colorScheme="orange" borderRadius="full" size="md" fontWeight="bold" fontSize={buttonFontSize} leftIcon={<span role="img" aria-label="quizzes">❓</span>}>
          Quizzes
        </Button>
      </Link>
      {/* <Link to="/dashboard">
        <Button colorScheme="purple" borderRadius="full" size="md" fontWeight="bold" fontSize={buttonFontSize} leftIcon={<span role="img" aria-label="dashboard">📊</span>}>
          Dashboard
        </Button>
      </Link> */}

      {user ? (
        <>
          <Box bg="blue.100" color="blue.800" borderRadius="full" px="4" py="2" fontWeight="bold" fontSize={buttonFontSize}>
            <Flex align="center">
              <span role="img" aria-label="user">👋</span>
              <Text ml="2">Hi, {user.name}!</Text>
            </Flex>
          </Box>
          <Button colorScheme="red" size="md" onClick={logout} borderRadius="full" fontWeight="bold" fontSize={buttonFontSize} leftIcon={<span role="img" aria-label="logout">🚪</span>}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button size="md" colorScheme="green" borderRadius="full" fontWeight="bold" fontSize={buttonFontSize} leftIcon={<span role="img" aria-label="login">🔑</span>}>
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button size="md" colorScheme="blue" ml={{ md: 2 }} borderRadius="full" fontWeight="bold" fontSize={buttonFontSize} leftIcon={<span role="img" aria-label="signup">✨</span>}>
              Join Us
            </Button>
          </Link>
        </>
      )}
    </Stack>
  );

  return (
    <Box
      bgImage="url('/storiesbackground.png')"
      // bgSize="cover"
      // bgPosition="center"
      // bgRepeat="no-repeat"
      // minH="100vh"
      position="relative"
      pb={10}      py="4"
      px="6"
      color="white"
      zIndex="1"
      borderBottomRadius="xl"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
    >
      <Flex justify="space-between" align="center">
        {/* Hamburger for Mobile */}
        {isMobile && (
          <IconButton
            icon={<HamburgerIcon />}
            variant="outline"
            colorScheme="whiteAlpha"
            aria-label="Open Menu"
            onClick={onOpen}
          />
        )}

        {/* Center Logo */}
        <Box
          bg="yellow.300"
          px="6"
          py="3"
          borderRadius="full"
          boxShadow="lg"
          zIndex="10"
          border="4px solid white"
        >
          <Link to="/">
            <Flex
              align="center"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="extrabold"
              color="purple.600"
              letterSpacing="wider"
            >
              <span role="img" aria-label="pencil">✏️</span>
              <Box as="span" mx="1">EduFun</Box>
              <span role="img" aria-label="rocket">🚀</span>
            </Flex>
          </Link>
        </Box>

        {/* Desktop Nav */}
        {!isMobile && <NavLinks />}
      </Flex>

      {/* Drawer for Mobile Nav */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>
            <NavLinks />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Decorative Elements */}
      <Box position="absolute" bottom="-15px" left="10%" zIndex="0">
        <Text fontSize="3xl">🌈</Text>
      </Box>
      <Box position="absolute" bottom="-15px" right="10%" zIndex="0">
        <Text fontSize="3xl">✨</Text>
      </Box>
    </Box>
  );
};

export default Navbar;
