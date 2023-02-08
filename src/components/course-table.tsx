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
} from '@chakra-ui/react'

import { ExampleCourseData, useCourseTable } from '@/models/course-table'
import CourseCard from './course-card'

const CourseTable = () => {
  const courseTable = useCourseTable(ExampleCourseData)

  const getTableRows = (rows: number) => {
    return (
      <Tr key={rows}>
        {courseTable[rows].map((unit, cols) => {
          return (
            <Td key={rows * 7 + cols} px={1} py={1} fontSize="xs">
              <CourseCard unit={unit}></CourseCard>
            </Td>
          )
        })}
      </Tr>
    )
  }

  return (
    <TableContainer width={1200}>
      <Table variant="simple" size="sm">
        <Tbody>
          {courseTable.map((item, index) => {
            return getTableRows(index)
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default CourseTable
