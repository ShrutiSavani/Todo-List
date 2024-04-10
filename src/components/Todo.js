import { useState } from 'react';
import PrintData from './PrintData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

const Todo = () => {
  const myArr = [
    {
      id: 1,
      task: 'E-pay project',
      priority: 'priorable',
      dueDate: '11/04/2024',
    },
    {
      id: 2,
      task: 'visit science-fair',
      priority: 'non-priorable',
      dueDate: '01/05/2024',
    },
    {
      id: 3,
      task: 'meeting with client',
      priority: 'priorable',
      dueDate: '10/04/2024',
    },
  ];
  const [date, setDate] = useState(new Date());
  const [array, setArray] = useState(myArr);
  const [searchTaskArray, setSearchTaskArray] = useState(myArr);
  const [task, setTask] = useState('');
  const [count, setCount] = useState(searchTaskArray.length + 1);
  const [priority, setPriority] = useState('');

  const addNew = () => {
    if (task === '' || priority === '' || date === '') {
      alert('!!! All Feilds Are Require !!!');
    } else {
      setCount(count + 1);
      setArray([
        ...array,
        {
          id: count,
          task: task,
          priority: priority,
          dueDate: date.toLocaleDateString('en-GB'),
        },
      ]);
      setSearchTaskArray([
        ...searchTaskArray,
        {
          id: count,
          task: task,
          priority: priority,
          dueDate: date.toLocaleDateString('en-GB'),
        },
      ]);
    }
    setTask('');
  };

  const deleteData = (id) => {
    const clonearray = [...searchTaskArray];
    const deleteObjIndex = clonearray.findIndex((ele) => ele.id == id);
    const deletedObject = clonearray.splice(deleteObjIndex, 1);
    setSearchTaskArray(clonearray);
    setArray(clonearray);
  };

  const handleSearch = (query) => {
    const filteredTask = array.filter((todo) => {
      return todo.task.toLowerCase().includes(query.toLowerCase());
    });
    setSearchTaskArray(filteredTask);
  };

  const change = (e) => {
    setTask(e.target.value);
  };

  const handlepriorityChange = (e) => {
    setPriority(e.target.value);
  };

  return (
    <Center>
      <Flex
        gap={{ base: '40px', sm: '20px', lg: '40px' }}
        mt="60px"
        px="10px"
        fontSize={{ base: '12px', sm: '14px', md: '16px' }}
        flexDir={{ base: 'column', lg: 'row' }}
      >
        <Flex flexDir="column" border="1px solid #1A365D" h="min-content">
          <TableContainer>
            <Table>
              <Tbody>
                <Tr>
                  <Td>Task :</Td>
                  <Td>
                    <Input value={task} onChange={change}></Input>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Priority : </Td>
                  <Td>
                    <RadioGroup>
                      <Stack direction="row">
                        <Radio
                          defaultChecked
                          value="priorable"
                          onChange={handlepriorityChange}
                        >
                          priorable
                        </Radio>
                        <Radio
                          value="non-priorable"
                          onChange={handlepriorityChange}
                        >
                          non-priorable
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </Td>
                </Tr>
                <Tr>
                  <Td>DueDate :</Td>
                  <Td>
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                    />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Button
            bg="blue.700"
            color="white"
            _hover={{ bg: '#1A365D' }}
            borderRadius="none"
            onClick={addNew}
          >
            ADD
          </Button>
        </Flex>

        <Box
          maxW={{ md: '600px' }}
          boxShadow={{ base: 'none', lg: '20px 20px 50px #1A365D' }}
          border={{ base: '1px solid black', lg: 'none' }}
        >
          <TableContainer>
            <Table>
              <Tbody>
                <Tr>
                  <Td>
                    <Text color="blue.900">Filter Task :</Text>
                  </Td>
                  <Td>
                    <Input
                      onChange={(e) => handleSearch(e.target.value)}
                    ></Input>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

          <TableContainer
            maxH={{ base: '46vh', md: '75vh' }}
            overflowY="auto"
            overflowX="hidden"
            h="fit-content"
          >
            <Table>
              <Thead>
                <Tr>
                  <Th>task</Th>
                  <Th>priority</Th>
                  <Th>dueDate</Th>
                </Tr>
              </Thead>
              <Tbody>
                {searchTaskArray.map((ele, i) => (
                  <PrintData
                    key={i}
                    data={ele}
                    deleteData={deleteData}
                    priority={ele.priority}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </Center>
  );
};
export default Todo;
