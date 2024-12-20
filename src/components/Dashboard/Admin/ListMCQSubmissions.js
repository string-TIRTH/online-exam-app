import React, { useEffect, useState } from "react";
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
    Select,
} from "@chakra-ui/react";
import { examApis } from "../../../services/api";

const ListMCQSubmission = (data) => {
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalResults, setTotalResults] = useState(0);
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const resultResponse = await examApis.getMCQSubmissions(data.examId,currentPage, rowsPerPage, searchText);
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
                    placeholder="Search exams by examSubmissionId"
                    value={searchText}
                    onChange={handleSearch}
                />

                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Question Submission Id</Th>
                            <Th>Question Id</Th>
                            <Th>Question Text</Th>
                            <Th>Selected Option</Th>
                            <Th>Is Correct</Th>
                            <Th textAlign={"center"}>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredResults.map((result) => (
                            
                            <Tr key={result.examSubmissionId}>
                                <Td>{result.examSubmissionId}</Td>
                                <Td>{result.studentName}</Td>
                                <Td>{result.studentEmail}</Td>
                                <Td>{result.scoredMarks}</Td>
                                <Td>{result.completedInMinutes}</Td>
                                <Td justifyItems={"center"}>
                                    <HStack spacing={2}>
                                        <Button
                                            colorScheme="blue"
                                        >
                                            View Submissions
                                        </Button>
                                    </HStack>
                                </Td>
                            </Tr>
                            
                        ))}
                    </Tbody>
                </Table>
                {filteredResults.length === 0 && <Box>No results found.</Box>}
            </VStack>

        </Box>
    );
};

export default ListMCQSubmission;