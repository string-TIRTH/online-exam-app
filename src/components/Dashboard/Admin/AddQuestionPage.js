import React, { useEffect, useState } from 'react';
import { Box, FormLabel, Input, Button, Select, FormControl, HStack, VStack, useToast,Radio,RadioGroup } from '@chakra-ui/react';
import { questionApis} from "../../../services/api";
const AddQuestionPage = () => {
  const [questionType, setQuestionType] = useState(null);
  const [category,setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [options, setOptions] = useState([{ id: 1, optionText: '', isCorrect: false }]);
  const [examples, setExamples] = useState([{ id: 1, inputText: '',outputText:'' }]);
  const [addButtonDisabled,setAddButtonDisabled] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState({
    questionCategories: [],
    questionDifficulties: [],
    questionTypes: []
  });
  const [formData, setFormData] = useState({
    questionText: '',
    questionCategoriesDropdown: '',
    questionDifficultiesDropdown: '',
    questionTypeDropdown: ''
  });
  const toast = useToast();

  const handleCorrectOptionChange = (id) => {
    const updatedOptions = options.map(option =>
      ({ ...option, isCorrect: option.id === id })
    );
    setOptions(updatedOptions);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index].optionText = value;
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, { id: options.length + 1, optionText: '', isCorrect: false }]);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleExampleChange = (index, control, value) => {
    const updatedExamples = [...examples];
    if (control === "input") {
      updatedExamples[index].inputText = value;
    } else if (control === "output") {
      updatedExamples[index].outputText = value; 
    }
    setExamples(updatedExamples);
  };

  const handleAddExample = () => {
    setExamples([...examples, { id: examples.length + 1, inputText: '',outputText:'' }]);
  };

  const handleRemoveExample = (index) => {
    const updatedExamples = examples.filter((_, i) => i !== index);
    setExamples(updatedExamples);
  };
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const questionAssoDataRes = await questionApis.getQuestionAssosicateData();
        const defaultQuestionType = questionAssoDataRes.data.questionTypes[0].questionTypeText;
        const defaultCategory = questionAssoDataRes.data.categories[0].categoryText;
        const defaultDifficulty = questionAssoDataRes.data.difficulties[0].difficultyText;
        setQuestionType(defaultQuestionType);
        setCategory(defaultCategory);
        setDifficulty(defaultDifficulty);
        setDropdownOptions({
          questionCategories: questionAssoDataRes.data.categories.map(category => ({
            value: category.categoryId,
            label: category.categoryText,
          })),
          questionDifficulties: questionAssoDataRes.data.difficulties.map(difficulty => ({
            value: difficulty.difficultyId,
            label: difficulty.difficultyText,
          })),
          questionTypes: questionAssoDataRes.data.questionTypes.map(type => ({
            value: type.questionTypeId,
            label: type.questionTypeText,
          })),
        });
      } catch (error) {
        console.error('Error fetching dropdown options:', error);
      }
    };

    fetchOptions();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch(name){
      case "questionTypesDropdown":{
        const selectedType = dropdownOptions.questionTypes.find(option => option.value == value)?.label;
        setQuestionType(selectedType);
        break;
      }
      case "questionDifficultiesDropdown":{
        const selectedType = dropdownOptions.questionDifficulties.find(option => option.value == value)?.label;
        setDifficulty(selectedType);
        break;
      }
      case "questionCategoriesDropdown":{
        const selectedType = dropdownOptions.questionCategories.find(option => option.value == value)?.label;
        setCategory(selectedType);
        break;
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddButtonDisabled(true)
    if(questionType==="MCQ"){
      setExamples(null);
    }else{
      setOptions(null);
    }
    await questionApis.createQuestionSingle(formData.questionText,category,questionType,difficulty,options,examples).then(()=>{
      setAddButtonDisabled(false)
      toast({
        title: 'Question Added',
        description: 'New question added successfully.',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
      setFormData({
        questionText: '',
        questionCategoriesDropdown: '',
        questionDifficultiesDropdown: ''
      });
      setOptions([{ id: 1, optionText: '', isCorrect: true }]);
      setExamples([{ id: 1, inputText: '', outputText: '' }]);
    });
   
  };

  const fields = [
    { name: 'questionText', label: 'Question Text', type: 'text', isRequired: true },
    {
      name: 'questionCategoriesDropdown',
      label: 'Question Category',
      type: 'select',
      options: dropdownOptions.questionCategories,
      isRequired: true,
    },
    {
      name: 'questionDifficultiesDropdown',
      label: 'Question Difficulty',
      type: 'select',
      options: dropdownOptions.questionDifficulties,
      isRequired: true,
    },
    {
      name: 'questionTypesDropdown',
      label: 'Question Types',
      type: 'select',
      options: dropdownOptions.questionTypes,
      isRequired: true,
    },
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
              {field.type === 'select' && (
                <Select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
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
          {questionType === "MCQ" && (
            <Box>
              <RadioGroup onChange={(id) => handleCorrectOptionChange(parseInt(id))}>
              <FormLabel>Options</FormLabel>
              {options.map((option, index) => (
                <HStack key={option.id} spacing={4} mb={2}>
                   <Radio value={option.id.toString()} isChecked={option.isCorrect}>
                      Correct
                    </Radio>
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option.optionText}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required={true}
                  />
                  {options.length > 1 && (
                    <Button colorScheme="red" onClick={() => handleRemoveOption(index)}>
                      Remove
                    </Button>
                  )}
                </HStack>
              ))}
              
              <Button colorScheme="blue" onClick={handleAddOption}>
                Add More Options
              </Button>
              </RadioGroup>
            </Box>
          )}
          {questionType === "Programming" && (
            <Box>
              <FormLabel>Examples</FormLabel>
              {examples.map((example, index) => (
                <HStack key={example.id} spacing={4} mb={2}>
                  <Input
                    placeholder={`Input ${index + 1}`}
                    name={`input${index}`}
                    id={`input${index}`}
                    value={example.inputText}
                    onChange={(e) => handleExampleChange(index,"input",e.target.value)}
                  />
                  <Input
                    placeholder={`Output ${index + 1}`}
                    name={`output${index}`}
                    id={`output${index}`}
                    value={example.outputText}
                    onChange={(e) => handleExampleChange(index,"output", e.target.value)}
                  />
                  {examples.length > 1 && (
                    <Button colorScheme="red" onClick={() => handleRemoveExample(index)}>
                      Remove
                    </Button>
                  )}
                </HStack>
              ))}
              <Button colorScheme="blue" onClick={handleAddExample}>
                Add More examples
              </Button>
            </Box>
          )}

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

export default AddQuestionPage;
