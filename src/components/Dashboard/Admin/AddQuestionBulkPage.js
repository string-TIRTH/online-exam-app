import React, { useState } from 'react';
import { Box, FormLabel, Input, Button, FormControl, HStack, VStack, useToast } from '@chakra-ui/react';
import {questionApis } from "../../../services/api";
const AddQuestionBulkPage = () => {
  const [addButtonDisabled,setAddButtonDisabled] = useState(false);
  const [file, setFileData] = useState(null);
  const toast = useToast();

  const handleFileUpload = (e) => {
    setFileData(e.target.files[0]); 
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast({
        title: 'Error',
        description: 'Please upload a file before submitting.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file); 

    setAddButtonDisabled(true);
    try {
      await questionApis.createQuestionBulk(formData); 
      toast({
        title: 'File Uploaded',
        description: 'Question details uploaded successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'Failed to upload the file. Please try again.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setAddButtonDisabled(false);
      setFileData(null); 
    }
  };
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
       
            <FormControl key={"questiondtl"} isRequired={true}>
              <FormLabel htmlFor="Question Details ">Question Details</FormLabel>
             
                <Input
                  name={"questionDetails"}
                  type={"file"}
                  onChange={handleFileUpload}
                  placeholder={`Upload Question Details (CSV Format)`}
                />
             
            </FormControl>
        
          

          <HStack spacing={4} justify="flex-end" mt={4}>
            <Button type="submit" colorScheme="blue" disabled={addButtonDisabled}>
              Add Question
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default AddQuestionBulkPage;
