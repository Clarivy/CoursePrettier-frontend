import { useMutation } from 'react-query'
import { CourseList, CourseUnit, CourseItem } from '@/models/course-table'
import { useRouter } from 'next/router'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { useToast } from '@chakra-ui/react'
import { setICSData } from './download-ics'
import { useState } from 'react'

export type LoginParams = {
  userID: string
  password: string
}

interface LoginResponse {
  isSuccess: boolean
  message: string
  id: string
  table: CourseList
}

export const baseUrl = 'http://localhost:8000'

export let courseList: CourseList = [] as CourseList
export let uuid: string = ''

/*
api: /api/login
*/
export const useLogin = () => {
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const loginMutation = useMutation((data: LoginParams) => {
    return axios.post<LoginResponse>(baseUrl + '/api/login', {
      userID: data.userID,
      password: data.password,
    })
  })

  const handleLogin = (data: LoginParams) => {
    setLoading(true)
    loginMutation.mutate(data, {
      onSuccess: (res: AxiosResponse<LoginResponse>) => {
        /* Parse res['table'] to CourseList */
        if (!res.data.isSuccess) {
          toast({
            title: '错误',
            description: res.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
          return
        }
        toast({
          title: '成功',
          description: '登录成功',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        courseList = res.data.table
        uuid = res.data.id
        router.push('/table')
      },
      onError: (error: unknown) => {
        console.log(error)
        toast({
          title: '错误',
          description: '服务器异常',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      },
      onSettled: () => {
        setLoading(false)
      },
    })
  }

  return {
    handleLogin,
    loading,
  }
}

export const useLogout = () => {
  const router = useRouter()
  const handleLogout = () => {
    courseList = [] as CourseList
    uuid = ''
    setICSData('')
    router.push('/')
  }
  return {
    handleLogout,
  }
}
