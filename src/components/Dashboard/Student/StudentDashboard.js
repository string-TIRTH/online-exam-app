import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import StudentSideBar from "./StudentSideBar";
import ComingSoon from "../../Base/ComingSoon"
import GiveExamPage from "./GiveExamPage";


const StudentDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("ManageStudent");

  
  
  const renderPage = () => {
    switch (selectedPage) {
      case "GiveExam": {

        return <GiveExamPage />;
    }
      default:
        return <GiveExamPage />;
  
    }
  };

  return (
    <Flex>
      <StudentSideBar onPageSelect={setSelectedPage} />

      <div style={{ border: "2px solid #ddd", height: "auto", width: "100%", padding: "16px" }}>
        {renderPage()}
      </div>
    </Flex>
  );
};

export default StudentDashboard;
