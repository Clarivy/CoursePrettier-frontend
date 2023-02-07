import { Container } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import CourseTable from '@/components/course-table'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>CousePrettier</title>
        <meta name="description" content="CousePrettier" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CourseTable></CourseTable>
    </>
  )
}
