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
import { userApis } from "../../../services/api";

const ListExaminersPage = () => {
  const [examiners, setExaminers] = useState([]);
  const [filteredExaminers, setFilteredExaminers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedExaminer, setSelectedExaminer] = useState(null);
  const [updatedExaminer, setUpdatedExaminer] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalExaminers,setTotalExaminers] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);
  const toast = useToast();

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

    const fetchExaminers = async () => {
      try {
        const examinerResponse = await userApis.getExaminerList(currentPage, rowsPerPage, searchText);
        setTotalExaminers(examinerResponse.data.itemCount);
        setExaminers(examinerResponse.data.items??[]);
        setFilteredExaminers(examinerResponse.data.items??[]);
      } catch (error) {
        console.error("Error fetching examiners:", error);
      }
    };

    fetchExaminers();
  }
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
            // const response = await userApis.deleteExaminer(userId);
            const response = {};
            Swal.fire("Deleted!",response.data.message, "success");
            const updatedExaminers = examiners.filter((q) => q.userId !== userId);
            setExaminers(updatedExaminers);
            setFilteredExaminers(updatedExaminers);
          } catch (error) {
            Swal.fire("failed", error, "error");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("X", "Cancelled", "info");
        }
      });
    } catch (error) {
      console.error("Error deleting examiner:", error);
    }
  };

  const handleUpdate = (examiner) => {
    setSelectedExaminer(examiner);
    setUpdatedExaminer({ ...examiner });
    setIsUpdateModalOpen(true);
  };

  const handleFieldChange = (field, value) => {


    setUpdatedExaminer((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
    console.log(updatedExaminer)
  };

  const handleSaveChanges = async () => {
    try {
      await userApis.updateExaminer({user:updatedExaminer});
      toast({
        title: "Examiner Updated",
        description: "The examiner has been updated successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      const updatedExaminers = examiners.map((q) =>
        q.userId === updatedExaminer.userId ? updatedExaminer : q
      );
      setExaminers(updatedExaminers);
      setFilteredExaminers(updatedExaminers);

      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating examiner:", error);
      toast({
        title: "Error",
        description: "Failed to update the examiner.",
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
      { length: Math.ceil(totalExaminers/ rowsPerPage) },
      (_, i) => (
        <option key={i + 1} value={i + 1}>
          Page {i + 1}
        </option>
      )
    )}
  </Select>
</HStack>
        <Input
          placeholder="Search examiners by userId, mobile number, email, full name"
          value={searchText}
          onChange={handleSearch}
        />

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Examiner Id</Th>
              <Th>Full Name</Th>
              <Th>Email</Th>
              <Th>Mobile Number</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredExaminers.map((examiner) => (
              <Tr key={examiner.userId}>
                <Td>{examiner.userId}</Td>
                <Td>{examiner.fullName}</Td>
                <Td>{examiner.email}</Td>
                <Td>{examiner.mobileNumber}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      colorScheme="blue"
                      onClick={() => handleUpdate(examiner)}
                    >
                      Update
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(examiner.userId)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {filteredExaminers.length === 0 && <Box>No examiners found.</Box>}
      </VStack>
      {selectedExaminer && (
        <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} size="6xl">
          <ModalOverlay />
          <ModalContent maxW="80%" maxH="90%" w="80%" h="auto" p={4}>
            <ModalHeader display="flex" justifyContent="center">
              Update Examiner
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowY="auto" >
              <Flex direction="row" justifyContent="space-between" alignItems="flex-start" w="100%" gap={4}>
                <VStack spacing={4} w="100%">
                  <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      value={updatedExaminer.fullName}
                      onChange={(e) => handleFieldChange("fullName", e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      value={updatedExaminer.email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Mobile Number</FormLabel>
                    <Input
                      value={updatedExaminer.mobileNumber}
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
    </Box>
  );
};

export default ListExaminersPage;