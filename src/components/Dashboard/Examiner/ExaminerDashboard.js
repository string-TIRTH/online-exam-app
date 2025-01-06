import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import ExaminerSideBar from "./ExaminerSideBar";
import AddStudentPage from "../Admin/AddStudentPage";
import AddStudentBulkPage from "../Admin/AddStudentBulkPage";
import AddExamPage from "../Admin/AddExamPage";
import AddCategoryPage from "../Admin/AddCategoryPage";
import AddDifficultyPage from "../Admin/AddDifficultyPage";
import AddQuestionPage from "../Admin/AddQuestionPage";
import AddQuestionBulkPage from "../Admin/AddQuestionBulkPage";

import AddQuestionTypePage from "../Admin/AddQuestionTypePage";
import ListQuestionPage from "../Admin/ListQuestionPage";
import ListStudentsPage from "../Admin/ListStudentPage";
import ListQuestionTypePage from "../Admin/ListQuestionTypePage";
import ListCategoryPage from "../Admin/ListCategoryPage";
import ListDifficultyPage from "../Admin/ListDifficultyPage";
import ListExamsPage from "../Admin/ListExamPage"
import ListResultsPage from "../Admin/ListResultPage";


import ComingSoon from "../../Base/ComingSoon"
const ExaminerDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("AddStudent");

  const renderPage = () => {
    switch (selectedPage) {
      case "AddStudent":
        return <AddStudentPage />;
      case "AddStudentBulk":
        return <AddStudentBulkPage />;
      case "ListStudents":
        return <ListStudentsPage />;

      case "AddQuestion":
        return <AddQuestionPage />
      case "AddQuestionBulk":
        return <AddQuestionBulkPage />;
      case "ListQuestion":
        return <ListQuestionPage />;
      case "AddCategory":
        return <AddCategoryPage />;;
      case "ListCategory":
        return <ListCategoryPage />;
      case "AddDifficulty":
        return <AddDifficultyPage />;
      case "ListDifficulty":
        return <ListDifficultyPage />;
      case "AddQuestionType":
        return <AddQuestionTypePage />;
      case "ListQuestionType":
        return <ListQuestionTypePage />;
      case "AddExam":
        return <AddExamPage />;
      case "ListExam":
        return <ListExamsPage />;
      case "ListResult":
        return <ListResultsPage />;


      default:
        return <ComingSoon></ComingSoon>;
    }
  };

  return (
    <Flex>
      <ExaminerSideBar onPageSelect={setSelectedPage} />

      <div style={{ border: "2px solid #ddd", height: "auto", width: "100%", padding: "16px" }}>
        {renderPage()}
      </div>
    </Flex>
  );
};

export default ExaminerDashboard;
