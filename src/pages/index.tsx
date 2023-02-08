import { Container } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import CourseTable from '@/components/course-table'
import NavBar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>CousePrettier</title>
        <meta name="description" content="CousePrettier" />
        <meta name="viewport" content="width=1000" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar></NavBar>
      <CourseTable></CourseTable>
    </>
  )
}
