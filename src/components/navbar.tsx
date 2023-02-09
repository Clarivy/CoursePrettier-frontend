import { ReactNode } from 'react'
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react'
import { IoMdMoon as MoonIcon, IoMdSunny as SunIcon } from 'react-icons/io'

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

  const getLogo = () => {
    return colorMode === 'dark' ? '/deemos.png' : '/deemos-dark.png'
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
            {props.isLogin ? <Button>导出日历文件</Button> : <></>}
          </HStack>
        </Flex>
      </Box>
    </>
  )
}
