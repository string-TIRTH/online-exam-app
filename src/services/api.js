import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const API = axios.create({
  baseURL: API_BASE_URL,
});

const token = sessionStorage.getItem("token");

export const login = (email, password) => API.post("/auth/login", { email, password });
export const getQuestionAssosicateData = () => API.get("/question/getQuestionAssosicateData", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const createQuestionSingle = (questionText, category, questionType, difficulty, questionOptions, questionExamples) => API.post("/question/create/single", {
  questionText, category, questionType, difficulty, questionOptions, questionExamples
}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});
export const createStudentSingle = (fullName, mobileNumber, email, password) => API.post("/student/register/single", {
  fullName, mobileNumber, email, password
}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});

export const createQuestionType = (questionTypeText) => API.post("/question/createQuestionType", {
  questionTypeText
}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});
export const createQuestionCategory = (categoryText) => API.post("/question/createCategory", {
  categoryText
}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});
export const createQuestionDifficulty = (difficultyText,difficultyWeight) => API.post("/question/createDifficulty", {
  difficultyText,difficultyWeight
}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});

export const getQuestionsList = (page,limit,search) => API.post("/question/getQuestionList", {
  page,limit,search
}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});

export const updateQuestion = (question) => API.post("/question/update", {
  question
}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});

export const deleteOptions = (questionId,optionIds) => API.post("/question/deleteOptions", {
  questionId,optionIds
}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});
export const deleteExamples = (questionId,exampleIds) => API.post("/question/deleteExamples", {
  questionId,exampleIds
}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});

export const deleteQuestion = (questionId) => API.post("/question/delete", {
  questionId
}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});

export const getStudentList = (page,limit,search) => API.post("/student/getStudentList", {
  page,limit,search
}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});

export const updateStudent = (student) => API.post("/student/update", {
  student
}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});
