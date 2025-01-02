import React, { useEffect, useState, useRef } from "react";

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  VStack,
  HStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  Flex,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { questionApis } from "../../../services/api";

const ListQuestionTypesPage = () => {
  const [questionTypes, setQuestionTypes] = useState([]);
  const [filteredQuestionTypes, setFilteredQuestionTypes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);
  const [updatedQuestionType, setUpdatedQuestionType] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalQuestionTypes, setTotalQuestionTypes] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);
  const toast = useToast();
  const isMounted = useRef(false);

  
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    const fetchQuestionTypes = async () => {
      try {
        const questionTypeResponse = await questionApis.getQuestionTypeList(currentPage, rowsPerPage, searchText);
        setTotalQuestionTypes(questionTypeResponse.data.itemCount);
        setQuestionTypes(questionTypeResponse.data.items ?? []);
        setFilteredQuestionTypes(questionTypeResponse.data.items ?? []);
      } catch (error) {
        console.error("Error fetching questionTypes:", error);
      }
    };

    fetchQuestionTypes();
  }
  }, [currentPage, rowsPerPage, searchText]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {

    }, 500);
    setTimeoutId(newTimeoutId);
  };

  const handleDelete = async (questionTypeId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await questionApis.deleteQuestionType(questionTypeId);
            Swal.fire("Deleted!", response.data.message, "success");
            const updatedQuestionTypes = questionTypes.filter((q) => q.questionTypeId !== questionTypeId);
            setQuestionTypes(updatedQuestionTypes);
            setFilteredQuestionTypes(updatedQuestionTypes);
          } catch (error) {
            Swal.fire("failed", error, "error");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("X", "Cancelled", "info");
        }
      });
    } catch (error) {
      console.error("Error deleting questionType:", error);
    }
  };

  const handleUpdate = (questionType) => {
    setSelectedQuestionType(questionType);
    setUpdatedQuestionType({ ...questionType });
    setIsUpdateModalOpen(true);
  };

  const handleFieldChange = (field, value) => {


    setUpdatedQuestionType((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
    console.log(updatedQuestionType)
  };

  const handleSaveChanges = async () => {
    try {
      await questionApis.updateQuestionType(updatedQuestionType);
      toast({
        title: "QuestionType Updated",
        description: "The questionType has been updated successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      const updatedQuestionTypes = questionTypes.map((q) =>
        q.questionTypeId === updatedQuestionType.questionTypeId ? updatedQuestionType : q
      );
      setQuestionTypes(updatedQuestionTypes);
      setFilteredQuestionTypes(updatedQuestionTypes);

      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating questionType:", error);
      toast({
        title: "Error",
        description: "Failed to update the questionType.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxHeight="680px"
      
      p={2}
      bg="gray.50"
      border="1px solid #ccc"
      borderRadius="md"   >
      <VStack spacing={4} align="stretch">
      <HStack justifyContent="space-between" mt={4}>
        <Select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          width="120px"
        >
          <option value={5}>5 rows</option>
          <option value={10}>10 rows</option>
          <option value={20}>20 rows</option>
        </Select>

        <Select
          value={currentPage}
          onChange={(e) => setCurrentPage(Number(e.target.value))}
          width="120px"
        >
          {Array.from(
            { length: Math.ceil(totalQuestionTypes / rowsPerPage) },
            (_, i) => (
              <option key={i + 1} value={i + 1}>
                Page {i + 1}
              </option>
            )
          )}
        </Select>
      </HStack>

        <Input
          placeholder="Search questionTypes by questionTypeId, questionTypeText"
          value={searchText}
          onChange={handleSearch}
        />

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>QuestionType Id</Th>
              <Th>QuestionType Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody overflowY="auto">
            {filteredQuestionTypes.map((questionType) => (
              <Tr key={questionType.questionTypeId}>
                <Td>{questionType.questionTypeId}</Td>
                <Td>{questionType.questionTypeText}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      colorScheme="blue"
                      onClick={() => handleUpdate(questionType)}
                    >
                      Update
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(questionType.questionTypeId)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {filteredQuestionTypes.length === 0 && <Box>No questionTypes found.</Box>}
      </VStack>
      {selectedQuestionType && (
        <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} size="6xl">
          <ModalOverlay />
          <ModalContent maxW="80%" maxH="90%" w="80%" h="auto" p={4}>
            <ModalHeader display="flex" justifyContent="center">
              Update QuestionType
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowY="auto" >
              <Flex direction="row" justifyContent="space-between" alignItems="flex-start" w="100%" gap={4}>
                <VStack spacing={4} w="100%">
                  <FormControl>
                    <FormLabel>Question Type Text</FormLabel>
                    <Input
                      value={updatedQuestionType.questionTypeText}
                      onChange={(e) => handleFieldChange("questionTypeText", e.target.value)}
                    />
                  </FormControl>
                </VStack>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      
    </Box>
  );
};

export default ListQuestionTypesPage;