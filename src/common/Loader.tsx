import React from "react";
import { loader } from "../assets";
import { Flex, Image, Text } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex
      position={"fixed"}
      h={"screen"}
      background={"rgba(0,0,0,0.7)"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Image
        src={loader}
        alt="loader"
        h={"100px"}
        w={"100px"}
        objectFit={"contain"}
      />
      <Text
        mt={20}
        className="mt-[20px] font-epilogue font-bold text-[20px] text-center text-white"
      >
        Transaction is in progress <br />
        Please wait...
      </Text>
    </Flex>
  );
};

export default Loader;
