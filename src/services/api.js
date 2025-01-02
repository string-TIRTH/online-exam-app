import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});

const token = sessionStorage.getItem("token");

export const login = (email, password) => API.post("/auth/login", { email, password });

export const questionApis = {
  createQuestionSingle : (questionText, category, questionType, difficulty, questionOptions, questionExamples) => API.post("/question/create/single", {
    questionText, category, questionType, difficulty, questionOptions, questionExamples
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  createQuestionType : (questionTypeText) => API.post("/question/createQuestionType", {
    questionTypeText
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  createQuestionCategory : (categoryText) => API.post("/question/createCategory", {
    categoryText
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  createQuestionDifficulty : (difficultyText,difficultyWeight) => API.post("/question/createDifficulty", {
    difficultyText,difficultyWeight
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  getQuestionAssosicateData : () => API.get("/question/getQuestionAssosicateData", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  }),
  getQuestionsList : (page,limit,search) => API.post("/question/getQuestionList", {
    page,limit,search
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  
  updateQuestion : (question) => API.post("/question/update", {
    question
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  
  deleteOptions : (questionId,optionIds) =>API.post("/question/deleteOptions", {
    questionId,optionIds
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  deleteExamples : (questionId,exampleIds) =>API.post("/question/deleteExamples", {
    questionId,exampleIds
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  deleteQuestion : (questionId) =>API.post("/question/delete", {
    questionId
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),

  getCategoryList : (page,limit,search) => API.post("/question/getCategoryList", {
    page,limit,search
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  getDifficultyList : (page,limit,search) => API.post("/question/getDifficultyList", {
    page,limit,search
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  getQuestionTypeList : (page,limit,search) => API.post("/question/getQuestionTypeList", {
    page,limit,search
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  updateDifficulty : (difficulty) => API.post("/question/updateDifficulty", {
    difficulty
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  deleteDifficulty : (difficultyId) =>API.post("/question/deleteDifficulty", {
    difficultyId
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  updateCategory : (category) => API.post("/question/updateCategory", {
    category
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  deleteCategory : (categoryId) =>API.post("/question/deleteCategory", {
    categoryId
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  updateQuestionType : (questionType) => API.post("/question/updateQuestionType", {
    questionType
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  deleteQuestionType : (questionTypeId) =>API.post("/question/deleteQuestionType", {
    questionTypeId
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
}

export const examApis = {
  getPassingCriteria:() => API.get("/exam/getPassingCriteria",  {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  
  }),
  createExam:({examCode,examDate,examStartTime,examEndTime,examDurationInMinutes,passingCriteria,passingValue,mcqQuestions,proQuestions}) => API.post("/exam/create", {
    examCode,examDate,examStartTime,examEndTime,examDurationInMinutes,passingCriteria,passingValue,mcqQuestions,proQuestions
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  
  }),
  getExamList:(page,limit,search) => API.post("/exam/getExamList", {
    page,limit,search
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  updateExam:(exam) => API.post("/exam/update", {
    exam
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  deleteExam:(examId) => API.post("/exam/delete", {
    examId
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  getExamQuestionByExamId:(id) => API.post("/exam/getExamQuestionByExamId", {
    id
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  getExamQuestionByCategoryAndQuestionType:(categoryId,questionTypeId,examId) => API.post("/exam/getExamQuestionByCategoryAndQuestionType", {
    categoryId,questionTypeId,examId
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  replaceExamQuestions:({examId,oldExamQuestionId,newQuestionId}) => API.post("/exam/replaceExamQuestions", {
    examId,oldExamQuestionId,newQuestionId
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  updateExamQuestion:(examQuestion) => API.post("/exam/updateExamQuestion", {
    examQuestion
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  deleteExamQuestion:(examQuestionId) => API.post("/exam/deleteExamQuestion", {
    examQuestionId
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  getExamStatus:(examCode) => API.post("/exam/getExamStatus", {
    examCode
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  getExamQuestionsForExam:(examCode) => API.post("/exam/getExamQuestions", {
    examCode
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  submitQuestionOption:(questionSubmissionId,optionId,statusId) => API.post("/exam/submitQuestionOption", {
    questionSubmissionId,optionId,statusId
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  submitProgrammingQuestion:(programmingSubmissionId,submittedCode) => API.post("/exam/submitProgrammingQuestion", {
    programmingSubmissionId,submittedCode
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      
  }),
  submitExam:(examSubmissionId) => API.post("/exam/submitExam", {
    examSubmissionId
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      
  }),
  getExamResultDetails:(page,limit,search) => API.post("/exam/getExamResultDetails", {
    page,limit,search
    },{
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  }),
  getExamSubmissions:(examId,page,limit,search) => API.post("/exam/getExamSubmissions", {
    examId,page,limit,search
    },{
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  }),
  getMCQSubmissions:(examSubmissionId,page,limit,search) => API.post("/exam/getMCQSubmissions", {
    examSubmissionId,page,limit,search
    },{
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  }),
  getProSubmissions:(examSubmissionId,page,limit,search) => API.post("/exam/getProSubmissions", {
    examSubmissionId,page,limit,search
    },{
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  }),
  submitCodeReview:(programmingSubmissionId,isCorrect) => API.post("/exam/submitCodeReview", {
    programmingSubmissionId,isCorrect
    },{
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  }),
}

export const userApis = {
  createStudentSingle:(fullName, mobileNumber, email, password) => API.post("/user/student/register/single", {
    fullName, mobileNumber, email, password
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  
  }),
   getStudentList:(page,limit,search) => API.post("/user/getStudentList", {
    page,limit,search
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  
   updateStudent:({user}) => API.post("/user/student/update", {
    user
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  createExaminerSingle:(fullName, mobileNumber, email, password) => API.post("/user/examiner/register/single", {
    fullName, mobileNumber, email, password
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  
  }),
   getExaminerList:(page,limit,search) => API.post("/user/getExaminerList", {
    page,limit,search
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  
   updateExaminer:({user}) => API.post("/user/examiner/update", {
    user
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  getRoleList:(page,limit,search) => API.post("/role/getRoleList", {
    page,limit,search
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  
  updateRole:(role) => API.post("/role/update", {
    role
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  createRole:(roleName) => API.post("/role/create", {
    roleName
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
  deleteRole:(roleId) => API.post("/role/delete", {
    roleId
  }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
  }),
}