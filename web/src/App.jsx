import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Image,
  Heading,
  CloseButton,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import Logo from "./assets/bank.svg";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import Transfer from "./components/Transfer";
import fetchNui from "./utils/fetchNui"

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [money, setMoney ] = useState(0);
  const [balance, setBalance ] = useState(0);
  const [players, setPlayers ] = useState('');

  window.addEventListener("message", (event) => {
    if (event.data.type === "open") {
      setMoney(event.data.money);
      setBalance(event.data.balance);
      setPlayers(event.data.players);
      onOpen(true);
    }
  });

  useEffect(() => {
    if (!isOpen) {
      fetchNui("vl_banking:close", 0, 0)
    }
  }, [isOpen]);

  return (
    <div className="App">
      <Flex align="center" justify="center" position="relative" height="100vh">
        <Modal closeOnOverlayClick={false} onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay bg="blackAlpha.400" />
          <ModalContent position="relative" zIndex="2" maxW="container.md">
            <Box
              bg="gray.200"
              color="gray.900"
              boxShadow="lg"
              rounded="lg"
              overflow="hidden"
              border="2px"
              borderColor="gray.200"
            >
              <Box bg="gray.800" color="gray.200">
                <Flex align="center">
                  <Image src={Logo} alt="Bank" boxSize="80px" ml="2" />
                  <Heading as="h1" size="md">
                    Ox Banking
                  </Heading>
                  <CloseButton
                    marginLeft="auto"
                    size="lg"
                    mr="3"
                    onClick={onClose}
                  />
                </Flex>
              </Box>
              <Box p="6" color="gray.900">
                <Box bg="gray.800" color="gray.200" rounded="lg" p="3" mb="6">
                  <Flex align="center">
                    <Heading as="h1" size="sm">Account Balance:</Heading>
                    <Text ml="2">{ balance }</Text>
                  </Flex>
                </Box>
                <Stack spacing={4} direction="row" align="center">
                  <Deposit balance={balance} setBalance={setBalance} money={money} setMoney={setMoney} />
                  <Withdraw balance={balance} setBalance={setBalance} money={money} setMoney={setMoney} /> 
                  <Transfer balance={balance} setBalance={setBalance} players={players} /> 
                </Stack>
              </Box>
              <Box pr="6" pl="6" pb="6" color="gray.900">
                <Flex align="right">
                  <Button
                    ml="auto"
                    color="gray.800"
                    bg="gray.100"
                    _hover={{ bg: "gray.300", color: "gray.900" }}
                    _active={{
                      bg: "gray.100",
                    }}
                    rounded="md"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </Flex>
              </Box>
            </Box>
          </ModalContent>
        </Modal>
      </Flex>
    </div>
  );
};

export default App;
