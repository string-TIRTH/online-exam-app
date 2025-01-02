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
    Select,
} from "@chakra-ui/react";
import { examApis } from "../../../services/api";
import ListExamSubmission from "./ListExamSubmission";

const ListResultsPage = () => {
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalResults, setTotalResults] = useState(0);
    const [timeoutId, setTimeoutId] = useState(null);
    const [examId,setExamId] = useState("");
    const [isExamResultSelected,setIsExamResultSelected] = useState(false);
    const isMounted = useRef(false);
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
        const fetchResults = async () => {
            try {
                const resultResponse = await examApis.getExamResultDetails(currentPage, rowsPerPage, searchText);
                setTotalResults(resultResponse.data.itemCount);
                setFilteredResults(resultResponse.data.items ?? []);
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        };
        fetchResults();
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

    const handleViewResult = (examId) => {
        console.log("examId",examId);
        setIsExamResultSelected(true);
        setExamId(examId);

    };


    return (
        <div>
        {isExamResultSelected && <Button
            colorScheme="blue"
            mb={5}
            onClick={() => setIsExamResultSelected(false)}
            >
            Back
        </Button>
    }
        {isExamResultSelected?(<ListExamSubmission examId={examId} />):(
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
                    placeholder="Search exams by examId, examCodE"
                    value={searchText}
                    onChange={handleSearch}
                />

                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Exam Id</Th>
                            <Th>Exam Code</Th>
                            <Th>Exam Date</Th>
                            <Th>Qualified Students</Th>
                            <Th>Total Students</Th>
                            <Th>Result</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredResults.map((result) => (
                            <Tr key={result.examId}>
                                <Td>{result.examId}</Td>
                                <Td>{result.examCode}</Td>
                                <Td>{result.examDate}</Td>
                                <Td>{result.qualifiedStudents}</Td>
                                <Td>{result.totalStudents}</Td>
                                <Td>
                                    <HStack spacing={2}>
                                    <Button
                                        colorScheme="blue"
                                        onClick={() => handleViewResult(result.examId)}
                                    >
                                        View/Generate Result
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
        )}
        </div>
    );
};

export default ListResultsPage;