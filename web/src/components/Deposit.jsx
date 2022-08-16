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

const Deposit = ({ balance, setBalance, money, setMoney }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState(1);
  const toast = useToast();

  const acceptDeposit = () => {
    let nrInput = parseInt(input);

    if (money >= nrInput) {
      let newBalance;
      let newCash;

      toast({
        title: "You successfully made a deposit of ${nrInput}",
        status: "success",
        duration: 6000,
        isClosable: false,
      });
      fetchNui("vl_banking:deposit", 0, nrInput)
      onClose(true);

      newBalance = balance + nrInput;
      newCash = money - nrInput;
      setBalance(newBalance);
      setMoney(newCash);
      setInput(1);
    } else {
      toast({
        title: "You do not have enough cash to make a deposit",
        status: "error",
        duration: 6000,
        isClosable: false,
      });
    }
  };

  return (
    <div className="Deposit">
      <Button colorScheme="green" rounded="lg" size="lg" onClick={onOpen}>
        Deposit
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay bg="blackAlpha.400" />
        <ModalContent bg="gray.800" color="gray.200" rounded="lg">
          <ModalHeader pl="6" pr="6">
            Deposit
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pl="6" pr="6">
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
                onClick={acceptDeposit}
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

export default Deposit;
