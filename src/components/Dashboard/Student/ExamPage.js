import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
  Input,
  FormControl,
  FormLabel
} from "@chakra-ui/react";
import MonacoEditor from "@monaco-editor/react";
import { examApis } from "../../../services/api";
import PreventCopyPaste from "./PreventCopyPaste";
import Swal from "sweetalert2";

const ExamPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submittedCode, setSubmittedCode] = useState({});
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [programmingQuestions, setProgrammingQuestions] = useState([]);
  const [currentSection, setCurrentSection] = useState("MCQ");
  const [examSubmissionId,setExamSubmissionId] = useState(null);
  const [examCode,setExamCode] = useState("");
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const getExamQuestionRes = await examApis.getExamQuestionsForExam(examCode);
        const questions = getExamQuestionRes.data.questions || {};
        setMcqQuestions(questions.questionsMCQ || []);
        setProgrammingQuestions(questions.questionsPro || []);
        setTimeRemaining(getExamQuestionRes.data.remainingTime * 60);
        setTotalTime(getExamQuestionRes.data.totalTime * 60);
        setExamSubmissionId(getExamQuestionRes.data.examSubmissionId);
        const initialCode = {};
        const initialSelectedOptions = {};
        (questions.questionsMCQ || []).forEach((question, index) => {
          const selectedOption = question.options.find(
            (option) => option.selected === true
          );
          if (selectedOption) {
            initialSelectedOptions[index] = selectedOption.optionId;
          }
        });
        (questions.questionsPro || []).forEach((question, index) => {
          initialCode[index] = question.submittedCode??"";
        });
        setSelectedOptions(initialSelectedOptions);
        setSubmittedCode(initialCode);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    (isExamStarted && fetchQuestions());
  }, [isExamStarted]);

  useEffect(() => {
    if (isExamStarted) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
              examApis.submitExam(examSubmissionId).then(()=>{
                Swal.fire("Submitted!", "Your exam has been submitted.", "success");
                setIsExamStarted(false); 
              });
            setIsExamStarted(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isExamStarted]);

  const handleEditorChange = (value) => {
    setSubmittedCode({
      ...submittedCode,
      [currentQuestionIndex]: value,
    });
  };

  const handleMapNavigation = (index) => {
    setCurrentQuestionIndex(index);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleOptionSelect = async (optionId) => {
    await examApis.submitQuestionOption(
      mcqQuestions[currentQuestionIndex].questionSubmissionId,
      optionId,
      1
    );
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionIndex]: parseInt(optionId),
    });
  };

const handleNavigation = async (direction) => {
  if (direction === "next" || direction === "prev") {
    const questions = currentSection === "MCQ" ? mcqQuestions : programmingQuestions;

    const nextIndex = direction === "next" ? Math.min(currentQuestionIndex + 1, questions.length - 1): Math.max(currentQuestionIndex - 1, 0);

    setCurrentQuestionIndex(nextIndex)
    console.log(submittedCode[currentQuestionIndex]);
    if(currentSection === "Programming"){
      await examApis.submitProgrammingQuestion(programmingQuestions[currentQuestionIndex].programmingSubmissionId,submittedCode[currentQuestionIndex]);
    }
  } else if (direction === "submit" && currentSection === "MCQ") {
    setCurrentSection("Programming");
    setCurrentQuestionIndex(0); 
  } else if (direction === "submit" && currentSection === "Programming") {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to submit your exam. Do you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, submit",
      cancelButtonText: "No, go back",
    }).then( async (result) => {
      if (result.isConfirmed) {
        await examApis.submitProgrammingQuestion(programmingQuestions[currentQuestionIndex].programmingSubmissionId,submittedCode[currentQuestionIndex]).then(async()=>{
          await examApis.submitExam(examSubmissionId).then(()=>{
            Swal.fire("Submitted!", "Your exam has been submitted.", "success");
            setIsExamStarted(false); 
          });
        })
        
      } else {
        console.log("Exam submission cancelled.");
      }
    });
  }
};
const handleExamCodeChange = (e) => {
  console.log(e); // Inspect the event object
  const value = e?.target?.value || ""; 
  console.log("Value:", value); // Check the value
  setExamCode(value);
}

const handleSubmitExamCode = () =>{
  Swal.fire({
    title: "Instructions",
    html: `
      <ul style="text-align: left;">
        <li>Ensure your system meets the technical requirements.</li>
        <li>Sit in a quiet and well-lit space with no distractions.</li>
        <li>There are 2 section. MCQ section followed by Programming section</li>
        <li>Do not refresh the page or switch tabs during the exam.</li>
        <li>violating given instructions will result into exam termination</li>
        <li>Submit your answers before the timer ends.</li>
      </ul>
    `,
    icon: "info",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Start Exam",
  }).then((result) => {
    if (result.isConfirmed) {
      setIsExamStarted(true)
      console.log("Exam started");
    } else if (result.isDismissed) {
      console.log("Exam canceled");
    }
  });
  
}
  const questionsToDisplay =
    currentSection === "MCQ" ? mcqQuestions : programmingQuestions;

  return (
    <div>
      {isExamStarted ? (
        questionsToDisplay.length > 0 ? (
          <Box
            p={6}
          >
            <Grid templateColumns="3fr 1fr" gap={6}>
              <Box borderWidth="1px" borderRadius="lg" p={6} shadow="md">
                <VStack spacing={4} align="stretch">
                  <Text fontSize="lg" fontWeight="bold">
                    Question {currentQuestionIndex + 1} of{" "}
                    {questionsToDisplay.length}
                  </Text>
                  <PreventCopyPaste>
                  <Text>
                    {questionsToDisplay[currentQuestionIndex]?.questionText}
                  </Text>
                  </PreventCopyPaste>
                  {currentSection === "MCQ" ? (
                    <PreventCopyPaste>
                    <RadioGroup
                      value={selectedOptions[currentQuestionIndex] || ""}
                      onChange={handleOptionSelect}
                    >
                      <Stack spacing={3}>
                        {questionsToDisplay[currentQuestionIndex]?.options.map(
                          (option) => (
                            <Radio
                              key={option.optionId}
                              value={option.optionId}
                            >
                              {option.optionText}
                            </Radio>
                          )
                        )}
                      </Stack>
                    </RadioGroup>
                    </PreventCopyPaste>
                  ) : (
                    <Stack spacing={3} >
                      <PreventCopyPaste>
                      {questionsToDisplay[currentQuestionIndex]?.examples.map(
                        (example, index) => (
                          <Box key={example.exampleId} >
                            <Text>Example {index + 1}</Text>
                            <Text>Input: {example.inputText}</Text>
                            <Text>Output: {example.outputText}</Text>
                          </Box>
                        )
                      )}
                        </PreventCopyPaste>
                      <Box border="1px" borderColor="gray.300" p={3}>
                        <Text fontSize="lg" fontWeight="bold" mb={2}>
                          Write Your Code:
                        </Text>
                        <MonacoEditor
                          height="400px"
                          language="javascript"
                          value={submittedCode[currentQuestionIndex]}
                          onChange={handleEditorChange}
                          theme="vs-light"
                          options={{
                            readOnly: false,
                            contextmenu: true, 
                          }}
                        />
                      </Box>
                    </Stack>
                  )}

                  <HStack justify="space-between" mt={4}>
                    <Button
                      colorScheme="blue"
                      onClick={() => handleNavigation("prev")}
                      isDisabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={() => handleNavigation(currentQuestionIndex!==questionsToDisplay.length-1?"next":"submit")}
                    >
                      {currentQuestionIndex!==questionsToDisplay.length-1?"Next":"Submit"}
                    </Button>
                  </HStack>
                </VStack>
              </Box>

              <VStack spacing={4} align="stretch">
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  p={5}
                  shadow="md"
                  fontWeight="bold"
                >
                  <Text
                    fontSize="2xl"
                    color={
                      timeRemaining / totalTime > 0.1 ? "green.500" : "red.500"
                    }
                    textAlign={"center"}
                    borderRadius={"lg"}
                    backgroundColor={
                      timeRemaining < 60 ? "yellow.300" : "whiteAlpha.200"
                    }
                  >
                    <span style={{ color: "black" }}>Time Remaining - </span>
                    {formatTime(timeRemaining)}
                  </Text>
                </Box>

                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  p={2}
                  shadow="md"
                  fontWeight="bold"
                  cursor="pointer"
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setCurrentSection("MCQ");
                  }}
                  bg={currentSection === "MCQ" ? "blue.300" : "white"}
                >
                  <Text fontSize="1xl" ml={"10%"} borderRadius={"lg"}>
                    Section 1 : MCQ
                  </Text>
                </Box>

                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  p={2}
                  shadow="md"
                  fontWeight="bold"
                  cursor="pointer"
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setCurrentSection("Programming");
                  }}
                  bg={currentSection === "Programming" ? "blue.300" : "white"}
                >
                  <Text fontSize="1xl" ml={"10%"} borderRadius={"lg"}>
                    Section 2 : Programming
                  </Text>
                </Box>

                <Box borderWidth="1px" borderRadius="lg" p={4} shadow="md">
                  <Text fontSize="lg" fontWeight="bold" mb={4}>
                    Question Map
                  </Text>
                  <Grid templateColumns="repeat(10, 1fr)" gap={1}>
                    {questionsToDisplay.map((question, index) => {
                      const isAnswered = selectedOptions[index];
                      const isCurrent = index === currentQuestionIndex;
                      return (
                        <Box
                          key={index}
                          w={7}
                          h={7}
                          borderRadius="md"
                          bg={
                            isCurrent
                              ? "blue.500"
                              : isAnswered
                              ? "green.500"
                              : "gray.300"
                          }
                          cursor="pointer"
                          onClick={() => handleMapNavigation(index)}
                          border={isCurrent ? "2px solid black" : "none"}
                        >
                          <Text
                            style={{ fontSize: "17px" }}
                            verticalAlign={"center"}
                            textAlign={"center"}
                          >
                            {index + 1}
                          </Text>
                        </Box>
                      );
                    })}
                  </Grid>
                </Box>
              </VStack>
            </Grid>
          </Box>
        ) : (
          <Text textAlign="center" fontSize="2xl" mt={10}>
            Loading Questions...
          </Text>
        )
      ) : (
         <Box
          p={5}
          justifyItems={"right"}
         >
         <FormControl key= "examCode" isRequired={true} mb={5}>
          <FormLabel htmlFor="examCode">Enter Exam Code</FormLabel>
          
            <Input
              id="examCodeInput"
              name="examCodeInput"
              value={examCode}
              onChange={handleExamCodeChange}
              autoComplete="off"
              placeholder={`Enter Exam Code`}
            />
          
        </FormControl>
        <Button
          onClick={handleSubmitExamCode}
        >
            Submit Code
        </Button>
        </Box>
      )}
    </div>
  );
};

export default ExamPage;
