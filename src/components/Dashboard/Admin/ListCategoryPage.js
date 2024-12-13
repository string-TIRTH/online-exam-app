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

const ListCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedCategory, setUpdatedCategory] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCategories,setTotalCategories] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);
  const toast = useToast();

  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const categoryResponse = await questionApis.getCategoryList(currentPage, rowsPerPage, searchText);
        setTotalCategories(categoryResponse.data.itemCount);
        setCategories(categoryResponse.data.items??[]);
        setFilteredCategories(categoryResponse.data.items??[]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
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

  const handleDelete = async (categoryId) => {
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
            const response = await questionApis.deleteCategory(categoryId);
            Swal.fire("Deleted!",response.data.message, "success");
            const updatedCategories = categories.filter((q) => q.categoryId !== categoryId);
            setCategories(updatedCategories);
            setFilteredCategories(updatedCategories);
          } catch (error) {
            Swal.fire("failed", error, "error");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("X", "Cancelled", "info");
        }
      });
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleUpdate = (category) => {
    console.log(category)
    setSelectedCategory(category);
    setUpdatedCategory({ ...category });
    setIsUpdateModalOpen(true);
  };

  const handleFieldChange = (field, value) => {


    setUpdatedCategory((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
    console.log(updatedCategory)
  };

  const handleSaveChanges = async () => {
    try {
      await questionApis.updateCategory(updatedCategory);
      toast({
        title: "Category Updated",
        description: "The category has been updated successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      const updatedCategories = categories.map((q) =>
        q.categoryId === updatedCategory.categoryId ? updatedCategory : q
      );
      setCategories(updatedCategories);
      setFilteredCategories(updatedCategories);

      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating category:", error);
      toast({
        title: "Error",
        description: "Failed to update the category.",
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
      { length: Math.ceil(totalCategories/ rowsPerPage) },
      (_, i) => (
        <option key={i + 1} value={i + 1}>
          Page {i + 1}
        </option>
      )
    )}
  </Select>
</HStack>
        <Input
          placeholder="Search categories by categoryId, categoryText"
          value={searchText}
          onChange={handleSearch}
        />

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Category Id</Th>
              <Th>Category Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredCategories.map((category) => (
              <Tr key={category.categoryId}>
                <Td>{category.categoryId}</Td>
                <Td>{category.categoryText}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      colorScheme="blue"
                      onClick={() => handleUpdate(category)}
                    >
                      Update
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(category.categoryId)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {filteredCategories.length === 0 && <Box>No categories found.</Box>}
      </VStack>
      {selectedCategory && (
        <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} size="6xl">
          <ModalOverlay />
          <ModalContent maxW="80%" maxH="90%" w="80%" h="auto" p={4}>
            <ModalHeader display="flex" justifyContent="center">
              Update Category
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowY="auto" >
              <Flex direction="row" justifyContent="space-between" alignItems="flex-start" w="100%" gap={4}>
                <VStack spacing={4} w="100%">
                  <FormControl>
                    <FormLabel>Category Text</FormLabel>
                    <Input
                      value={updatedCategory.categoryText }
                      onChange={(e) => handleFieldChange("categoryText", e.target.value)}
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

export default ListCategoriesPage;