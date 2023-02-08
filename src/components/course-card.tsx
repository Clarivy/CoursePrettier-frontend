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
import { CourseUnit } from '@/models/course-table'
import { useColorMode, ColorMode } from '@chakra-ui/react'

type Props = {
  unit: CourseUnit
  useCardColor: (colorMode: ColorMode, courseUnit: CourseUnit) => string
}

const CourseCard = (props: Props) => {
  const { colorMode } = useColorMode()
  const CourseCardBody = () => {
    if (props.unit.items.length === 0) return <></>
    return props.unit.items.map((item, index) => {
      return (
        <VStack key={index} alignItems="center" spacing={0} textAlign="center">
          <Box overflowWrap="break-word" fontWeight="bold">
            <Text>{item.courseName}</Text>
          </Box>
          <Box>
            <Text>
              {item.teacherName} - {item.roomName}
            </Text>
          </Box>
        </VStack>
      )
    })
  }
  if (props.unit.items.length === 0 || props.unit.rowSpan === 0) return <></>
  return (
    <Card
      width={150}
      wordBreak="break-word"
      whiteSpace="break-spaces"
      bgColor={props.useCardColor(colorMode, props.unit)}
    >
      <CardBody py={1} px={2} fontSize="xx-small">
        {CourseCardBody()}
      </CardBody>
    </Card>
  )
}

export default CourseCard
