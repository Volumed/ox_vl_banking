import React, { useState } from "react";
import {
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";
import fetchNui from "../utils/fetchNui"

const Transfer = ({ balance, setBalance, players }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState(1);
  const [playerId, setPlayerId] = useState(1);
  const toast = useToast();

  const acceptTransfer = () => {
    let nrInput = parseInt(input);
    let nrPlayerId = parseInt(playerId);

    if (players.includes(nrPlayerId)) {
      if (balance >= nrInput) {
        let newBalance;

        toast({
          title: "You have successfully transferred ${nrInput} to player ID: ${nrPlayerId}",
          status: "success",
          duration: 6000,
          isClosable: false,
        });
        fetchNui("vl_banking:transfer", nrPlayerId, nrInput)
        onClose(true);

        newBalance = balance - nrInput;
        setBalance(newBalance);
        setInput(1);
        setPlayerId(1);
      } else {
        toast({
          title: "You do not have enough money in your account",
          status: "error",
          duration: 6000,
          isClosable: false,
        });
      }
    } else {
      toast({
        title: "Player with ID: ${nrPlayerId} has not been found",
        status: "error",
        duration: 6000,
        isClosable: false,
      });
    }
  };

  return (
    <div className="Transfer">
      <Button colorScheme="orange" rounded="lg" size="lg" onClick={onOpen}>
        Transfer
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay bg="blackAlpha.400" />
        <ModalContent bg="gray.800" color="gray.200" rounded="lg">
          <ModalHeader pl="6" pr="6">
            Transfer
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pl="6" pr="6">
            <FormControl mb="3">
              <FormLabel htmlFor="id">Player ID</FormLabel>
              <NumberInput min={1} value={playerId} onChange={setPlayerId}>
                <NumberInputField id="id" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="amount">Amount</FormLabel>
              <NumberInput min={1} value={input} onChange={setInput}>
                <NumberInputField id="amount" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </ModalBody>
          <ModalFooter pl="6" pr="6">
            <Flex w="100%">
              <Button
                rounded="md"
                mr="auto"
                colorScheme="green"
                onClick={acceptTransfer}
              >
                Accept
              </Button>
              <Button rounded="md" onClick={onClose}>
                Close
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Transfer;
