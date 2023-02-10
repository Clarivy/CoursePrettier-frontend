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
  useCourseTable,
  RowHeaderData,
  ColumnHeaderData,
  useCardColor,
} from '@/models/course-table'

import CourseCard from './course-card'
import { courseList, uuid } from '@/models/global'
import { useRouter } from 'next/router'
import React from 'react'

const CourseTable = () => {
  const courseTable = useCourseTable(courseList)
  if (courseList.length === 0) {
    return <></>
  }

  const TableRows = (rows: number) => {
    return (
      <Tr key={rows}>
        <Th>
          <Box>
            <Text textAlign="center" fontSize="xs">
              {RowHeaderData[rows].name}
            </Text>
            <Text textAlign="center" fontSize="xs">
              {RowHeaderData[rows].time}
            </Text>
          </Box>
        </Th>
        {courseTable[rows].map((unit, cols) => {
          if (unit.rowSpan === 0) {
            return <React.Fragment key={rows * 7 + cols}></React.Fragment>
          }
          return (
            <Td key={rows * 7 + cols} px={1} rowSpan={unit.rowSpan} width={130}>
              <Flex justify="center" height="90%" margin={1}>
                <CourseCard
                  unit={unit}
                  useCardColor={useCardColor}
                ></CourseCard>
              </Flex>
            </Td>
          )
        })}
      </Tr>
    )
  }

  return (
    <TableContainer maxWidth={1000}>
      <Table variant="simple" size="sm" height="1px">
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
