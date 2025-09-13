import { Box } from "@chakra-ui/react";
import React from "react";
import { Navigate } from "react-router-dom";

const CustomerCard = ({ name, onClick }) => {
  // const navigate = Navigate();

  // const handleClick = () => {
  //   navigate('/customerdetails', { state: { name }});
  // };

  return (
    <Box
      borderWidth={"2px"}
      borderStyle={"solid"}
      borderColor={"white"}
      borderRadius={"lg"}
      p={2}
      maxW="500px"
      w="90%"
      marginBottom={3}
      cursor={"pointer"}
      onClick={onClick}
    >
      <h4>{name}</h4>
    </Box>
  );
};

export default CustomerCard;
