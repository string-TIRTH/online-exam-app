import React from 'react';
import { Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Icon, Text } from '@chakra-ui/react';
import { FaUsers, FaUserPlus, FaSearch,FaChalkboardTeacher  } from 'react-icons/fa';
import { PiStudent } from 'react-icons/pi';
import { LuMessageCircleQuestion } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { ImConfused } from "react-icons/im";
import { MdOutlineTypeSpecimen } from "react-icons/md";
import { RiQuestionnaireLine } from "react-icons/ri";
const AdminSideBar = ({ onPageSelect }) => {
    return (
        <Box
            width={{ base: 'full', md: 256 }}
            bg="gray.50"
            p={4}
            height="100vh"
            borderRight="1px solid #ddd"
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
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
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
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                                                    <Icon as={FaUserPlus} mr={2} />
                                                    <Text>Add</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>

                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
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
                                                    <Icon as={FaUserPlus} mr={2} />
                                                    <Text>Add</Text>
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
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
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
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
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
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
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
                                    <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                                        <Icon as={LuMessageCircleQuestion} mr={2} />
                                        <Text fontWeight="bold">Exam</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={2}>
                                    <Accordion allowMultiple>
                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                                                    <Icon as={FaUserPlus} mr={2} />
                                                    <Text>Add</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>

                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
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
                                        <Text fontWeight="bold">Exam Questions</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={2}>
                                    <Accordion allowMultiple>
                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                                                    <Icon as={FaUserPlus} mr={2} />
                                                    <Text>Add</Text>
                                                </Box>
                                            </AccordionButton>
                                        </AccordionItem>

                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
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
            </Accordion>
        </Box>
    );
};

export default AdminSideBar;
