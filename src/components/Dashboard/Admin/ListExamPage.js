import React, { useEffect, useState,useRef } from "react";
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
import { examApis } from "../../../services/api";

const ListExamsPage = () => {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedExamQuestion, setSelectedExamQuestion] = useState(null);
  const [isReplaceExamQuestionModeOpen, setIsReplaceExamQuestionModeOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [replacementQuestions, setReplacementQuestions] = useState(null);
  const [isUpdateExamQuestionModalOpen, setIsUpdateExamQuestionModalOpen] = useState(false);
  const [passingCriterias, setPassingCriterias] = useState([]);
  const [selectedPassingCriteria, setSelectedPassingCriteria] = useState({});
  const [selectedExam, setSelectedExam] = useState(null);
  const [updatedExam, setUpdatedExam] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalExams, setTotalExams] = useState(0);
  const [examQuestions, setExamQuestions] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const toast = useToast();

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

    const fetchExams = async () => {
      try {
        const examResponse = await examApis.getExamList(currentPage, rowsPerPage, searchText);
        setTotalExams(examResponse.data.itemCount);
        setExams(examResponse.data.items ?? []);
        setFilteredExams(examResponse.data.items ?? []);
        const passingCriteriaRes = await examApis.getPassingCriteria();
        setPassingCriterias(passingCriteriaRes.data.passingCriterias);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
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

  const handleDelete = async (examId) => {
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
            const response = await examApis.deleteExam(examId);
            Swal.fire("Deleted!", response.data.message, "success");
            const updatedExams = exams.filter((q) => q.examId !== examId);
            setExams(updatedExams);
            setFilteredExams(updatedExams);
          } catch (error) {
            Swal.fire("failed", error, "error");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("X", "Cancelled", "info");
        }
      });
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  const handleUpdateExam = (exam) => {
    setSelectedExam(exam);
    setUpdatedExam({ ...exam });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateExamQuestions = async (exam) => {
    const getExamQuestionRes = await examApis.getExamQuestionByExamId(exam.examId);
    setExamQuestions(getExamQuestionRes.data.items);
    console.log(examQuestions)
    setIsUpdateExamQuestionModalOpen(true);
  };

  const handleReplaceExamQuestion = async (examQuestion) => {
    setSelectedExamQuestion(examQuestion);

    const getReplacementQuestionRes = await examApis.getExamQuestionByCategoryAndQuestionType(examQuestion.question.category.categoryId, examQuestion.question.questionType.questionTypeId, examQuestion.exam.examId);
    setReplacementQuestions(getReplacementQuestionRes.data.items)
    setIsReplaceExamQuestionModeOpen(true);
  };

  const handleReplaceQuestion = async (replaceQuestion) => {
    try{
      await examApis.replaceExamQuestions({
        examId:selectedExamQuestion.exam.examId,
        oldExamQuestionId:selectedExamQuestion.examQuestionId,
        newQuestionId:replaceQuestion.questionId
      });
      toast({
        title: "Question Replaced Successfully",
        description: "The question has been replaced.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      setIsReplaceExamQuestionModeOpen(false);
      setReplacementQuestions(null)
      setIsUpdateExamQuestionModalOpen(false)
      setExamQuestions(null);
    }catch(e){
      setIsReplaceExamQuestionModeOpen(false);
      setReplacementQuestions(null)
      setIsUpdateExamQuestionModalOpen(false)
      setExamQuestions(null);
      toast({
        title: "Unable to Replaced Question",
        description: "failed to replace question",
        status: "failed",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const handleFieldChange = (field, value, target) => {

    setUpdatedExam((prev) => {
      if (field === "passingCriteria") {
        const selectedIndex = target.options.selectedIndex
        const id = target.options[selectedIndex].id
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [`${field}Text`]: value,
            [`${field}Id`]: parseInt(id),
          },
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleSaveChanges = async () => {
    try {
      await examApis.updateExam(updatedExam);
      toast({
        title: "Exam Updated",
        description: "The exam has been updated successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      const updatedExams = exams.map((q) =>
        q.examId === updatedExam.examId ? updatedExam : q
      );
      setExams(updatedExams);
      setFilteredExams(updatedExams);

      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating exam:", error);
      toast({
        title: "Error",
        description: "Failed to update the exam.",
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
              { length: Math.ceil(totalExams / rowsPerPage) },
              (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Page {i + 1}
                </option>
              )
            )}
          </Select>
        </HStack>

        <Input
          placeholder="Search exams by examId, examCode"
          value={searchText}
          onChange={handleSearch}
        />

        <Table variant="simple">
          <Thead>
            <Tr >
              <Th textAlign={"center"}>Exam Id</Th>
              <Th textAlign={"center"}>Exam Code</Th>
              <Th textAlign={"center"}>Exam Date</Th>
              <Th textAlign={"center"}>Exam Start Time</Th>
              <Th textAlign={"center"}>Exam End Time</Th>
              <Th textAlign={"center"}>Exam Duration In Minutes</Th>
              <Th textAlign={"center"}>Passing Criteria</Th>
              <Th textAlign={"center"}>Passing Value</Th>
              <Th textAlign={"center"}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody overflowY="auto">
            {filteredExams.map((exam) => (
              <Tr key={exam.examId}>
                <Td>{exam.examId}</Td>
                <Td>{exam.examCode}</Td>
                <Td>{exam.examDate}</Td>
                <Td>{exam.examStartTime}</Td>
                <Td>{exam.examEndTime}</Td>
                <Td>{exam.examDurationInMinutes}</Td>
                <Td>{exam.passingCriteria.passingCriteriaText}</Td>
                <Td>{exam.passingValue}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      colorScheme="blue"
                      onClick={() => handleUpdateExam(exam)}
                    >
                      Update
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={() => handleUpdateExamQuestions(exam)}
                    >
                      View/Update Exam Questions
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(exam.examId)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {filteredExams.length === 0 && <Box>No exams found.</Box>}
      </VStack>
      {selectedExam && (
        <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} size="6xl">
          <ModalOverlay />
          <ModalContent maxW="80%" maxH="90%" w="80%" h="auto" p={4}>
            <ModalHeader display="flex" justifyContent="center">
              Update Exam
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowY="auto" >
              <Flex direction="row" justifyContent="space-between" alignItems="flex-start" w="100%" gap={4}>
                <VStack spacing={4} w="100%">
                  <FormControl>
                    <FormLabel>Exam Code</FormLabel>
                    <Input
                      value={updatedExam.examCode}
                      onChange={(e) => handleFieldChange("examCode", e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Exam Date</FormLabel>
                    <Input
                      value={updatedExam.examDate}
                      type="date"

                      onChange={(e) => handleFieldChange("examDate", e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Exam Start Time</FormLabel>
                    <Input

                      value={updatedExam.examStartTime}
                      type="time"

                      onChange={(e) => handleFieldChange("examStartTime", e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Exam End Time</FormLabel>
                    <Input
                      value={updatedExam.examEndTime}
                      type="time"

                      onChange={(e) => handleFieldChange("examEndTime", e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Exam Duration In Minutes</FormLabel>
                    <Input
                      value={updatedExam.examDurationInMinutes}
                      type="number"
                      onChange={(e) => handleFieldChange("examDurationInMinutes", e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Passing Criteria</FormLabel>
                    <Select
                      value={updatedExam.passingCriteria.passingCriteriaText}
                      onChange={(e) => handleFieldChange("passingCriteria", e.target.value, e.target)}
                    >
                      {passingCriterias.map((passingCriteria, idx) => (
                        <option key={idx} value={passingCriteria.passingCriteriaText} id={passingCriteria.passingCriteriaId}>
                          {passingCriteria.passingCriteriaText}
                        </option>
                      ))}
                    </Select>

                  </FormControl>
                  <FormControl>
                    <FormLabel>Passing Value</FormLabel>
                    <Input
                      value={updatedExam.passingValue}
                      type="number"

                      onChange={(e) => handleFieldChange("passingValue", e.target.value)}
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
      {examQuestions && (
        <Modal isOpen={isUpdateExamQuestionModalOpen} onClose={() => setIsUpdateExamQuestionModalOpen(false)} size="6xl">
          <ModalOverlay />
          <ModalContent maxW="80%" maxH="90%" w="80%" h="auto" p={4}>
            <ModalHeader display="flex" justifyContent="center">
              Update Exam Questions
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowY="auto" >
              <Flex direction="row" justifyContent="space-between" alignItems="flex-start" w="100%" gap={4}>


                <Table variant="simple">
                  <Thead>
                    <Tr >
                      <Th >Question Id</Th>
                      <Th >Question Text</Th>
                      <Th >Category</Th>
                      <Th >Question Type</Th>
                      <Th textAlign={"center"}>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody overflowY="auto">
                    {examQuestions.map((examQuestion, index) => (
                      <Tr key={examQuestion.examQuestionId}>
                        <Td>{examQuestion.question.questionId}</Td>
                        <Td>{examQuestion.question.questionText}</Td>
                        <Td>{examQuestion.question.category.categoryText}</Td>
                        <Td>{examQuestion.question.questionType.questionTypeText}</Td>
                        <Td>
                          <HStack spacing={2}>
                            <Button
                              colorScheme="blue"
                              onClick={() => handleReplaceExamQuestion(examQuestion)}
                            >
                              Update
                            </Button>
                            {/* <Button
                              colorScheme="red"
                              onClick={() => handleDelete(examQuestion.examQuestionId)}
                            >
                              Delete
                            </Button> */}
                          </HStack>
                        </Td>
                      </Tr>
                    ))}

                  </Tbody>
                </Table>

              </Flex>
            </ModalBody>
            
          </ModalContent>
        </Modal>
      )}

      {replacementQuestions && (
        <Modal isOpen={isReplaceExamQuestionModeOpen} onClose={() => setIsReplaceExamQuestionModeOpen(false)} size="6xl">
          <ModalOverlay />
          <ModalContent maxW="80%" maxH="90%" w="80%" h="auto" p={4}>
            <ModalHeader display="flex" justifyContent="center">
              Replace Exam Questions
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowY="auto" >
              <Flex direction="row" justifyContent="space-between" alignItems="flex-start" w="100%" gap={4}>


                <Table variant="simple">
                  <Thead>
                    <Tr >
                      <Th >Question Id</Th>
                      <Th >Question Text</Th>
                      <Th >Category</Th>
                      <Th >Question Type</Th>
                      <Th textAlign={"center"}>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody overflowY="auto">
                    {replacementQuestions.map((replacementQuestion, index) => (
                      <Tr key={replacementQuestion.questionId}>
                        <Td>{replacementQuestion.questionId}</Td>
                        <Td>{replacementQuestion.questionText}</Td>
                        <Td>{replacementQuestion.category.categoryText}</Td>
                        <Td>{replacementQuestion.questionType.questionTypeText}</Td>
                        <Td>
                          <HStack spacing={2}>
                            <Button
                              colorScheme="blue"
                              onClick={() => handleReplaceQuestion(replacementQuestion)}
                            >
                              Replace
                            </Button>
                           
                          </HStack>
                        </Td>
                      </Tr>
                    ))}

                  </Tbody>
                </Table>

              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default ListExamsPage;