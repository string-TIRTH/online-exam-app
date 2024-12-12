import React, { useEffect, useState } from 'react';
import { Box, FormLabel, Input, Button, Select, FormControl, HStack, VStack, useToast,Radio,RadioGroup } from '@chakra-ui/react';
import {createStudentSingle } from "../../../services/api";
const AddStudentPage = () => {
  const [addButtonDisabled,setAddButtonDisabled] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    password: ''
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
    await createStudentSingle(formData.fullName, formData.mobileNumber, formData.email, formData.password).then(()=>{
      setAddButtonDisabled(false)
      toast({
        title: 'Student Added',
        description: 'New student added successfully.',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
      setFormData({
        fullName: '',
        mobileNumber: '',
        email: '',
        password: ''
      });
    });
  };

  const fields = [
    { name: 'fullName', label: 'Full Name', type: 'text', isRequired: true },
    { name: 'mobileNumber', label: 'Mobile Number', type: 'text', isRequired: true },
    { name: 'email', label: 'Email', type: 'text', isRequired: true },
    { name: 'password', label: 'Password', type: 'text', isRequired: true },
    
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
              Add Student
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default AddStudentPage;
