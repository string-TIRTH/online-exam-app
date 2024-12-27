import React, { useEffect, useState } from "react";
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
    VStack,
    HStack,
    Select,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalHeader,
    Flex,
    ModalCloseButton
} from "@chakra-ui/react";
import { examApis } from "../../../services/api";

import MonacoEditor from "@monaco-editor/react";

const ListProSubmission = (data) => {
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalResults, setTotalResults] = useState(0);
    const [timeoutId, setTimeoutId] = useState(null);
    const [submittedCode, setSubmittedCode] = useState("");
    const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
    const [programmingSubmissionId, setProgrammingSubmissionId] = useState("");
    useEffect(() => {
        const fetchResults = async () => {
            try {
                const resultResponse = await examApis.getProSubmissions(data.examSubmissionId, currentPage, rowsPerPage, searchText);
                setTotalResults(resultResponse.data.itemCount);
                setFilteredResults(resultResponse.data.items ?? []);
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        };
        fetchResults();
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

    const handleViewCode = (proSubmissionId, code) => {
        setSubmittedCode(code);
        setProgrammingSubmissionId(proSubmissionId);
        setIsCodeModalOpen(true);
    };

    const handleCodeReview = async (isCorrect) => {
        try {
            await examApis.submitCodeReview(programmingSubmissionId,isCorrect);
            setIsCodeModalOpen(false);
            const updatedResults = filteredResults.map(result => {
                if (result.questionSubmissionId === programmingSubmissionId) {
                  result.isCorrect = isCorrect===true?1:0; 
                }
                return result;
              });
            setFilteredResults(updatedResults);

        } catch (error) {
            console.error("Error submitting code:", error);
        }
    }
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
                            { length: Math.ceil(totalResults / rowsPerPage) },
                            (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    Page {i + 1}
                                </option>
                            )
                        )}
                    </Select>
                </HStack>
                <Input
                    placeholder="Search submissions by questionSubmissionId"
                    value={searchText}
                    onChange={handleSearch}
                />

                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Question Submission Id</Th>
                            <Th>Question Text</Th>
                            <Th>Is Correct</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredResults.map((result) => (

                            <Tr key={result.questionSubmissionId}>
                                <Td>{result.questionSubmissionId}</Td>
                                <Td>{result.questionText}</Td>
                                <Td color={result.isCorrect === -1 ? "yellow.400" : result.isCorrect === 1 ? "green.500" : "red.500"} >{result.isCorrect === -1 ? "Not Reviewed" : result.isCorrect === 1 ? "Correct" : "Incorrect"}</Td>
                                <Td justifyItems={"center"}>
                                    <HStack spacing={2}>
                                        <Button
                                            colorScheme="blue"
                                            onClick={() => handleViewCode(result.questionSubmissionId, result.submittedCode)}
                                        >
                                            Review Code
                                        </Button>
                                    </HStack>
                                </Td>
                            </Tr>

                        ))}
                    </Tbody>
                </Table>
                {filteredResults.length === 0 && <Box>No results found.</Box>}
            </VStack>
            {submittedCode && (
                <Modal isOpen={isCodeModalOpen} onClose={() => setIsCodeModalOpen(false)} size="6xl">
                    <ModalOverlay />
                    <ModalContent maxW="80%" maxH="90%" w="80%" h="auto" p={4}>
                        <ModalHeader display="flex" justifyContent="center">
                            Review Code
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody overflowY="auto" >
                            <Flex direction="column" justifyContent="space-between" alignItems="flex-start" w="100%" gap={4}>
                                <MonacoEditor
                                    height="600px"
                                    language="javascript"
                                    theme="vs-dark"
                                    value={submittedCode}
                                    options={{
                                        readOnly: true,
                                    }}
                                />
                                <HStack spacing={2}>
                                <Button
                                    colorScheme="green"
                                    onClick = {() => handleCodeReview(true)}
                                >
                                    Correct
                                </Button>
                                <Button
                                    colorScheme="red"
                                    onClick = {() => handleCodeReview(false)}
                                >
                                    Incorrect
                                </Button>
                                </HStack>
                            </Flex>
                        </ModalBody>

                    </ModalContent>
                </Modal>
            )}
        </Box>
    );
};

export default ListProSubmission;