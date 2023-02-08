import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Text,
  Box,
  Divider,
  Flex,
  VStack,
} from '@chakra-ui/react'
import { CourseItem, CourseUnit } from '@/models/course-table'

type Props = {
  unit: CourseUnit
}

const CourseCard = (props: Props) => {
  const CourseCardBody = () => {
    if (props.unit.length === 0) return <></>
    return props.unit.map((item, index) => {
      return (
        <VStack key={index} alignItems="center" spacing={0} textAlign="center">
          <Box overflowWrap="break-word">{item.courseName}</Box>
          <Box>
            {item.teacherName} - {item.roomName}
          </Box>
        </VStack>
      )
    })
  }
  if (props.unit.length === 0) return <></>
  return (
    <Card width={150} wordBreak="break-word" whiteSpace="break-spaces">
      <CardBody py={1} px={1} fontSize="xx-small">
        {CourseCardBody()}
      </CardBody>
    </Card>
  )
}

export default CourseCard
