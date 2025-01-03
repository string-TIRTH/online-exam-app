import React from 'react';
import { Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Icon, Text } from '@chakra-ui/react';
import { FaUsers, FaUserPlus, FaSearch,FaChalkboardTeacher  } from 'react-icons/fa';
import { PiStudent } from 'react-icons/pi';
import { LuMessageCircleQuestion } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { ImConfused } from "react-icons/im";
import { MdOutlineTypeSpecimen } from "react-icons/md";
import { RiQuestionnaireLine } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { FaUsersGear } from "react-icons/fa6";
import { CgAddR } from "react-icons/cg";
import { BiAddToQueue } from "react-icons/bi";
const AdminSideBar = ({ onPageSelect }) => {
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
                            <Icon as={FaUsers} mr={2} />
                            <Text fontWeight="bold">User Management</Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={2}>
                        <Accordion allowMultiple>
                            <AccordionItem border="1px" borderRadius={5}>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                                        <Icon as={PiStudent} mr={2} />
                                        <Text fontWeight="bold">Student</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={2}>
                                    <Accordion allowMultiple>
                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={() => onPageSelect("AddStudent")}>
                                                    <Icon as={FaUserPlus} mr={2} />
                                                    <Text>Add</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>

                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={() => onPageSelect("AddStudentBulk")}>
                                                    <Icon as={FaUserPlus} mr={2} />
                                                    <Text>Add With CSV</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>

                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={() => onPageSelect("ListStudents")}>
                                                    <Icon as={FaSearch} mr={2} />
                                                    <Text>Search</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>
                                    </Accordion>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </AccordionPanel>
                    <AccordionPanel pb={2}>
                        <Accordion allowMultiple>
                            <AccordionItem border="1px" borderRadius={5}>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                                        <Icon as={FaChalkboardTeacher} mr={2} />
                                        <Text fontWeight="bold">Examiner</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={2}>
                                    <Accordion allowMultiple>
                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={()=>onPageSelect("AddExaminer")}>
                                                    <Icon as={FaUserPlus} mr={2} />
                                                    <Text>Add</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>

                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={()=>onPageSelect("ListExaminers")}>
                                                    <Icon as={FaSearch} mr={2} />
                                                    <Text>Search</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>
                                    </Accordion>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </AccordionPanel>
                    <AccordionPanel pb={2}>
                        <Accordion allowMultiple>
                            <AccordionItem border="1px" borderRadius={5}>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                                        <Icon as={FaUsersGear } mr={2} />
                                        <Text fontWeight="bold">Role</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={2}>
                                    <Accordion allowMultiple>
                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={() => onPageSelect("AddRole")}>
                                                    <Icon as={FaUserPlus} mr={2} />
                                                    <Text>Add</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>

                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={() => onPageSelect("ListRoles")}>
                                                    <Icon as={FaSearch} mr={2} />
                                                    <Text>Search</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>
                                    </Accordion>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton>
                        <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                            <Icon as={RiQuestionnaireLine} mr={2} />
                            <Text fontWeight="bold">Question Management</Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={2}>
                        <Accordion allowMultiple>
                            <AccordionItem border="1px" borderRadius={5}>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                                        <Icon as={LuMessageCircleQuestion} mr={2} />
                                        <Text fontWeight="bold">Question</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={2}>
                                    <Accordion allowMultiple>
                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={() => onPageSelect("AddQuestion")}>
                                                    <Icon as={CgAddR} mr={2} />
                                                    <Text>Add</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>
                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={() => onPageSelect("AddQuestionBulk")}>
                                                    <Icon as={BiAddToQueue} mr={2} />
                                                    <Text>Add With CSV</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>
                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={() => onPageSelect("ListQuestion")}>
                                                    <Icon as={FaSearch} mr={2} />
                                                    <Text>Search</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>
                                    </Accordion>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </AccordionPanel>
                    <AccordionPanel pb={2}>
                        <Accordion allowMultiple>
                            <AccordionItem border="1px" borderRadius={5}>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                                        <Icon as={BiCategory} mr={2} />
                                        <Text fontWeight="bold">Category</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={2}>
                                    <Accordion allowMultiple>
                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={() => onPageSelect("AddCategory")}>
                                                    <Icon as={FaUserPlus} mr={2} />
                                                    <Text>Add</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>

                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={() => onPageSelect("ListCategory")}>
                                                    <Icon as={FaSearch} mr={2} />
                                                    <Text>Search</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>
                                    </Accordion>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </AccordionPanel>
                    <AccordionPanel pb={2}>
                        <Accordion allowMultiple>
                            <AccordionItem border="1px" borderRadius={5}>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                                        <Icon as={ImConfused} mr={2} />
                                        <Text fontWeight="bold">Difficulty</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={2}>
                                    <Accordion allowMultiple>
                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={() => onPageSelect("AddDifficulty")}>
                                                    <Icon as={FaUserPlus} mr={2} />
                                                    <Text>Add</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>

                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={() => onPageSelect("ListDifficulty")}>
                                                    <Icon as={FaSearch} mr={2} />
                                                    <Text>Search</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>
                                    </Accordion>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </AccordionPanel>
                    <AccordionPanel pb={2}>
                        <Accordion allowMultiple>
                            <AccordionItem border="1px" borderRadius={5}>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                                        <Icon as={MdOutlineTypeSpecimen} mr={2} />
                                        <Text fontWeight="bold">Question Type</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={2}>
                                    <Accordion allowMultiple>
                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={() => onPageSelect("AddQuestionType")}>
                                                    <Icon as={FaUserPlus} mr={2} />
                                                    <Text>Add</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>

                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={() => onPageSelect("ListQuestionType")}>
                                                    <Icon as={FaSearch} mr={2} />
                                                    <Text>Search</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>
                                    </Accordion>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton>
                        <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                            <Icon as={RiQuestionnaireLine} mr={2} />
                            <Text fontWeight="bold">Exam Management</Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={2}>
                        <Accordion allowMultiple>
                            <AccordionItem border="1px" borderRadius={5}>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" >
                                        <Icon as={LuMessageCircleQuestion} mr={2} />
                                        <Text fontWeight="bold">Exam</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={2}>
                                    <Accordion allowMultiple>
                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={()=>onPageSelect("AddExam")}>
                                                    <Icon as={FaUserPlus} mr={2} />
                                                    <Text>Add</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>

                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={()=>onPageSelect("ListExam")}>
                                                    <Icon as={FaSearch} mr={2} />
                                                    <Text>Search</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>
                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" onClick={()=>onPageSelect("ListResult")}>
                                                    <Icon as={TbReportAnalytics } mr={2} />
                                                    <Text>View Result</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>
                                    </Accordion>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    );
};

export default AdminSideBar;
