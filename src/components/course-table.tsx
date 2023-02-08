import {
  Table,
  Tr,
  Th,
  Thead,
  TableContainer,
  Td,
  Tfoot,
  Tbody,
  TableCaption,
  Text,
  Box,
  Flex,
} from '@chakra-ui/react'

import {
  ExampleCourseData,
  useCourseTable,
  RowHeaderData,
  ColumnHeaderData,
} from '@/models/course-table'
import CourseCard from './course-card'

const CourseTable = () => {
  const courseTable = useCourseTable(ExampleCourseData)

  const TableRows = (rows: number) => {
    return (
      <Tr key={rows}>
        <Td>
          <Box>
            <Text textAlign="center">{RowHeaderData[rows].name}</Text>
            <Text textAlign="center">{RowHeaderData[rows].time}</Text>
          </Box>
        </Td>
        {courseTable[rows].map((unit, cols) => {
          if (unit.rowSpan === 0) {
            return <></>
          }
          return (
            <Td key={rows * 7 + cols} px={1} py={1} rowSpan={unit.rowSpan}>
              <Flex justify="center">
                <CourseCard unit={unit}></CourseCard>
              </Flex>
            </Td>
          )
        })}
      </Tr>
    )
  }

  return (
    <TableContainer width={1200}>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            {ColumnHeaderData.map((item, index) => {
              return (
                <Th key={index} textAlign="center">
                  {item}
                </Th>
              )
            })}
          </Tr>
        </Thead>
        <Tbody>
          {courseTable.map((item, index) => {
            return TableRows(index)
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default CourseTable
