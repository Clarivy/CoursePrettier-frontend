import {
  Button,
  ButtonGroup,
  Center,
  Container,
  Input,
  Text,
  Box,
  HStack,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
} from '@chakra-ui/react'

const AuthCard = () => {
  return (
    <Card maxWidth={300}>
      <CardHeader>
        <Heading>
          <Center>CoursePrettier</Center>
        </Heading>
      </CardHeader>
      <CardBody>
        <Container>
          <HStack>
            <Text>Username:</Text>
            <Input placeholder="Username" />
          </HStack>
          <HStack>
            <Text>Password:</Text>
            <Input placeholder="Password" />
          </HStack>
          <Button onClick={() => {}}>Login</Button>
        </Container>
      </CardBody>
    </Card>
  )
}
export default AuthCard
