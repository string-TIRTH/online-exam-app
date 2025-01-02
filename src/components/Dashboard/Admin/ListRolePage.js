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

const ListRolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [updatedRole, setUpdatedRole] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRoles, setTotalRoles] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);
  const toast = useToast();
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    const fetchRoles = async () => {
      try {
        const roleResponse = await userApis.getRoleList(currentPage, rowsPerPage, searchText);
        setTotalRoles(roleResponse.data.itemCount);
        setRoles(roleResponse.data.items ?? []);
        setFilteredRoles(roleResponse.data.items ?? []);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
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

  const handleDelete = async (roleId) => {
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
            const response = await userApis.deleteRole(roleId);
            Swal.fire("Deleted!", response.data.message, "success");
            const updatedRoles = roles.filter((q) => q.roleId !== roleId);
            setRoles(updatedRoles);
            setFilteredRoles(updatedRoles);
          } catch (error) {
            Swal.fire("failed", error, "error");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("X", "Cancelled", "info");
        }
      });
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const handleUpdate = (role) => {
    setSelectedRole(role);
    setUpdatedRole({ ...role });
    setIsUpdateModalOpen(true);
  };

  const handleFieldChange = (field, value) => {


    setUpdatedRole((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
    console.log(updatedRole)
  };

  const handleSaveChanges = async () => {
    try {
      await userApis.updateRole(updatedRole);
      toast({
        title: "Role Updated",
        description: "The role has been updated successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      const updatedRoles = roles.map((q) =>
        q.roleId === updatedRole.roleId ? updatedRole : q
      );
      setRoles(updatedRoles);
      setFilteredRoles(updatedRoles);

      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating role:", error);
      toast({
        title: "Error",
        description: "Failed to update the role.",
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
              { length: Math.ceil(totalRoles / rowsPerPage) },
              (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Page {i + 1}
                </option>
              )
            )}
          </Select>
        </HStack>
        <Input
          placeholder="Search roles by roleId, roleText"
          value={searchText}
          onChange={handleSearch}
        />

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Role Id</Th>
              <Th>Role Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredRoles.map((role) => (
              <Tr key={role.roleId}>
                <Td>{role.roleId}</Td>
                <Td>{role.role}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      colorScheme="blue"
                      onClick={() => handleUpdate(role)}
                    >
                      Update
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(role.roleId)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {filteredRoles.length === 0 && <Box>No roles found.</Box>}
      </VStack>
      {selectedRole && (
        <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} size="6xl">
          <ModalOverlay />
          <ModalContent maxW="80%" maxH="90%" w="80%" h="auto" p={4}>
            <ModalHeader display="flex" justifyContent="center">
              Update Role
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowY="auto" >
              <Flex direction="row" justifyContent="space-between" alignItems="flex-start" w="100%" gap={4}>
                <VStack spacing={4} w="100%">
                  <FormControl>
                    <FormLabel>Role Text</FormLabel>
                    <Input
                      value={updatedRole.role}
                      onChange={(e) => handleFieldChange("role", e.target.value)}
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
            { length: Math.ceil(totalRoles / rowsPerPage) },
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

export default ListRolesPage;