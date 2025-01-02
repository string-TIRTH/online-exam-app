import React, { useEffect, useState,useRef } from "react";
import { FaTrash } from "react-icons/fa";
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
  Radio,
  Flex,
  Grid,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { questionApis } from "../../../services/api";

const ListQuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [updatedQuestion, setUpdatedQuestion] = useState({});
  const [deletedOptionList, setDeleteOptionList] = useState([]);
  const [deletedExampleList, setDeletedExampleList] = useState([]);
  const [questionDifficulties, setQuestionDifficulties] = useState([]);
  const [questionCategories, setQuestionCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);
  const toast = useToast();
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

    const fetchQuestions = async () => {
      try {
        const quesitonResponse = await questionApis.getQuestionsList(currentPage, rowsPerPage, searchText);
        const questionAssosicateDataReponse = await questionApis.getQuestionAssosicateData();
        setTotalQuestions(quesitonResponse.data.itemCount);
        setQuestions(quesitonResponse.data.items ?? []);
        setFilteredQuestions(quesitonResponse.data.items ?? []);
        setQuestionCategories(questionAssosicateDataReponse.data.categories)
        setQuestionDifficulties(questionAssosicateDataReponse.data.difficulties)
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
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

  const handleDelete = async (questionId) => {
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
            const response = await questionApis.deleteQuestion(questionId);
            Swal.fire("Deleted!", response.data.message, "success");
            const updatedQuestions = questions.filter((q) => q.questionId !== questionId);
            setQuestions(updatedQuestions);
            setFilteredQuestions(updatedQuestions);
          } catch (error) {
            Swal.fire("failed", error, "error");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("X", "Cancelled", "info");
        }
      });
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleUpdate = (question) => {
    setSelectedQuestion(question);
    setUpdatedQuestion({ ...question });
    setIsUpdateModalOpen(true);
  };

  const handleFieldChange = (field, value, target) => {


    setUpdatedQuestion((prev) => {
      if (field === "category" || field === "difficulty") {
        const selectedIndex = target.options.selectedIndex
        const id = target.options[selectedIndex].id
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [`${field}Text`]: value,
            [`${field}Id`]: id,
          },
        };
      }

      return {
        ...prev,
        [field]: value,
      };
    });
    console.log(updatedQuestion)
  };

  const handleIsCorrectToggle = (index) => {
    setUpdatedQuestion((prev) => {
      const updatedOptions = prev.options.map((option, i) => ({
        ...option,
        isCorrect: i === index,
      }));
      return { ...prev, options: updatedOptions };
    });
  };
  const handleOptionChange = (index, field, value) => {
    setUpdatedQuestion((prev) => {
      const updatedOptions = [...prev.options];
      updatedOptions[index] = { ...updatedOptions[index], [field]: value };
      return { ...prev, options: updatedOptions };
    });
  };

  const handleAddOption = () => {
    const newOption = {
      optionId: "-1",
      optionText: "",
      isCorrect: false,
    };
    setUpdatedQuestion((prev) => ({
      ...prev,
      options: [...prev.options, newOption],
    }));
  };



  const handleDeleteOption = (index) => {
    const updatedOptions = [...updatedQuestion.options];
    const [deletedOption] = updatedOptions.splice(index, 1);
    setDeleteOptionList((prev) => [...prev, deletedOption.optionId]);
    setUpdatedQuestion((prev) => ({ ...prev, options: updatedOptions }));
  };

  const handleExampleChange = (index, field, value) => {
    setUpdatedQuestion((prev) => {
      const updatedExamples = [...prev.examples];
      updatedExamples[index] = {
        ...updatedExamples[index],
        [field]: value,
      };
      return { ...prev, examples: updatedExamples };
    });
  };

  const handleAddExample = () => {
    const newExample = {
      exampleId: "-1",
      inputText: "",
      outputText: "",
    };
    setUpdatedQuestion((prev) => ({
      ...prev,
      examples: [...prev.examples, newExample],
    }));
  };

  const handleDeleteExample = (index) => {
    const updatedExamples = [...updatedQuestion.examples];
    const [deletedExample] = updatedExamples.splice(index, 1);
    setDeletedExampleList((prev) => [...prev, deletedExample.exampleId]);
    setUpdatedQuestion((prev) => ({
      ...prev,
      examples: updatedExamples,
    }));
  };
  const handleSaveChanges = async () => {
    try {
      await questionApis.updateQuestion(updatedQuestion);
      toast({
        title: "Question Updated",
        description: "The question has been updated successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      console.log(deletedOptionList)
      if (updatedQuestion.questionType.questionTypeText === "MCQ") {
        const idList = deletedOptionList.filter((id) => {
          if (id > 0) {
            return id
          }
        })
        if (idList.length !== 0)
          await questionApis.deleteOptions(updatedQuestion.questionId, idList);
      } else if (updatedQuestion.questionType.questionTypeText === "Programming") {

        const idList = deletedExampleList.filter((id) => {
          if (id > 0) {
            return id
          }
        })
        console.log(deletedExampleList)
        if (idList.length !== 0)
          await questionApis.deleteExamples(updatedQuestion.questionId, idList);
      }
      const updatedQuestions = questions.map((q) =>
        q.questionId === updatedQuestion.questionId ? updatedQuestion : q
      );
      setQuestions(updatedQuestions);
      setFilteredQuestions(updatedQuestions);

      setIsUpdateModalOpen(false);
      setDeleteOptionList([]);
      setDeletedExampleList([]);
    } catch (error) {
      console.error("Error updating question:", error);
      setDeleteOptionList([]);
      toast({
        title: "Error",
        description: "Failed to update the question.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxHeight="680px"
      overflowY="auto"
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
              { length: Math.ceil(totalQuestions / rowsPerPage) },
              (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Page {i + 1}
                </option>
              )
            )}
          </Select>
        </HStack>
        <Input
          placeholder="Search questions by questionId, questionText"
          value={searchText}
          onChange={handleSearch}
        />

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Question Id</Th>
              <Th>Question Text</Th>
              <Th>Category</Th>
              <Th>Difficulty</Th>
              <Th>Type</Th>
              <Th>Options/Examples</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredQuestions.map((question) => (
              <Tr key={question.questionId}>
                <Td>{question.questionId}</Td>
                <Td>{question.questionText}</Td>
                <Td>{question.category.categoryText}</Td>
                <Td>{question.difficulty.difficultyText}</Td>
                <Td>{question.questionType.questionTypeText}</Td>
                <Td>
                  {question.questionType.questionTypeText === "MCQ" ? (
                    <VStack align="start">
                      {question.options.map((option) => (
                        <Box
                          key={option.optionId}
                          color={option.isCorrect ? "green.500" : "black"}
                        >
                          {option.optionText}
                        </Box>
                      ))}
                    </VStack>
                  ) : (
                    <VStack align="start">
                      {question.examples.map((example) => (
                        <Box key={example.exampleId}>
                          Input: {example.inputText}, Output: {example.outputText}
                        </Box>
                      ))}
                    </VStack>
                  )}
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      colorScheme="blue"
                      onClick={() => handleUpdate(question)}
                    >
                      Update
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(question.questionId)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {filteredQuestions.length === 0 && <Box>No questions found.</Box>}
      </VStack>


      {selectedQuestion && (
        <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} size="6xl">
          <ModalOverlay />
          <ModalContent maxW="80%" maxH="90%" w="80%" h="auto" p={4}>
            <ModalHeader display="flex" justifyContent="center">
              Update Question
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowY="auto" >
              <Flex direction="row" justifyContent="space-between" alignItems="flex-start" w="100%" gap={4}>
                <VStack spacing={4} w="50%">
                  <FormControl>
                    <FormLabel>Question Text</FormLabel>
                    <Input
                      id="questionText"
                      value={updatedQuestion.questionText}
                      onChange={(e) => handleFieldChange("questionText", e.target.value, e.target.id)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Category</FormLabel>
                    <Select
                      value={updatedQuestion.category.categoryText}
                      onChange={(e) => handleFieldChange("category", e.target.value, e.target)}
                    >
                      {questionCategories.map((category, index) => (
                        <option key={`category${category.categoryId || index}`} value={category.categoryText} id={category.categoryId}>{category.categoryText}</option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Difficulty</FormLabel>
                    <Select
                      value={updatedQuestion.difficulty.difficultyText}
                      onChange={(e) => handleFieldChange("difficulty", e.target.value, e.target)}
                    >
                      {questionDifficulties.map((difficulty, index) => (
                        <option key={`difficulty${difficulty.difficultytId || index}`} id={difficulty.difficultytId} value={difficulty.difficultyText}>{difficulty.difficultyText}</option>
                      ))}
                    </Select>
                  </FormControl>
                </VStack>

                <Box w="50%">
                  {updatedQuestion.questionType.questionTypeText === "MCQ" ? (

                    <Grid templateColumns="repeat(2, 2fr)" gap={6}>
                      {updatedQuestion.options.map((option, index) => (
                        <FormControl key={option.optionId}>
                          <FormLabel>Option {index + 1}</FormLabel>
                          <Input
                            id={option.optionId}
                            value={option.optionText}
                            onChange={(e) => handleOptionChange(index, "optionText", e.target.value)}
                          />
                          <HStack spacing={4} mt={2}>
                            <Radio
                              value={option.optionId.toString()}
                              isChecked={option.isCorrect}
                              onChange={() => handleIsCorrectToggle(index)}
                            >
                              Correct
                            </Radio>
                            <Button
                              colorScheme="red"
                              size="sm"
                              onClick={() => handleDeleteOption(index)}
                            >
                              <FaTrash />
                            </Button>
                          </HStack>
                        </FormControl>
                      ))}
                      <Button gridColumn="span 2" colorScheme="green" onClick={handleAddOption}>
                        Add Option
                      </Button>
                    </Grid>

                  ) : (
                    <VStack spacing={4}>
                      {updatedQuestion.examples.map((example, index) => (
                        <Box key={example.exampleId} w="100%" mb={4}>
                          <FormControl>
                            <FormLabel>Input {index + 1}</FormLabel>
                            <Input
                              value={example.inputText}
                              id={example.exampleId}
                              onChange={(e) =>
                                handleExampleChange(index, "inputText", e.target.value)
                              }
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Output {index + 1}</FormLabel>
                            <Input
                              value={example.outputText}
                              id={example.exampleId}
                              onChange={(e) =>
                                handleExampleChange(index, "outputText", e.target.value)
                              }
                            />
                          </FormControl>
                          <Button
                            colorScheme="red"
                            mt={2}
                            onClick={() => handleDeleteExample(index)}
                          >
                            Delete Example
                          </Button>
                        </Box>
                      ))}

                      <Button
                        colorScheme="blue"
                        mt={4}
                        onClick={handleAddExample}
                      >
                        Add Example
                      </Button>
                    </VStack>
                  )}
                </Box>
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

export default ListQuestionsPage;