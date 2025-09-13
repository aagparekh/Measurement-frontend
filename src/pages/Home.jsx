import { Box, IconButton } from "@chakra-ui/react";
import React from "react";
import { LuPlus, LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleClickSearch = () => {
    navigate("/search");
  };

  const handleClickAdd = () => {
    navigate("/addcustomer");
  };

  return (
    <Box
      minH={"100vh"}
      minW={"100vw"}
      alignItems={"center"}
      justifyContent={"center"}
      display={"flex"}
      gap={4}
      flexWrap="wrap"
    >
      <Box
        as="button"
        role="button"
        minW={"10vw"}
        minH={"18vh"}
        borderRadius="xl"
        aspectRatio={1}
        bgGradient="to-br"
        gradientFrom="blue.400"
        gradientTo="blue.600"
        display="flex"
        alignItems="center"
        justifyContent="center"
        _hover={{ transform: "scale(1.05)", shadow: "xl" }}
        transition="all 0.2s ease-in-out"
        cursor={"pointer"}
        onClick={handleClickAdd}
      >
        <LuPlus size={65} color={"white"} />
      </Box>
      <Box
        as="button"
        role="button"
        minW={"10vw"}
        minH={"18vh"}
        borderRadius="xl"
        aspectRatio={1}
        // bgGradient="linear(to-br, teal.400, )"
        bgGradient="to-br"
        gradientFrom="purple.400"
        gradientTo="pink.500"
        display="flex"
        alignItems="center"
        justifyContent="center"
        shadow="lg"
        _hover={{ transform: "scale(1.05)", shadow: "xl" }}
        transition="all 0.2s ease-in-out"
        cursor={"pointer"}
        onClick={handleClickSearch}
      >
        <LuSearch size={65} color="white" /> {/* control size here */}
      </Box>
    </Box>
  );
};

export default Home;
