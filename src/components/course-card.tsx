import { Card, CardBody, CardHeader, CardFooter, Text } from '@chakra-ui/react'
import { useCourseCard } from '@/models/course-card'

type Props = {
  item: string | null
}

const CourseCard = (props: Props) => {
  const items = useCourseCard(props.item)
  const getCardBody = () => {
    if (items.length === 0) return <></>
    return items.map((item, index) => {
      return <Text key={index}>{item}</Text>
    })
  }

  return (
    <Card>
      <CardBody>{getCardBody()}</CardBody>
    </Card>
  )
}

export default CourseCard
