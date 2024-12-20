import React from 'react';
import { Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Icon, Text } from '@chakra-ui/react';
import { GoChecklist, GoHistory } from "react-icons/go";

import { PiExam } from "react-icons/pi";
const StudentSideBar = ({ onPageSelect }) => {
    return (
        <Box
            width={{ base: 'full', md: 300 }}
            bg="gray.50"
            p={4}
            height="100vh"
            borderRight="1px solid #ddd"
            overflowY="auto"
        >
            <Accordion allowMultiple>
                <AccordionItem >
                    <AccordionButton>
                        <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                            <Icon as={PiExam} mr={2} />
                            <Text fontWeight="bold">Exams</Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={2}>
                        <AccordionItem border="none">
                            <AccordionButton>
                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={() => onPageSelect("GiveExam")}>
                                    <Icon as={GoChecklist} mr={2} />
                                    <Text>Give Exam</Text>
                                </Box>
                            </AccordionButton>
                        </AccordionItem>
                        <AccordionItem border="none">
                            <AccordionButton>
                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={() => onPageSelect("ExamHistory")}>
                                    <Icon as={GoHistory} mr={2} />
                                    <Text>History</Text>
                                </Box>
                            </AccordionButton>
                        </AccordionItem>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    );
};

export default StudentSideBar;
