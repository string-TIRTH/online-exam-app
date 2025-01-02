import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import Swal from "sweetalert2";
import { examApis } from "../../../services/api"; 
import { Box,Text } from "@chakra-ui/react";
const ExamTimer = ({ isExamStarted, timeRemaining,totalTime,examSubmissionId }) => {
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + timeRemaining); 
  
    const { seconds, minutes,hours, isRunning, restart } = useTimer({
      expiryTimestamp,
      onExpire: async () => {
        try {
          await examApis.submitExam(examSubmissionId);
          Swal.fire("Submitted!", "Your exam has been submitted.", "success");
        } catch (error) {
          console.error("Error submitting the exam:", error);
          Swal.fire("Error!", "There was an issue submitting your exam.", "error");
        }
      },
    });
  
    useEffect(() => {
      if (isExamStarted) {
        const newExpiryTimestamp = new Date();
        console.log("timeRemaining", timeRemaining);
        console.log("isExamStarted",isExamStarted);
        newExpiryTimestamp.setSeconds(newExpiryTimestamp.getSeconds() + timeRemaining);
        restart(newExpiryTimestamp);
      }
    }, [isExamStarted, timeRemaining, restart]);
  
    return (
      <div>
        {isRunning && (
          <Box
          borderWidth="1px"
          borderRadius="lg"
          p={5}
          shadow="md"
          fontWeight="bold"
        >
          <Text
            fontSize="2xl"
            color={
              timeRemaining / totalTime > 0.1 ? "green.500" : "red.500"
            }
            textAlign={"center"}
            borderRadius={"lg"}
            backgroundColor={
              timeRemaining < 60 ? "yellow.300" : "whiteAlpha.200"
            }
          >
            <span style={{ color: "black" }}>Time Remaining - </span>
            {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        </Box>
        )}
      </div>
    );
  };
  
  export default ExamTimer;
  