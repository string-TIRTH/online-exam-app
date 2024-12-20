import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import AdminSideBar from "./StudentSideBar";
import ComingSoon from "../../Base/ComingSoon"
import ExamPage from "./ExamPage";


const StudentDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("ManageStudent");
  const questions = [
    {
        "questionId": 1,
        "questionText": "Question 1 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 1",
                "isCorrect": true
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 1",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 1",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 1",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 2,
        "questionText": "Question 2 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 2",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 2",
                "isCorrect": true
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 2",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 2",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 3,
        "questionText": "Question 3 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 3",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 3",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 3",
                "isCorrect": true
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 3",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 4,
        "questionText": "Question 4 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 4",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 4",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 4",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 4",
                "isCorrect": true
            }
        ]
    },
    {
        "questionId": 5,
        "questionText": "Question 5 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 5",
                "isCorrect": true
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 5",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 5",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 5",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 6,
        "questionText": "Question 6 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 6",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 6",
                "isCorrect": true
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 6",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 6",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 7,
        "questionText": "Question 7 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 7",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 7",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 7",
                "isCorrect": true
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 7",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 8,
        "questionText": "Question 8 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 8",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 8",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 8",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 8",
                "isCorrect": true
            }
        ]
    },
    {
        "questionId": 9,
        "questionText": "Question 9 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 9",
                "isCorrect": true
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 9",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 9",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 9",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 10,
        "questionText": "Question 10 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 10",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 10",
                "isCorrect": true
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 10",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 10",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 11,
        "questionText": "Question 11 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 11",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 11",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 11",
                "isCorrect": true
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 11",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 12,
        "questionText": "Question 12 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 12",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 12",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 12",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 12",
                "isCorrect": true
            }
        ]
    },
    {
        "questionId": 13,
        "questionText": "Question 13 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 13",
                "isCorrect": true
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 13",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 13",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 13",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 14,
        "questionText": "Question 14 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 14",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 14",
                "isCorrect": true
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 14",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 14",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 15,
        "questionText": "Question 15 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 15",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 15",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 15",
                "isCorrect": true
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 15",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 16,
        "questionText": "Question 16 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 16",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 16",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 16",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 16",
                "isCorrect": true
            }
        ]
    },
    {
        "questionId": 17,
        "questionText": "Question 17 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 17",
                "isCorrect": true
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 17",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 17",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 17",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 18,
        "questionText": "Question 18 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 18",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 18",
                "isCorrect": true
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 18",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 18",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 19,
        "questionText": "Question 19 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 19",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 19",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 19",
                "isCorrect": true
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 19",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 20,
        "questionText": "Question 20 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 20",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 20",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 20",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 20",
                "isCorrect": true
            }
        ]
    },
    {
        "questionId": 21,
        "questionText": "Question 21 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 21",
                "isCorrect": true
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 21",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 21",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 21",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 22,
        "questionText": "Question 22 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 22",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 22",
                "isCorrect": true
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 22",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 22",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 23,
        "questionText": "Question 23 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 23",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 23",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 23",
                "isCorrect": true
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 23",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 24,
        "questionText": "Question 24 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 24",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 24",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 24",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 24",
                "isCorrect": true
            }
        ]
    },
    {
        "questionId": 25,
        "questionText": "Question 25 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 25",
                "isCorrect": true
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 25",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 25",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 25",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 26,
        "questionText": "Question 26 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 26",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 26",
                "isCorrect": true
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 26",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 26",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 27,
        "questionText": "Question 27 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 27",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 27",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 27",
                "isCorrect": true
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 27",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 28,
        "questionText": "Question 28 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 28",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 28",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 28",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 28",
                "isCorrect": true
            }
        ]
    },
    {
        "questionId": 29,
        "questionText": "Question 29 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 29",
                "isCorrect": true
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 29",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 29",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 29",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 30,
        "questionText": "Question 30 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 30",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 30",
                "isCorrect": true
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 30",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 30",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 31,
        "questionText": "Question 31 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 31",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 31",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 31",
                "isCorrect": true
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 31",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 32,
        "questionText": "Question 32 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 32",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 32",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 32",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 32",
                "isCorrect": true
            }
        ]
    },
    {
        "questionId": 33,
        "questionText": "Question 33 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 33",
                "isCorrect": true
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 33",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 33",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 33",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 34,
        "questionText": "Question 34 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 34",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 34",
                "isCorrect": true
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 34",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 34",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 35,
        "questionText": "Question 35 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 35",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 35",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 35",
                "isCorrect": true
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 35",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 36,
        "questionText": "Question 36 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 36",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 36",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 36",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 36",
                "isCorrect": true
            }
        ]
    },
    {
        "questionId": 37,
        "questionText": "Question 37 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 37",
                "isCorrect": true
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 37",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 37",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 37",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 38,
        "questionText": "Question 38 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 38",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 38",
                "isCorrect": true
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 38",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 38",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 39,
        "questionText": "Question 39 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 39",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 39",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 39",
                "isCorrect": true
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 39",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 40,
        "questionText": "Question 40 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 40",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 40",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 40",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 40",
                "isCorrect": true
            }
        ]
    },
    {
        "questionId": 41,
        "questionText": "Question 41 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 41",
                "isCorrect": true
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 41",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 41",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 41",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 42,
        "questionText": "Question 42 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 42",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 42",
                "isCorrect": true
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 42",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 42",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 43,
        "questionText": "Question 43 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 43",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 43",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 43",
                "isCorrect": true
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 43",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 44,
        "questionText": "Question 44 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 44",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 44",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 44",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 44",
                "isCorrect": true
            }
        ]
    },
    {
        "questionId": 45,
        "questionText": "Question 45 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 45",
                "isCorrect": true
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 45",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 45",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 45",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 46,
        "questionText": "Question 46 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 46",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 46",
                "isCorrect": true
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 46",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 46",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 47,
        "questionText": "Question 47 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 47",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 47",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 47",
                "isCorrect": true
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 47",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 48,
        "questionText": "Question 48 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 48",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 48",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 48",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 48",
                "isCorrect": true
            }
        ]
    },
    {
        "questionId": 49,
        "questionText": "Question 49 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 49",
                "isCorrect": true
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 49",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 49",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 49",
                "isCorrect": false
            }
        ]
    },
    {
        "questionId": 50,
        "questionText": "Question 50 text goes here.",
        "options": [
            {
                "optionId": 1,
                "optionText": "Option 1 for question 50",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionText": "Option 2 for question 50",
                "isCorrect": true
            },
            {
                "optionId": 3,
                "optionText": "Option 3 for question 50",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionText": "Option 4 for question 50",
                "isCorrect": false
            }
        ]
    }
];
  
  
  const renderPage = () => {
    switch (selectedPage) {
      case "GiveExam": {

        return <ExamPage  questions={questions} totalTime={900}/>;
    }


      default:
        return <ComingSoon />;
  
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

export default StudentDashboard;
