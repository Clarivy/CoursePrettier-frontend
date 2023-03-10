import { ColorMode } from '@chakra-ui/react'
/*
    CourseItem: item in a unit. 
*/
export type CourseItem = {
  teacherName: string
  courseId: string
  courseName: string
  roomId: string
  roomName: string
  vaildWeeks: string
  taskId: string | null
}

export type CourseList = CourseItem[][]

/*
    CourseUnit: a unit in a course table. A unit is a specific period in a week.
    There are 13 * 7 units in a course table.
    rowSpan: the number of units that this unit should span, default is 1. 
*/
export type CourseUnit = {
  items: CourseItem[]
  rowSpan: number
  str: string
}

/*
    CourseTable: a table-like data that is processed in the shape of (13, 7)
*/
export type CourseTable = CourseUnit[][]

const CourseItemToString = (item: CourseItem): string => {
  return (
    item.courseName +
    item.teacherName +
    item.roomName +
    item.vaildWeeks +
    item.taskId
  )
}

const CourseItemsToString = (items: CourseItem[]): string => {
  let stringItems = items.map((item) => CourseItemToString(item))
  stringItems.sort()
  return stringItems.join('')
}

// Merge two CourseItems, used for de-duplicate items in a unit
const MergeCourseItem = (
  item_1: CourseItem,
  item_2: CourseItem,
  seperator: string = ','
): CourseItem => {
  let result_item: CourseItem = { ...item_1 }
  if (item_1.courseId !== item_2.courseId)
    result_item.courseId += seperator + item_2.courseId
  if (item_1.courseName !== item_2.courseName)
    result_item.courseName += seperator + item_2.courseName
  if (item_1.roomId !== item_2.roomId)
    result_item.roomId += seperator + item_2.roomId
  if (item_1.roomName !== item_2.roomName)
    result_item.roomName += seperator + item_2.roomName
  if (item_1.taskId !== item_2.taskId)
    result_item.taskId += seperator + item_2.taskId
  if (item_1.teacherName !== item_2.teacherName)
    result_item.teacherName += seperator + item_2.teacherName
  return result_item
}

export const useCourseTable = (course_info: CourseList): CourseTable => {
  if (course_info.length !== 91) return []
  let courseTable: CourseTable = Array(13)
    .fill(null)
    .map(() => Array(7).fill(null))
  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 7; j++) {
      let target = course_info[j * 13 + i]
      courseTable[i][j] = {
        items: target,
        rowSpan: 1,
        str: CourseItemsToString(target),
      }
    }
  }
  // Mark the rowSpan of the duplicate items
  for (let j = 0; j < 7; j++) {
    for (let i = 12; i > 0; i--) {
      if (courseTable[i][j].str === '') continue
      if (courseTable[i][j].str === courseTable[i - 1][j].str) {
        courseTable[i - 1][j].rowSpan += courseTable[i][j].rowSpan
        courseTable[i][j].rowSpan = 0
      }
    }
  }
  // Remove duplicate Items in the same unit
  for (let j = 0; j < 7; j++) {
    for (let i = 0; i < 13; i++) {
      if (courseTable[i][j].items.length < 2) continue
      if (courseTable[i][j].rowSpan === 0) continue
      courseTable[i][j].items.sort((lsh, rhs) => {
        if (lsh.courseName < rhs.courseName) return -1
        if (lsh.courseName > rhs.courseName) return 1
        return 1
      })
      let items = courseTable[i][j].items
      for (let k = items.length - 2; k >= 0; k--) {
        if (items[k].courseName === items[k + 1].courseName) {
          items[k] = MergeCourseItem(items[k], items[k + 1])
          items.splice(k + 1, 1)
        }
      }
      courseTable[i][j].items = items
    }
  }
  return courseTable
}

const colorList = {
  light: ['blue.100', 'yellow.100', 'green.100', 'pink.100'],
  dark: ['blue.600', 'yellow.600', 'green.600', 'pink.600'],
}

var colorMap: { [key: string]: { [key: string]: string } } = {
  dark: {},
  light: {},
}
var colorIndex = {
  dark: 0,
  light: 0,
}

export const useCardColor = (
  colorMode: ColorMode,
  courseUnit: CourseUnit
): string => {
  if (courseUnit.str === '') return ''
  if (courseUnit.str in colorMap[colorMode])
    return colorMap[colorMode][courseUnit.str]
  if (colorIndex[colorMode] >= colorList[colorMode].length)
    colorIndex[colorMode] = 0
  colorMap[colorMode][courseUnit.str] =
    colorList[colorMode][colorIndex[colorMode]]
  colorIndex[colorMode]++
  return colorMap[colorMode][courseUnit.str]
}

export const ExampleCourseData: CourseList = [
  [
    {
      teacherName: '?????????',
      courseId: '2164(CS181.01)',
      courseName: '????????????I(CS181.01)',
      roomId: '112',
      roomName: '????????????102',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '?????????',
      courseId: '2164(CS181.01)',
      courseName: '????????????I(CS181.01)',
      roomId: '112',
      roomName: '????????????102',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [],
  [],
  [],
  [],
  [],
  [
    {
      teacherName: '?????????',
      courseId: '1193(GEHA1004.01)',
      courseName: '??????????????????(GEHA1004.01)',
      roomId: '230',
      roomName: '????????????302',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '?????????',
      courseId: '1193(GEHA1004.01)',
      courseName: '??????????????????(GEHA1004.01)',
      roomId: '230',
      roomName: '????????????302',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [],
  [],
  [
    {
      teacherName: '',
      courseId: '1541(CS110P.05)',
      courseName: '?????????????????????I????????????(CS110P.05)',
      roomId: '211',
      roomName: '????????????1B-108',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '',
      courseId: '1541(CS110P.05)',
      courseName: '?????????????????????I????????????(CS110P.05)',
      roomId: '211',
      roomName: '????????????1B-108',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '?????????',
      courseId: '998(CS110.01)',
      courseName: '?????????????????????I(CS110.01)',
      roomId: '229',
      roomName: '????????????301',
      vaildWeeks: '00000000011111111000000000000000000000000000000000000',
      taskId: null,
    },
    {
      teacherName: '?????????',
      courseId: '998(CS110.01)',
      courseName: '?????????????????????I(CS110.01)',
      roomId: '229',
      roomName: '????????????301',
      vaildWeeks: '01111111100000000000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '?????????',
      courseId: '998(CS110.01)',
      courseName: '?????????????????????I(CS110.01)',
      roomId: '229',
      roomName: '????????????301',
      vaildWeeks: '00000000011111111000000000000000000000000000000000000',
      taskId: null,
    },
    {
      teacherName: '?????????',
      courseId: '998(CS110.01)',
      courseName: '?????????????????????I(CS110.01)',
      roomId: '229',
      roomName: '????????????301',
      vaildWeeks: '01111111100000000000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '?????????',
      courseId: '1319(CS172.01)',
      courseName: '???????????????I(CS172.01)',
      roomId: '224',
      roomName: '????????????1D-107',
      vaildWeeks: '01111111111110000000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '?????????',
      courseId: '1319(CS172.01)',
      courseName: '???????????????I(CS172.01)',
      roomId: '224',
      roomName: '????????????1D-107',
      vaildWeeks: '01111111111110000000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [],
  [],
  [],
  [
    {
      teacherName: 'Zainab Mahmood',
      courseId: '5573(GEHA1163.02)',
      courseName: '??????????????????????????????????????????????????????????????????(GEHA1163.02)',
      roomId: '233',
      roomName: '????????????401',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: 'Zainab Mahmood',
      courseId: '5573(GEHA1163.02)',
      courseName: '??????????????????????????????????????????????????????????????????(GEHA1163.02)',
      roomId: '233',
      roomName: '????????????401',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [],
  [],
  [
    {
      teacherName: '',
      courseId: '1016(PHYS1181.02)',
      courseName: '????????????I(PHYS1181.02)',
      roomId: '225',
      roomName: '????????????201',
      vaildWeeks: '00011111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [],
  [
    {
      teacherName: '?????????',
      courseId: '2164(CS181.01)',
      courseName: '????????????I(CS181.01)',
      roomId: '112',
      roomName: '????????????102',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '?????????',
      courseId: '2164(CS181.01)',
      courseName: '????????????I(CS181.01)',
      roomId: '112',
      roomName: '????????????102',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '?????????',
      courseId: '1016(PHYS1181.02)',
      courseName: '????????????I(PHYS1181.02)',
      roomId: '225',
      roomName: '????????????201',
      vaildWeeks: '01010101010101010000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '?????????',
      courseId: '1016(PHYS1181.02)',
      courseName: '????????????I(PHYS1181.02)',
      roomId: '225',
      roomName: '????????????201',
      vaildWeeks: '01010101010101010000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '?????????',
      courseId: '1623(GEPE1033.01)',
      courseName: '?????? II(GEPE1033.01)',
      roomId: '1414',
      roomName: '?????????',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '?????????',
      courseId: '1623(GEPE1033.01)',
      courseName: '?????? II(GEPE1033.01)',
      roomId: '1414',
      roomName: '?????????',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [
    {
      teacherName: '?????????',
      courseId: '998(CS110.01)',
      courseName: '?????????????????????I(CS110.01)',
      roomId: '229',
      roomName: '????????????301',
      vaildWeeks: '00000000011111111000000000000000000000000000000000000',
      taskId: null,
    },
    {
      teacherName: '?????????',
      courseId: '998(CS110.01)',
      courseName: '?????????????????????I(CS110.01)',
      roomId: '229',
      roomName: '????????????301',
      vaildWeeks: '01111111100000000000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '?????????',
      courseId: '998(CS110.01)',
      courseName: '?????????????????????I(CS110.01)',
      roomId: '229',
      roomName: '????????????301',
      vaildWeeks: '00000000011111111000000000000000000000000000000000000',
      taskId: null,
    },
    {
      teacherName: '?????????',
      courseId: '998(CS110.01)',
      courseName: '?????????????????????I(CS110.01)',
      roomId: '229',
      roomName: '????????????301',
      vaildWeeks: '01111111100000000000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '?????????',
      courseId: '1319(CS172.01)',
      courseName: '???????????????I(CS172.01)',
      roomId: '224',
      roomName: '????????????1D-107',
      vaildWeeks: '01111111111110000000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '?????????',
      courseId: '1319(CS172.01)',
      courseName: '???????????????I(CS172.01)',
      roomId: '224',
      roomName: '????????????1D-107',
      vaildWeeks: '01111111111110000000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '??????',
      courseId: '1017(PHYS1111.03)',
      courseName: '????????????I??????(PHYS1111.03)',
      roomId: '285',
      roomName: '???????????? 4-308',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '??????',
      courseId: '1017(PHYS1111.03)',
      courseName: '????????????I??????(PHYS1111.03)',
      roomId: '285',
      roomName: '???????????? 4-308',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '??????',
      courseId: '1017(PHYS1111.03)',
      courseName: '????????????I??????(PHYS1111.03)',
      roomId: '285',
      roomName: '???????????? 4-308',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [],
  [],
  [],
  [
    {
      teacherName: '?????????',
      courseId: '5703(CLPS1001.01)',
      courseName: '?????????????????????(CLPS1001.01)',
      roomId: '494',
      roomName: '???????????? 1-401',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '?????????',
      courseId: '5703(CLPS1001.01)',
      courseName: '?????????????????????(CLPS1001.01)',
      roomId: '494',
      roomName: '???????????? 1-401',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [],
  [],
  [],
  [
    {
      teacherName: '?????????',
      courseId: '1016(PHYS1181.02)',
      courseName: '????????????I(PHYS1181.02)',
      roomId: '225',
      roomName: '????????????201',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '?????????',
      courseId: '1016(PHYS1181.02)',
      courseName: '????????????I(PHYS1181.02)',
      roomId: '225',
      roomName: '????????????201',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
]

export type RowHeader = {
  name: string
  time: string
}

export const RowHeaderData: RowHeader[] = [
  { name: '???1???', time: '8:15 - 9:00' },
  { name: '???2???', time: '9:10 - 9:55' },
  { name: '???3???', time: '10:15 - 11:00' },
  { name: '???4???', time: '11:10 - 11:55' },
  { name: '???5???', time: '13:00 - 13:45' },
  { name: '???6???', time: '13:55 - 14:40' },
  { name: '???7???', time: '15:00 - 15:45' },
  { name: '???8???', time: '15:55 - 16:40' },
  { name: '???9???', time: '16:50 - 17:35' },
  { name: '???10???', time: '18:00 - 18:45' },
  { name: '???11???', time: '18:55 - 19:40' },
  { name: '???12???', time: '19:50 - 20:35' },
  { name: '???13???', time: '20:45 - 21:30' },
]

export const ColumnHeaderData = [
  '??????/??????',
  '?????????',
  '?????????',
  '?????????',
  '?????????',
  '?????????',
  '?????????',
  '?????????',
]
