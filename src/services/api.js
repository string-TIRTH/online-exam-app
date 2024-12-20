import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const API = axios.create({
  baseURL: API_BASE_URL,
});

const token = sessionStorage.getItem("token");

export const login = (email, password) => API.post("/auth/login", { email, password });

export const questionApis = {
  createQuestionSingle : (questionText, category, questionType, difficulty, questionOptions, questionExamples) => API.post("/question/create/single", {
    questionText, category, questionType, difficulty, questionOptions, questionExamples
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  createQuestionType : (questionTypeText) => API.post("/question/createQuestionType", {
    questionTypeText
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  createQuestionCategory : (categoryText) => API.post("/question/createCategory", {
    categoryText
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  createQuestionDifficulty : (difficultyText,difficultyWeight) => API.post("/question/createDifficulty", {
    difficultyText,difficultyWeight
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  getQuestionAssosicateData : () => API.get("/question/getQuestionAssosicateData", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  getQuestionsList : (page,limit,search) => API.post("/question/getQuestionList", {
    page,limit,search
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  
  updateQuestion : (question) => API.post("/question/update", {
    question
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  
  deleteOptions : (questionId,optionIds) =>API.post("/question/deleteOptions", {
    questionId,optionIds
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  deleteExamples : (questionId,exampleIds) =>API.post("/question/deleteExamples", {
    questionId,exampleIds
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  deleteQuestion : (questionId) =>API.post("/question/delete", {
    questionId
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),

  getCategoryList : (page,limit,search) => API.post("/question/getCategoryList", {
    page,limit,search
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  getDifficultyList : (page,limit,search) => API.post("/question/getDifficultyList", {
    page,limit,search
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  getQuestionTypeList : (page,limit,search) => API.post("/question/getQuestionTypeList", {
    page,limit,search
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  updateDifficulty : (difficulty) => API.post("/question/updateDifficulty", {
    difficulty
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  deleteDifficulty : (difficultyId) =>API.post("/question/deleteDifficulty", {
    difficultyId
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  updateCategory : (category) => API.post("/question/updateCategory", {
    category
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  deleteCategory : (categoryId) =>API.post("/question/deleteCategory", {
    categoryId
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  updateQuestionType : (questionType) => API.post("/question/updateQuestionType", {
    questionType
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  deleteQuestionType : (questionTypeId) =>API.post("/question/deleteQuestionType", {
    questionTypeId
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
}

export const examApis = {
  getPassingCriteria:() => API.get("/exam/getPassingCriteria",  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  
  }),
  createExam:({examCode,examDate,examStartTime,examEndTime,examDurationInMinutes,passingCriteria,passingValue,mcqQuestions,proQuestions}) => API.post("/exam/create", {
    examCode,examDate,examStartTime,examEndTime,examDurationInMinutes,passingCriteria,passingValue,mcqQuestions,proQuestions
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  
  }),
  getExamList:(page,limit,search) => API.post("/exam/getExamList", {
    page,limit,search
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  updateExam:(exam) => API.post("/exam/update", {
    exam
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  deleteExam:(examId) => API.post("/exam/delete", {
    examId
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  getExamQuestionByExamId:(id) => API.post("/exam/getExamQuestionByExamId", {
    id
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  getExamQuestionByCategoryAndQuestionType:(categoryId,questionTypeId,examId) => API.post("/exam/getExamQuestionByCategoryAndQuestionType", {
    categoryId,questionTypeId,examId
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  replaceExamQuestions:({examId,oldExamQuestionId,newQuestionId}) => API.post("/exam/replaceExamQuestions", {
    examId,oldExamQuestionId,newQuestionId
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  updateExamQuestion:(examQuestion) => API.post("/exam/updateExamQuestion", {
    examQuestion
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  deleteExamQuestion:(examQuestionId) => API.post("/exam/deleteExamQuestion", {
    examQuestionId
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  getExamQuestionsForExam:(examCode) => API.post("/exam/getExamQuestions", {
    examCode
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  submitQuestionOption:(questionSubmissionId,optionId,statusId) => API.post("/exam/submitQuestionOption", {
    questionSubmissionId,optionId,statusId
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  submitProgrammingQuestion:(programmingSubmissionId,submittedCode) => API.post("/exam/submitProgrammingQuestion", {
    programmingSubmissionId,submittedCode
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
  }),
  submitExam:(examSubmissionId) => API.post("/exam/submitExam", {
    examSubmissionId
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
  }),
  getExamResultDetails:(page,limit,search) => API.post("/exam/getExamResultDetails", {
    page,limit,search
    },{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  getExamSubmissions:(examId,page,limit,search) => API.post("/exam/getExamSubmissions", {
    examId,page,limit,search
    },{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
}

export const userApis = {
  createStudentSingle:(fullName, mobileNumber, email, password) => API.post("/user/student/register/single", {
    fullName, mobileNumber, email, password
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  
  }),
   getStudentList:(page,limit,search) => API.post("/user/getStudentList", {
    page,limit,search
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  
   updateStudent:({user}) => API.post("/user/student/update", {
    user
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  createExaminerSingle:(fullName, mobileNumber, email, password) => API.post("/user/examiner/register/single", {
    fullName, mobileNumber, email, password
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  
  }),
   getExaminerList:(page,limit,search) => API.post("/user/getExaminerList", {
    page,limit,search
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  
   updateExaminer:({user}) => API.post("/user/examiner/update", {
    user
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  getRoleList:(page,limit,search) => API.post("/role/getRoleList", {
    page,limit,search
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  
  updateRole:(role) => API.post("/role/update", {
    role
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  createRole:(roleName) => API.post("/role/create", {
    roleName
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  deleteRole:(roleId) => API.post("/role/delete", {
    roleId
  }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
}