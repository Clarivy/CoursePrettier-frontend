import { ReactNode } from 'react'
import {
  Box,
  Flex,
  Link,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
  Heading,
  HStack,
  Text,
  IconButton,
  Tooltip,
} from '@chakra-ui/react'
import {
  IoMdMoon as MoonIcon,
  IoMdSunny as SunIcon,
  IoMdLogOut as LogOutIcon,
} from 'react-icons/io'
import { useDownloadICS, handleDownloadClick } from '@/models/download-ics'
import { useLogout } from '@/models/global'

type Props = {
  isLogin: boolean
}

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
)

export default function NavBar(props: Props) {
  const { colorMode, toggleColorMode } = useColorMode()
  const { data, loading } = useDownloadICS()
  const { handleLogout } = useLogout()

  const afterLogin = () => {
    if (!props.isLogin) return <></>
    return (
      <>
        <Button onClick={handleDownloadClick}>导出日历文件</Button>
        <Tooltip label="登出">
          <IconButton
            onClick={handleLogout}
            aria-label="logout"
            icon={<LogOutIcon />}
          ></IconButton>
        </Tooltip>
      </>
    )
  }

  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack>
            <Heading
              as="h1"
              size="lg"
              bgGradient="linear(to-r, blue.300, yellow.400, pink.200)"
              color="transparent"
              backgroundClip="text"
              style={{ position: 'relative', left: '-2px' }}
            >
              CoursePrettier
            </Heading>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            {afterLogin()}
          </HStack>
        </Flex>
      </Box>
    </>
  )
}
