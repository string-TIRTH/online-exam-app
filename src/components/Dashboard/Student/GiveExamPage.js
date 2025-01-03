import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel
} from "@chakra-ui/react";
import { examApis } from "../../../services/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import FingerprintJS from '@fingerprintjs/fingerprintjs';


const GiveExamPage = () => {
  const navigate = useNavigate();
  const [examCode,setExamCode] = useState("");

const handleExamCodeChange = (e) => {
  getDeviceFingerprint();
  const value = e?.target?.value || ""; 
  setExamCode(value);
}

const getDeviceFingerprint = async () => {
  const fp = await FingerprintJS.load();
  const result = await fp.get({
      excludes: {
          userAgent: true,
          screenResolution: true,
          availableScreenResolution: true,
          ip: true,
      }
  });
  console.log(result.visitorId);
  return result.visitorId;
};

const handleSubmitExamCode = () =>{
  Swal.fire({
    title: "Instructions",
    html: `
      <ul style="text-align: left;">
        <li>Ensure your system meets the technical requirements.</li>
        <li>Sit in a quiet and well-lit space with no distractions.</li>
        <li>There are 2 section. MCQ section followed by Programming section</li>
        <li>Do not refresh the page or switch tabs during the exam.</li>
        <li>violating given instructions will result into exam termination</li>
        <li>Submit your answers before the timer ends.</li>
      </ul>
    `,
    icon: "info",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Start Exam",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const getExamStatusRes = await examApis.getExamStatus(examCode, await getDeviceFingerprint());
        const status = getExamStatusRes.data.status;
        const code = getExamStatusRes.data.code;
        switch(code){
          case 1:
            navigate("/exam", { state: { examCode } });
            break;
          case 2:
            Swal.fire(status, "Exam Finished", "info");
            break;
          case 3:
            Swal.fire(status, "Exam Already Submitted", "info");
            break;
          case 4:
            Swal.fire(status, "Some Thing Went Wrong", "error");
            break;
          case 6:
            Swal.fire(status, "Invalid Code", "error");
          case 7:
            Swal.fire(status, "Exam not started yet", "error");
          case 8:
          Swal.fire(status, "Device Change Detected Please complete exam with same device or contact examiner", "error");
            break;
        }
    } else if (result.isDismissed) {
      console.log("Exam canceled");
    }
  });
  
}
  
  return (
    <div>
      
         <Box
          p={5}
          justifyItems={"right"}
         >
         <FormControl key= "examCode" isRequired={true} mb={5}>
          <FormLabel htmlFor="examCode">Enter Exam Code</FormLabel>
          
            <Input
              id="examCodeInput"
              name="examCodeInput"
              value={examCode}
              onChange={handleExamCodeChange}
              autoComplete="off"
              placeholder={`Enter Exam Code`}
            />
          
        </FormControl>
        <Button
          onClick={handleSubmitExamCode}
        >
            Submit Code
        </Button>
        </Box>
      
    </div>
  );
};

export default GiveExamPage;
