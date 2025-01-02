import React, { useState } from 'react';
import { Box, FormLabel, Input, Button, FormControl, HStack, VStack, useToast } from '@chakra-ui/react';
import {userApis } from "../../../services/api";
const AddExaminerPage = () => {
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
    await userApis.createExaminerSingle(formData.fullName, formData.mobileNumber, formData.email, formData.password).then(()=>{
      setAddButtonDisabled(false)
      toast({
        title: 'Examiner Added',
        description: 'New examiner added successfully.',
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
    { name: 'mobileNumber', label: 'Mobile Number', type: 'number', isRequired: true },
    { name: 'email', label: 'Email', type: 'email', isRequired: true },
    { name: 'password', label: 'Password', type: 'password', isRequired: true},
    
  ];

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          {fields.map((field, index) => (
            <FormControl key={index} isRequired={field.isRequired}>
              <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
              
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field.label}`}
                />
             
            </FormControl>
          ))}
          

          <HStack spacing={4} justify="flex-end" mt={4}>
            <Button type="submit" colorScheme="blue" disabled={addButtonDisabled}>
              Add Examiner
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default AddExaminerPage;
