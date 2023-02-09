import { Container } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import CourseTable from '@/components/course-table'
import NavBar from '@/components/navbar'
import { useRouter } from 'next/router'
import { uuid, courseList } from '@/models/global'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    if (courseList.length === 0) {
      router.push('/')
    }
  })
  if (courseList.length === 0) {
    return <></>
  }
  return (
    <>
      <Head>
        <title>CousePrettier</title>
        <meta name="description" content="CousePrettier" />
        <meta name="viewport" content="width=1000" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar isLogin={true}></NavBar>
      <CourseTable></CourseTable>
    </>
  )
}
