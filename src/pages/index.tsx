import { Center, Container } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import CourseTable from '@/components/course-table'
import NavBar from '@/components/navbar'
import AuthCard from '@/components/auth-card'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>CousePrettier</title>
        <meta name="description" content="CousePrettier" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar isLogin={false}></NavBar>
      <Center>
        <AuthCard></AuthCard>
      </Center>
    </>
  )
}
