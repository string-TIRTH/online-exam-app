import React, { useState ,useEffect } from 'react';
import { Box, FormLabel, Input, Button, FormControl, HStack, VStack, useToast,Select,Text } from '@chakra-ui/react';
import { questionApis,examApis } from "../../../services/api";
const AddExamPage = () => {
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);
  const [selectedPassingCriteria,setSelectedPassingCriteria] = useState({});
  const [categoryWiseQuestions,setCategoryWiseQuestions] = useState([]);
  const [difficultyWiseQuestions,setDifficultyWiseQuestions] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState({
    passingCriteriaDropDown: [],
  });
  const [formData, setFormData] = useState({
    examCode: '',
    examDate: '',
    examStartTime: '',
    examEndTime: '',
    examDurationInMinutes: 0,
    passingValue: 0,
    categoryWiseQuestions: [
    ]
  });
  
  const toast = useToast();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const questionAssoDataRes = await questionApis.getQuestionAssosicateData();
        setCategoryWiseQuestions(
          questionAssoDataRes.data.categories.map((category) => ({
            categoryId: category.categoryId,
            categoryText: category.categoryText,
            noOfQuestions: 0,
          }))
        );

        setDifficultyWiseQuestions(
          questionAssoDataRes.data.difficulties.map((difficulty)=>({
            difficultyId:difficulty.difficultyId,
            difficultyText:difficulty.difficultyText,
            noOfQuestions:0
          }))
        )
        const passingCriteriaRes = await examApis.getPassingCriteria();
        setDropdownOptions({
          passingCriteriaDropDown: passingCriteriaRes.data.passingCriterias.map((pc) => ({
            value: pc.passingCriteriaId,
            label: pc.passingCriteriaText,
          })),
        });
        setSelectedPassingCriteria(passingCriteriaRes.data.passingCriterias[0].passingCriteriaText)
        
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };
  
    fetchOptions();
  }, []);
  
  const handleInputChange = (target, control, index) => {
    const { value } = target;
    console.log(typeof(value))
    if (control === "categoryWiseQuestion") {
      setCategoryWiseQuestions((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, noOfQuestions: value } : item
        )
      );
    } else if (control === "difficultyWiseQuestions") {
      setDifficultyWiseQuestions((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, noOfQuestions: value } : item
        )
      );
    }else if(control === "passingCriteria"){
        setSelectedPassingCriteria(dropdownOptions.passingCriteriaDropDown.find(option => option.value == value)?.label)
    }else {
      setFormData((prevData) => ({
        ...prevData,
        [target.name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddButtonDisabled(true)
    const createExamPayload = {
      ...formData,
      examStartTime: `${formData.examDate}T${formData.examStartTime}`,
      examEndTime: `${formData.examDate}T${formData.examEndTime}`,
      passingValue:parseInt(formData.passingValue),
      examDurationInMinutes:parseInt(formData.examDurationInMinutes),
      mcqQuestions:categoryWiseQuestions.map((catWiseQues)=>({
        categoryId:parseInt(catWiseQues.categoryId),
        noOfQuestions:parseInt(catWiseQues.noOfQuestions)
      })),
      proQuestions:difficultyWiseQuestions.map((diffWiseQues)=>({
        difficultyId:parseInt(diffWiseQues.difficultyId),
        noOfQuestions:parseInt(diffWiseQues.noOfQuestions)
      })),
      passingCriteria:selectedPassingCriteria,
      totalMarks:100
    }
    await examApis.createExam({...createExamPayload}).then(() => {
      setAddButtonDisabled(false)
      toast({
        title: 'Exam Added',
        description: 'New exam added successfully.',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
      setFormData({
        examCode: '',
        examDate: '',
        examStartTime: '',
        examEndTime: '',
        examDurationInMinutes: 0,
        passingValue: 0,
        categoryWiseQuestions: [
        ]
      });
    }).catch((e)=>{
      setFormData({
        examCode: '',
        examDate: '',
        examStartTime: '',
        examEndTime: '',
        examDurationInMinutes: 0,
        passingValue: 0,
        categoryWiseQuestions: [
        ]
      });
      setAddButtonDisabled(false)
      toast({
        title: 'Unable to create exam',
        description: `${e}`,
        status: 'failed',
        duration: 1000,
        isClosable: true,
      });
    });
  };

  const fields = [
    { name: 'examCode', label: 'Exam Code', type: 'text', isRequired: true },
    { name: 'examDate', label: 'Exam Date', type: 'date', isRequired: true },
    { name: 'examStartTime', label: 'Exam Start Time', type: 'time', isRequired: true },
    { name: 'examEndTime', label: 'Exam End Time', type: 'time', isRequired: true }, 
    { name: 'examDurationInMinutes', label: 'Exam Duration In Minutes', type: 'number', isRequired: true },
    {
      name: 'passingCriteriaDropDown',
      label: 'Passing Criteria',
      type: 'select',
      options: dropdownOptions.passingCriteriaDropDown,
      isRequired: true,
    },
    { name: 'passingValue', label: 'Passing Value', type: 'number', isRequired: true },
  ];

  return (
    <Box
      height={"680px"}
      overflowY={"auto"}
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          {fields.map((field, index) => (
            <FormControl key={index} isRequired={field.isRequired}>
              <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
              {(["text","number","date","time"].includes(field.type))&& (
                <Input
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  type={field.type}
                  onChange={(e) =>handleInputChange(e.target,"text",index)}
                  placeholder={`Enter ${field.label}`}
                />
              )}
              {field.type === 'select' && (
                <Select
                  id={field.name}
                  name={field.name}
                  value={selectedPassingCriteria}
                  onChange={(e) =>handleInputChange(e.target,"passingCriteria",index)}
                >
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              )}
            </FormControl>
          ))}
          <Box
            m={2}
            p={5}
            border={"2px"}
          >
          <Text
            mb={10}
            fontWeight={"bold"}
            fontSize={"20px"}
          >
            * Enter Number of MCQ Questions according to category             
          </Text>
          {categoryWiseQuestions.map((category,index) => (
            <FormControl key={category.categoryId} isRequired={true}>
              <FormLabel htmlFor={category.categoryId}>{`${category.categoryText} Questions` }</FormLabel>
                <Input
                  id={category.categoryId}
                  name={category.categoryId}
                  value={category.noOfQuestions}
                  type='number'
                  onChange={(e) =>handleInputChange(e.target,"categoryWiseQuestion",index)}
                  placeholder={`Enter No of ${category.categoryText}`}
                  mb={2}
                />
            </FormControl>
          ))}
          </Box>
          <Box
            m={2}
            p={5}
            border={"2px"}
          >
          <Text
            mb={10}
            fontWeight={"bold"}
            fontSize={"20px"}
          >
            * Enter Number of Programming Questions according to difficulty             
          </Text>
          {difficultyWiseQuestions.map((difficulty,index) => (
            <FormControl key={difficulty.difficultyId} isRequired={true}>
              <FormLabel htmlFor={difficulty.difficultyId}>{`${difficulty.difficultyText} Questions` }</FormLabel>
                <Input
                  id={difficulty.difficultyId}
                  name={difficulty.difficultyId}
                  value={difficulty.noOfQuestions}
                  type='number'
                  onChange={(e) =>handleInputChange(e.target,"difficultyWiseQuestions",index)}
                  placeholder={`Enter No of ${difficulty.difficultyText}`}
                  mb={2}
                />
            </FormControl>
          ))}
          </Box>
          <HStack spacing={4} justify="flex-end" mt={4}>
            <Button type="submit" colorScheme="blue" disabled={addButtonDisabled}>
              Add Exam
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default AddExamPage;
