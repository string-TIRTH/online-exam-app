import React, { useEffect, useState } from 'react';
import { Box, FormLabel, Input, Button, Select, FormControl, HStack, VStack, useToast,Radio,RadioGroup } from '@chakra-ui/react';
import {createQuestionType } from "../../../services/api";
const AddQuestionTypePage = () => {
  const [addButtonDisabled,setAddButtonDisabled] = useState(false);

  const [formData, setFormData] = useState({
    questionTypeText: '',
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
    await createQuestionType(formData.questionTypeText).then(()=>{
      setAddButtonDisabled(false)
      toast({
        title: 'Question Type Added',
        description: 'New question type added successfully.',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
      setFormData({
        fullName: '',
      });
    });
  };

  const fields = [
    { name: 'questionTypeText', label: 'Question Type', type: 'text', isRequired: true }
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
              Add Question Type
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default AddQuestionTypePage;
