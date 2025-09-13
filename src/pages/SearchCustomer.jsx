import CustomerCard from "../components/CustomerCard.jsx";
import {
  Box,
  Button,
  Float,
  Input,
  InputGroup,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import React, { use, useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { RiArrowDropLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const SearchCustomer = () => {
  const [searchMsg, setsearchMsg] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (!searchMsg) {
      setResults([]);
      setLoading(false);
      return; // skip empty search
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/customer/search?name=${searchMsg}`);
        const data = await res.json();
        setResults(data);
        console.log("Search results:", data);
        setLoading(false);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 300); // wait 300ms after user stops typing

    return () => clearTimeout(timeout); // cleanup previous timeout
  }, [searchMsg]);

  // const handleClick = async (customerId) => {
  //   try {
  //     const res = await fetch(`/api/customer/${customerId}`);
  //     const customer = await res.json();
  //     setSelectedCustomer(customer);
  //     // console.log(customer);
  //   } catch (error) {
  //     console.error("Get Customer error:", error);
  //   }
  // };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <>
      <Box
        maxH={"100vh"}
        maxW={"100vw"}
        position={"relative"}
        // borderWidth={"2px"}
        // borderColor={"white"}
      >
        <Float
          placement={"top-start"}
          display={{ base: "none", md: "block" }}
          offsetY="10"
          offsetX="20"
        >
          <Button
            colorPalette={"pink"}
            variant="outline"
            onClick={handleBackClick}
          >
            <RiArrowDropLeftLine />
            Back
          </Button>
        </Float>
      </Box>
      <Box
        maxH={"100vh"}
        maxW={"100vw"}
        alignItems={"center"}
        justifyContent={"center"}
        display={"flex"}
        p={4}
        marginY={5}
        //   bg={"white"}
      >
        <VStack spacing={6} w="full" maxW="600px">
          <InputGroup
            flex="1"
            startElement={<LuSearch size={20} />}
            // endElement={<Kbd>⌘K</Kbd>}
            maxW="500px"
            w="90%"
          >
            <Input
              borderRadius="lg"
              size={"lg"}
              type="search"
              placeholder="Search customers..."
              borderColor={"white"}
              onChange={(e) => setsearchMsg(e.target.value)}
            />
          </InputGroup>
          <VStack
            spacing={4}
            w="full"
            marginTop={4}
            maxH="80vh" // limit the height of results area
            overflowY="auto"
          >
            {loading ? (
              // Skeletons while loading
              <>
                <Skeleton
                  marginBottom={3}
                  height="40px"
                  w="500px"
                  borderRadius="md"
                  variant="pulse"
                />
                <Skeleton
                  marginBottom={3}
                  height="40px"
                  w="500px"
                  borderRadius="md"
                  variant="pulse"
                />
                <Skeleton
                  marginBottom={3}
                  height="40px"
                  w="500px"
                  borderRadius="md"
                  variant="pulse"
                />
              </>
            ) : results.length > 0 ? (
              results.map((result) => (
                <CustomerCard
                  key={result._id}
                  name={result.customer_name}
                  onClick={() => navigate(`/customerdetails/${result._id}`)}
                />
              ))
            ) : (
              "No customer found"
            )}
          </VStack>
        </VStack>
      </Box>
    </>
  );
};

export default SearchCustomer;
