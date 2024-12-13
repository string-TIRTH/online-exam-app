import React, { useState } from 'react';
import { Box, FormLabel, Input, Button, FormControl, HStack, VStack, useToast,Radio,RadioGroup } from '@chakra-ui/react';
import {userApis } from "../../../services/api";
const AddRolePage = () => {
  const [addButtonDisabled,setAddButtonDisabled] = useState(false);

  const [formData, setFormData] = useState({
    role: '',
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setAddButtonDisabled(true)
    await userApis.createRole(formData.role).then(()=>{
      setAddButtonDisabled(false)
      toast({
        title: ' Role Added',
        description: 'New question role added successfully.',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
      setFormData({
        role: '',
      });
    });
  };

  const fields = [
    { name: 'role', label: 'Role Name', type: 'text', isRequired: true }
  ];

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          {fields.map((field, index) => (
            <FormControl key={index} isRequired={field.isRequired}>
              <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
              {field.type === 'text' && (
                <Input
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field.label}`}
                />
              )}
            </FormControl>
          ))}
          

          <HStack spacing={4} justify="flex-end" mt={4}>
            <Button type="submit" colorScheme="blue" disabled={addButtonDisabled}>
              Add Role
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default AddRolePage;
