import { Card, CardBody, CardHeader, CardFooter, Text } from '@chakra-ui/react'
import { CourseItem, CourseUnit } from '@/models/course-table'

type Props = {
  unit: CourseUnit
}

const CourseCard = (props: Props) => {
  const getCardBody = () => {
    if (props.unit.length === 0) return <></>
    return props.unit.map((item, index) => {
      return <Text key={index}>{item.courseName}</Text>
    })
  }

  return (
    <Card>
      <CardBody py={2}>{getCardBody()}</CardBody>
    </Card>
  )
}

export default CourseCard
