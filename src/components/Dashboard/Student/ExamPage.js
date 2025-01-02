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
} from "@chakra-ui/react";
import MonacoEditor from "@monaco-editor/react";
import { examApis } from "../../../services/api";
import PreventCopyPaste from "./PreventCopyPaste";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import ExamTimer from "./ExamTimer";

const ExamPage = () => {
    const location = useLocation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [submittedCode, setSubmittedCode] = useState({});
    const [isExamStarted, setIsExamStarted] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [mcqQuestions, setMcqQuestions] = useState([]);
    const [programmingQuestions, setProgrammingQuestions] = useState([]);
    const [currentSection, setCurrentSection] = useState("MCQ");
    const [examSubmissionId, setExamSubmissionId] = useState(null);
    const [examCode, setExamCode] = useState(location.state.examCode);
    useEffect(() => {
        const enableFullscreen = async () => {
            if (document.fullscreenElement === null) {
                try {
                    await document.documentElement.requestFullscreen();
                } catch (error) {
                    console.error("Failed to enable fullscreen mode:", error);
                }
            }
        };
        enableFullscreen();
        const fetchQuestions = async () => {
            try {
                const getExamQuestionRes = await examApis.getExamQuestionsForExam(examCode);
                const status = getExamQuestionRes.data.status;
                const code = getExamQuestionRes.data.code;
                console.log(getExamQuestionRes.code);
                switch (code) {
                    case 1:
                        break;
                    case 2:
                        Swal.fire(status, "Exam Finished", "info");
                        setIsExamStarted(false);
                        break;
                    case 3:
                        Swal.fire(status, "Exam Already Submitted", "info");
                        setIsExamStarted(false);
                        break;
                    case 4:
                        Swal.fire(status, "Some Thing Went Wrong", "error");
                        setIsExamStarted(false);
                        break;
                    case 5:
                        Swal.fire(status, "Server Error", "error");
                        setIsExamStarted(false);
                        break;
                }
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
                    initialCode[index] = question.submittedCode ?? "";
                });
                setSelectedOptions(initialSelectedOptions);
                setSubmittedCode(initialCode);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        (isExamStarted && fetchQuestions());
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

            const nextIndex = direction === "next" ? Math.min(currentQuestionIndex + 1, questions.length - 1) : Math.max(currentQuestionIndex - 1, 0);

            setCurrentQuestionIndex(nextIndex)
            if (currentSection === "Programming") {
                await examApis.submitProgrammingQuestion(programmingQuestions[currentQuestionIndex].programmingSubmissionId, submittedCode[currentQuestionIndex]);
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
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await examApis.submitProgrammingQuestion(programmingQuestions[currentQuestionIndex].programmingSubmissionId, submittedCode[currentQuestionIndex]).then(async () => {
                        await examApis.submitExam(examSubmissionId).then(() => {
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
    const questionsToDisplay =
        currentSection === "MCQ" ? mcqQuestions : programmingQuestions;

    return (
        <div
        style={{
          padding: "20px",
          border: "10px solid gray.500",
          height: "calc(100vh )",
          width: "calc(100vw )", 
          boxSizing: "border-box",
        }}
      >
            {(isExamStarted && questionsToDisplay.length > 0) ? (<Box
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
                                    onClick={() => handleNavigation(currentQuestionIndex !== questionsToDisplay.length - 1 ? "next" : "submit")}
                                >
                                    {currentQuestionIndex !== questionsToDisplay.length - 1 ? "Next" : "Submit"}
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
                            <ExamTimer
                                isExamStarted={isExamStarted}
                                timeRemaining={timeRemaining}
                                totalTime={totalTime}
                                examSubmissionId={examSubmissionId}
                            />
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
            )}
        </div>
    );
};

export default ExamPage;
