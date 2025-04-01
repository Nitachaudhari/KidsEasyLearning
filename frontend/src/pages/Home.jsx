import { Box, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box textAlign="center" p={10}>
      <Heading>Welcome to Kids Learning!</Heading>
      <Link to="/quiz">
        <Button colorScheme="blue" mt={4}>Play Quiz</Button>
      </Link>
      <Link to="/stories">
        <Button colorScheme="green" mt={4} ml={2}>Read Stories</Button>
      </Link>
    </Box>
  );
}

export default Home;
