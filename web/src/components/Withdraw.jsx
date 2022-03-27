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

const Withdraw = ({ balance, setBalance, money, setMoney }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState(1);
  const toast = useToast();

  const acceptWithdraw = () => {
    let nrInput = parseInt(input);

    if (balance >= nrInput) {
      let newBalance;
      let newCash;

      toast({
        title: `Account balance ${nrInput} allocated for cash money`,
        status: "success",
        duration: 6000,
        isClosable: false,
      });
      fetchNui("ox_vl_banking:withdraw", 0, nrInput)
      onClose(true);

      newBalance = balance - nrInput;
      newCash = money + nrInput;
      setBalance(newBalance);
      setMoney(newCash);
      setInput(1);
    } else {
      toast({
        title: "Not enough account balance",
        status: "error",
        duration: 6000,
        isClosable: false,
      });
    }
  };

  return (
    <div className="Withdraw">
      <Button colorScheme="blue" rounded="lg" size="lg" onClick={onOpen}>
        Withdraw
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay bg="blackAlpha.400" />
        <ModalContent bg="gray.800" color="gray.200" rounded="lg">
          <ModalHeader pl="6" pr="6">
            Withdraw
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
                onClick={acceptWithdraw}
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

export default Withdraw;
