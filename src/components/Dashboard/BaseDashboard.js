import React, { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import Navbar from "./BaseNavbar"; 
import validateRole from "../../utils/validateRole";
import AdminDashboard from "./Admin/AdminDashboard";
import ExaminerDashboard from "./Examiner/ExaminerDashboard";
import StudentDashboard from "./Student/StudentDashboard";


const DashboardHome = () => {

  const [currentRole, setCurrentRole] = useState("Guest"); 
  useEffect(() => {
    const role = sessionStorage.getItem("role");  
    const roleTxt = validateRole(role);
    if(roleTxt){
      setCurrentRole(roleTxt);
    }
  }, []);  

  return (
    <Box>
      <Navbar />
      <Box p={5}>
        {currentRole==="Admin" && <AdminDashboard/>}
        {currentRole==="Examiner" && <ExaminerDashboard/>}
        {currentRole==="Student" && <StudentDashboard/>}
      </Box>
    </Box>
  );
};

export default DashboardHome;
