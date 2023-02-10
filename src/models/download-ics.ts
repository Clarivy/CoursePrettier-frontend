import { useQuery } from 'react-query'
import { uuid, baseUrl } from './global'
import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'

export type ICSParams = {
  id: string
}

export type ICSResponse = string

export type AxiosICSResponse = AxiosResponse<ICSResponse>

const downloadICS = () =>
  axios.get<ICSResponse>(baseUrl + '/api/ics', { params: { id: uuid } })

let ics_data = ''

export const useDownloadICS = () => {
  const { status, data, error } = useQuery(uuid, downloadICS)
  const toast = useToast()
  if (ics_data !== '') {
    return {
      loading: false,
      data: ics_data,
    }
  }
  let loading = false
  if (status === 'loading') {
    loading = true
  }
  if (status === 'error') {
    loading = false
    toast({
      title: '错误',
      description: '下载失败',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }
  if (status === 'success') {
    loading = false
    toast({
      title: '成功',
      description: '下载成功',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    ics_data = data.data
  }
  return {
    loading,
    data: ics_data,
  }
}

export const handleDownloadClick = () => {
  if (ics_data === '') {
    return
  }
  const blob = new Blob([ics_data], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const download_ref = document.createElement('a')
  download_ref.setAttribute('href', url)
  download_ref.setAttribute('download', 'course.ics')
  download_ref.click()
}
