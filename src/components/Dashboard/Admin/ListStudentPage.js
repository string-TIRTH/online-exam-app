import React, { useEffect, useState } from "react";
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
  RadioGroup,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { getStudentList,updateStudent } from "../../../services/api";

const ListStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [updatedStudent, setUpdatedStudent] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalStudents,setTotalStudents] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);
  const toast = useToast();

  useEffect(() => {

    const fetchStudents = async () => {
      try {
        const studentResponse = await getStudentList(currentPage, rowsPerPage, searchText);
        setTotalStudents(studentResponse.data.itemCount);
        setStudents(studentResponse.data.items);
        setFilteredStudents(studentResponse.data.items);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [currentPage,rowsPerPage,searchText]);

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

  const handleDelete = async (userId) => {
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
            // const response = await deleteStudent(userId);
            const response = {};
            Swal.fire("Deleted!",response.data.message, "success");
            const updatedStudents = students.filter((q) => q.userId !== userId);
            setStudents(updatedStudents);
            setFilteredStudents(updatedStudents);
          } catch (error) {
            Swal.fire("failed", error, "error");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("X", "Cancelled", "info");
        }
      });
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleUpdate = (student) => {
    setSelectedStudent(student);
    setUpdatedStudent({ ...student });
    setIsUpdateModalOpen(true);
  };

  const handleFieldChange = (field, value) => {


    setUpdatedStudent((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
    console.log(updatedStudent)
  };

  const handleSaveChanges = async () => {
    try {
      await updateStudent(updatedStudent);
      toast({
        title: "Student Updated",
        description: "The student has been updated successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      const updatedStudents = students.map((q) =>
        q.userId === updatedStudent.userId ? updatedStudent : q
      );
      setStudents(updatedStudents);
      setFilteredStudents(updatedStudents);

      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating student:", error);
      toast({
        title: "Error",
        description: "Failed to update the student.",
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
        <Input
          placeholder="Search students by userId, mobile number, email, full name"
          value={searchText}
          onChange={handleSearch}
        />

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Student Id</Th>
              <Th>Full Name</Th>
              <Th>Email</Th>
              <Th>Mobile Number</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredStudents.map((student) => (
              <Tr key={student.userId}>
                <Td>{student.userId}</Td>
                <Td>{student.fullName}</Td>
                <Td>{student.email}</Td>
                <Td>{student.mobileNumber}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      colorScheme="blue"
                      onClick={() => handleUpdate(student)}
                    >
                      Update
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(student.userId)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {filteredStudents.length === 0 && <Box>No students found.</Box>}
      </VStack>
      {selectedStudent && (
        <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} size="6xl">
          <ModalOverlay />
          <ModalContent maxW="80%" maxH="90%" w="80%" h="auto" p={4}>
            <ModalHeader display="flex" justifyContent="center">
              Update Student
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowY="auto" >
              <Flex direction="row" justifyContent="space-between" alignItems="flex-start" w="100%" gap={4}>
                <VStack spacing={4} w="100%">
                  <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      value={updatedStudent.fullName}
                      onChange={(e) => handleFieldChange("fullName", e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      value={updatedStudent.email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Mobile Number</FormLabel>
                    <Input
                      value={updatedStudent.mobileNumber}
                      onChange={(e) => handleFieldChange("mobileNumber", e.target.value)}
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
      { length: Math.ceil(totalStudents/ rowsPerPage) },
      (_, i) => (
        <option key={i + 1} value={i + 1}>
          Page {i + 1}
        </option>
      )
    )}
  </Select>
</HStack>

    </Box>
  );
};

export default ListStudentsPage;