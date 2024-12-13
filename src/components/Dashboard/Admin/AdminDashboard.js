import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import AdminSideBar from "./AdminSideBar";
import AddStudentPage from "./AddStudentPage";
import AddRolePage from "./AddRolePage";
import AddCategoryPage from "./AddCategoryPage";
import AddDifficultyPage from "./AddDifficultyPage";
import AddQuestionPage from "./AddQuestionPage";
import AddQuestionTypePage from "./AddQuestionTypePage";
import ListQuestionPage from "./ListQuestionPage";
import ListStudentsPage from "./ListStudentPage";
import ListQuestionTypePage from "./ListQuestionTypePage";
import ListCategoryPage from "./ListCategoryPage";
import ListDifficultyPage from "./ListDifficultyPage";
import ListRolesPage from "./ListRolePage";

import ComingSoon from "../../Base/ComingSoon"


const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("ManageStudent");

  const renderPage = () => {
    switch (selectedPage) {
      case "AddStudent":
        return <AddStudentPage />;
      case "ListStudents":
        return <ListStudentsPage />;
      case "AddRole":
        return <AddRolePage />;
      case "ListRoles":
        return <ListRolesPage />;
      case "AddQuestion":
        return <AddQuestionPage />
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
