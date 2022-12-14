import { HStack, Center, Image } from "@chakra-ui/react";

const Loader: React.FC<{}> = () => {
  return (
    <Center
      position="fixed"
      top={0}
      left={0}
      w="100%"
      h="100%"
      padding={0}
      margin={0}
      bg="#00494c"
      zIndex={2147483647}
    >
      <HStack w="100%" h="20%" flexWrap="wrap-reverse" justifyContent="center">
        <Image
          src={require("../../assets/logo.png")}
          boxSize="200px"
          padding={0}
          objectFit="contain"
          pointerEvents="none"
        />
        <Center>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100px", height: "100px" }}
          >
            <circle
              cx="50"
              cy="50"
              r="20"
              strokeWidth={6}
              stroke="#ffffff"
              strokeDasharray="54.97787143782138 54.97787143782138"
              fill="none"
              strokeLinecap="round"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="0.7042253521126761s"
                keyTimes="0;1"
                values="0 50 50;360 50 50"
              ></animateTransform>
            </circle>
          </svg>
        </Center>
      </HStack>
    </Center>
  );
};

export default Loader;
