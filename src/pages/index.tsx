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
  Table,
  Tr,
  Th,
  Thead,
  TableContainer,
  Td,
  Tfoot,
  Tbody,
  TableCaption,
} from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useState } from 'react'

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
      <Container>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}
