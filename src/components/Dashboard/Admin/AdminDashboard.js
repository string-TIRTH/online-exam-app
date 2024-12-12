import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import AdminSideBar from "./AdminSideBar";
import AddStudentPage from "./AddStudentPage";
import AddCategoryPage from "./AddCategoryPage";
import AddDifficultyPage from "./AddDifficultyPage";
import AddQuestionPage from "./AddQuestionPage";
import AddQuestionTypePage from "./AddQuestionTypePage";
import ListQuestionPage from "./ListQuestionPage";
import ListStudentsPage from "./ListStudentPage";
import ComingSoon from "../../Base/ComingSoon"


const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("ManageStudent");

  const renderPage = () => {
    switch (selectedPage) {
      case "AddStudent":
        return <AddStudentPage />;
      case "AddQuestion":
        return <AddQuestionPage />
        case "AddCategory":
        return <AddCategoryPage />;;
      case "AddDifficulty":
        return <AddDifficultyPage />;
      case "AddQuestionType":
        return <AddQuestionTypePage />;
      case "ListQuestion":
        return <ListQuestionPage />;
      case "ListStudents":
        return <ListStudentsPage />;
      default:
        return <ComingSoon></ComingSoon>;
    }
  };

  return (
    <Flex>
      <AdminSideBar onPageSelect={setSelectedPage} />
      
      <div style={{ border: "2px solid #ddd", height: "auto", width: "100%", padding: "16px" }}>
        {renderPage()}
      </div>
    </Flex>
  );
};

export default AdminDashboard;
