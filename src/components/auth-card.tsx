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

import { useLogin, LoginParams, courseList, uuid } from '@/models/global'
import { useState } from 'react'

const AuthCard = () => {
  const [userID, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const { handleLogin } = useLogin()
  const handleClick = () => {
    if (userID === '' || password === '') {
      alert('请输入学号和密码')
      return
    }
    handleLogin({ userID, password } as LoginParams)
  }
  return (
    <Card maxWidth={300}>
      <CardHeader>
        <Heading>
          <Center>CoursePrettier</Center>
        </Heading>
      </CardHeader>
      <CardBody>
        <Container>
          <Box>
            <Text>学号: </Text>
            <Input
              placeholder="请输入你的学号"
              type="number"
              onChange={(e) => {
                setUserId(e.target.value)
              }}
            />
          </Box>
          <Box>
            <Text>Password:</Text>
            <Input
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </Box>
          <Button onClick={handleClick}>Login</Button>
        </Container>
      </CardBody>
    </Card>
  )
}
export default AuthCard
