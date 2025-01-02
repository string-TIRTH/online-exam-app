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
import { questionApis } from "../../../services/api";

const ListDifficultiesPage = () => {
  const [difficulties, setDifficulties] = useState([]);
  const [filteredDifficulties, setFilteredDifficulties] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [updatedDifficulty, setUpdatedDifficulty] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalDifficulties,setTotalDifficulties] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);
  const toast = useToast();

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

    const fetchDifficulties = async () => {
      try {
        const difficultyResponse = await questionApis.getDifficultyList(currentPage, rowsPerPage, searchText);
        setTotalDifficulties(difficultyResponse.data.itemCount);
        setDifficulties(difficultyResponse.data.items??[]);
        setFilteredDifficulties(difficultyResponse.data.items??[]);
      } catch (error) {
        console.error("Error fetching difficulties:", error);
      }
    };

    fetchDifficulties();
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

  const handleDelete = async (difficultyId) => {
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
            const response = await questionApis.deleteDifficulty(difficultyId);
            Swal.fire("Deleted!",response.data.message, "success");
            const updatedDifficulties = difficulties.filter((q) => q.difficultyId !== difficultyId);
            setDifficulties(updatedDifficulties);
            setFilteredDifficulties(updatedDifficulties);
          } catch (error) {
            Swal.fire("failed", error, "error");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("X", "Cancelled", "info");
        }
      });
    } catch (error) {
      console.error("Error deleting difficulty:", error);
    }
  };

  const handleUpdate = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setUpdatedDifficulty({ ...difficulty });
    setIsUpdateModalOpen(true);
  };

  const handleFieldChange = (field, value) => {


    setUpdatedDifficulty((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
    console.log(updatedDifficulty)
  };

  const handleSaveChanges = async () => {
    try {
      await questionApis.updateDifficulty(updatedDifficulty);
      toast({
        title: "Difficulty Updated",
        description: "The difficulty has been updated successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      const updatedDifficulties = difficulties.map((q) =>
        q.difficultyId === updatedDifficulty.difficultyId ? updatedDifficulty : q
      );
      setDifficulties(updatedDifficulties);
      setFilteredDifficulties(updatedDifficulties);

      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating difficulty:", error);
      toast({
        title: "Error",
        description: "Failed to update the difficulty.",
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
      { length: Math.ceil(totalDifficulties/ rowsPerPage) },
      (_, i) => (
        <option key={i + 1} value={i + 1}>
          Page {i + 1}
        </option>
      )
    )}
  </Select>
</HStack>
        <Input
          placeholder="Search difficulties by difficultyId, difficultyText"
          value={searchText}
          onChange={handleSearch}
        />

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Difficulty Id</Th>
              <Th>Difficulty Name</Th>
              <Th>Difficulty Weight</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredDifficulties.map((difficulty) => (
              <Tr key={difficulty.difficultyId}>
                <Td>{difficulty.difficultyId}</Td>
                <Td>{difficulty.difficultyText}</Td>
                <Td>{difficulty.difficultyWeight}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      colorScheme="blue"
                      onClick={() => handleUpdate(difficulty)}
                    >
                      Update
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(difficulty.difficultyId)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {filteredDifficulties.length === 0 && <Box>No difficulties found.</Box>}
      </VStack>
      {selectedDifficulty && (
        <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} size="6xl">
          <ModalOverlay />
          <ModalContent maxW="80%" maxH="90%" w="80%" h="auto" p={4}>
            <ModalHeader display="flex" justifyContent="center">
              Update Difficulty
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowY="auto" >
              <Flex direction="row" justifyContent="space-between" alignItems="flex-start" w="100%" gap={4}>
                <VStack spacing={4} w="100%">
                  <FormControl>
                    <FormLabel>Difficulty Text</FormLabel>
                    <Input
                      value={updatedDifficulty.difficultyText}
                      onChange={(e) => handleFieldChange("difficultyText", e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Difficulty Weight</FormLabel>
                    <Input
                      value={updatedDifficulty.difficultyWeight}
                      onChange={(e) => handleFieldChange("difficultyWeight", e.target.value)}
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

export default ListDifficultiesPage;