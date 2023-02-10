import {
  Button,
  Input,
  Text,
  Box,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Checkbox,
  Stack,
  Link,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'

import { useLogin, LoginParams, courseList, uuid } from '@/models/global'
import { useState } from 'react'
import NavBar from './navbar'

const AuthCard = () => {
  const [userID, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const { handleLogin, loading } = useLogin()
  const toast = useToast()
  const handleClick = () => {
    if (userID === '' || password === '') {
      toast({
        title: '错误',
        description: '学号或密码不能为空',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }
    handleLogin({ userID, password } as LoginParams)
  }
  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>登录你的ids账户</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            CoursePrettier 使用上科大统一认证进行验证
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="id">
              <FormLabel>学号</FormLabel>
              <Input
                type="number"
                onChange={(e) => {
                  setUserId(e.target.value)
                }}
                value={userID}
              />
            </FormControl>
            <FormControl id="password" onSubmit={handleClick}>
              <FormLabel>Eams 密码</FormLabel>
              <Input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                value={password}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleClick()
                  }
                }}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleClick}
                isLoading={loading}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
export default AuthCard
