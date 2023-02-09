import { useMutation } from 'react-query'
import { CourseList, CourseUnit, CourseItem } from '@/models/course-table'
import { useRouter } from 'next/router'
import axios, { AxiosResponse } from 'axios'

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

const baseUrl = 'http://localhost:8000'

export let courseList: CourseList = [] as CourseList
export let uuid: string = ''

/*
api: /api/login
*/
export const useLogin = () => {
  const router = useRouter()

  const loginMutation = useMutation((data: LoginParams) => {
    return axios.post<LoginResponse>(baseUrl + '/api/login', {
      userID: data.userID,
      password: data.password,
    })
  })

  const handleLogin = (data: LoginParams) => {
    loginMutation.mutate(data, {
      onSuccess: (res: AxiosResponse<LoginResponse>) => {
        /* Parse res['table'] to CourseList */
        courseList = res.data.table
        uuid = res.data.id
        router.push('/table')
      },
      onError: (err) => {
        console.log(err)
      },
    })
  }

  return {
    handleLogin,
  }
}
