/*
    CourseItem: item in a unit. 
*/
type CourseItem = {
  teacherName: string
  courseId: string
  courseName: string
  roomId: string
  roomName: string
  vaildWeeks: string
  taskId: string | null
}

type CourseList = CourseItem[][]

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

export const ExampleCourseData: CourseList = [
  [
    {
      teacherName: '赵登吉',
      courseId: '2586(CS101.01)',
      courseName: '算法与数据结构(CS101.01)',
      roomId: '230',
      roomName: '教学中心302',
      vaildWeeks: '00000000011111111000000000000000000000000000000000000',
      taskId: null,
    },
    {
      teacherName: '耿浩',
      courseId: '2586(CS101.01)',
      courseName: '算法与数据结构(CS101.01)',
      roomId: '230',
      roomName: '教学中心302',
      vaildWeeks: '01111111100000000000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '赵登吉',
      courseId: '2586(CS101.01)',
      courseName: '算法与数据结构(CS101.01)',
      roomId: '230',
      roomName: '教学中心302',
      vaildWeeks: '00000000011111111000000000000000000000000000000000000',
      taskId: null,
    },
    {
      teacherName: '耿浩',
      courseId: '2586(CS101.01)',
      courseName: '算法与数据结构(CS101.01)',
      roomId: '230',
      roomName: '教学中心302',
      vaildWeeks: '01111111100000000000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '盖景鹏',
      courseId: '2023(BIO1011.02)',
      courseName: '现代生命科学导论C(BIO1011.02)',
      roomId: '238',
      roomName: '教学中心406',
      vaildWeeks: '00000000011111111000000000000000000000000000000000000',
      taskId: null,
    },
    {
      teacherName: '张晨璐',
      courseId: '2023(BIO1011.02)',
      courseName: '现代生命科学导论C(BIO1011.02)',
      roomId: '238',
      roomName: '教学中心406',
      vaildWeeks: '01111111100000000000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '盖景鹏',
      courseId: '2023(BIO1011.02)',
      courseName: '现代生命科学导论C(BIO1011.02)',
      roomId: '238',
      roomName: '教学中心406',
      vaildWeeks: '00000000011111111000000000000000000000000000000000000',
      taskId: null,
    },
    {
      teacherName: '张晨璐',
      courseId: '2023(BIO1011.02)',
      courseName: '现代生命科学导论C(BIO1011.02)',
      roomId: '238',
      roomName: '教学中心406',
      vaildWeeks: '01111111100000000000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [],
  [],
  [
    {
      teacherName: '郑杰',
      courseId: '2584(CS177H.01)',
      courseName: '生物信息学：软件开发与应用(CS177H.01)',
      roomId: '-1',
      roomName: '停课',
      vaildWeeks: '00000000100000000000000000000000000000000000000000000',
      taskId: null,
    },
    {
      teacherName: '郑杰',
      courseId: '2584(CS177H.01)',
      courseName: '生物信息学：软件开发与应用(CS177H.01)',
      roomId: '222',
      roomName: '信息学院1D-108',
      vaildWeeks: '01111111011110000000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '郑杰',
      courseId: '2584(CS177H.01)',
      courseName: '生物信息学：软件开发与应用(CS177H.01)',
      roomId: '-1',
      roomName: '停课',
      vaildWeeks: '00000000100000000000000000000000000000000000000000000',
      taskId: null,
    },
    {
      teacherName: '郑杰',
      courseId: '2584(CS177H.01)',
      courseName: '生物信息学：软件开发与应用(CS177H.01)',
      roomId: '222',
      roomName: '信息学院1D-108',
      vaildWeeks: '01111111011110000000000000000000000000000000000000000',
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
      teacherName: '邵子瑜',
      courseId: '5608(SI140A.01)',
      courseName: '面向信息科学的概率论与数理统计(SI140A.01)',
      roomId: '229',
      roomName: '教学中心301',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '邵子瑜',
      courseId: '5608(SI140A.01)',
      courseName: '面向信息科学的概率论与数理统计(SI140A.01)',
      roomId: '229',
      roomName: '教学中心301',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [],
  [],
  [
    {
      teacherName: '李权',
      courseId: '5305(ARTS1422.01)',
      courseName: '数据可视化(ARTS1422.01)',
      roomId: '1094',
      roomName: '创艺学院E307',
      vaildWeeks: '01111111111110000000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '李权',
      courseId: '5305(ARTS1422.01)',
      courseName: '数据可视化(ARTS1422.01)',
      roomId: '1094',
      roomName: '创艺学院E307',
      vaildWeeks: '01111111111110000000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [],
  [
    {
      teacherName: 'Goodin Brett Garrett',
      courseId: '4771(GEHA1114.02)',
      courseName: '1770年到1920年间的美国史(GEHA1114.02)',
      roomId: '236',
      roomName: '教学中心404',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: 'Goodin Brett Garrett',
      courseId: '4771(GEHA1114.02)',
      courseName: '1770年到1920年间的美国史(GEHA1114.02)',
      roomId: '236',
      roomName: '教学中心404',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [],
  [],
  [
    {
      teacherName: '赵登吉',
      courseId: '2586(CS101.01)',
      courseName: '算法与数据结构(CS101.01)',
      roomId: '230',
      roomName: '教学中心302',
      vaildWeeks: '00000000011111111000000000000000000000000000000000000',
      taskId: null,
    },
    {
      teacherName: '耿浩',
      courseId: '2586(CS101.01)',
      courseName: '算法与数据结构(CS101.01)',
      roomId: '230',
      roomName: '教学中心302',
      vaildWeeks: '01111111100000000000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '赵登吉',
      courseId: '2586(CS101.01)',
      courseName: '算法与数据结构(CS101.01)',
      roomId: '230',
      roomName: '教学中心302',
      vaildWeeks: '00000000011111111000000000000000000000000000000000000',
      taskId: null,
    },
    {
      teacherName: '耿浩',
      courseId: '2586(CS101.01)',
      courseName: '算法与数据结构(CS101.01)',
      roomId: '230',
      roomName: '教学中心302',
      vaildWeeks: '01111111100000000000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '盖景鹏',
      courseId: '2023(BIO1011.02)',
      courseName: '现代生命科学导论C(BIO1011.02)',
      roomId: '238,237',
      roomName: '教学中心406,教学中心405',
      vaildWeeks: '00101010101010101000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '盖景鹏',
      courseId: '2023(BIO1011.02)',
      courseName: '现代生命科学导论C(BIO1011.02)',
      roomId: '238,237',
      roomName: '教学中心406,教学中心405',
      vaildWeeks: '00101010101010101000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '刘文武',
      courseId: '1561(GEPE1032.01)',
      courseName: '武术 I(GEPE1032.01)',
      roomId: '1414',
      roomName: '武术房',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '刘文武',
      courseId: '1561(GEPE1032.01)',
      courseName: '武术 I(GEPE1032.01)',
      roomId: '1414',
      roomName: '武术房',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '郑杰',
      courseId: '2584(CS177H.01)',
      courseName: '生物信息学：软件开发与应用(CS177H.01)',
      roomId: '-1',
      roomName: '停课',
      vaildWeeks: '00000000100000000000000000000000000000000000000000000',
      taskId: null,
    },
    {
      teacherName: '郑杰',
      courseId: '2584(CS177H.01)',
      courseName: '生物信息学：软件开发与应用(CS177H.01)',
      roomId: '222',
      roomName: '信息学院1D-108',
      vaildWeeks: '01111111011110000000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '郑杰',
      courseId: '2584(CS177H.01)',
      courseName: '生物信息学：软件开发与应用(CS177H.01)',
      roomId: '-1',
      roomName: '停课',
      vaildWeeks: '00000000100000000000000000000000000000000000000000000',
      taskId: null,
    },
    {
      teacherName: '郑杰',
      courseId: '2584(CS177H.01)',
      courseName: '生物信息学：软件开发与应用(CS177H.01)',
      roomId: '222',
      roomName: '信息学院1D-108',
      vaildWeeks: '01111111011110000000000000000000000000000000000000000',
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
      teacherName: '邵子瑜',
      courseId: '5608(SI140A.01)',
      courseName: '面向信息科学的概率论与数理统计(SI140A.01)',
      roomId: '229',
      roomName: '教学中心301',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '邵子瑜',
      courseId: '5608(SI140A.01)',
      courseName: '面向信息科学的概率论与数理统计(SI140A.01)',
      roomId: '229',
      roomName: '教学中心301',
      vaildWeeks: '01111111111111111000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [],
  [],
  [
    {
      teacherName: '李权',
      courseId: '5305(ARTS1422.01)',
      courseName: '数据可视化(ARTS1422.01)',
      roomId: '1094',
      roomName: '创艺学院E307',
      vaildWeeks: '01111111111110000000000000000000000000000000000000000',
      taskId: null,
    },
  ],
  [
    {
      teacherName: '李权',
      courseId: '5305(ARTS1422.01)',
      courseName: '数据可视化(ARTS1422.01)',
      roomId: '1094',
      roomName: '创艺学院E307',
      vaildWeeks: '01111111111110000000000000000000000000000000000000000',
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
  { name: '第1节', time: '8:15 - 9:00' },
  { name: '第2节', time: '9:10 - 9:55' },
  { name: '第3节', time: '10:15 - 11:00' },
  { name: '第4节', time: '11:10 - 11:55' },
  { name: '第5节', time: '13:00 - 13:45' },
  { name: '第6节', time: '13:55 - 14:40' },
  { name: '第7节', time: '15:00 - 15:45' },
  { name: '第8节', time: '15:55 - 16:40' },
  { name: '第9节', time: '16:50 - 17:35' },
  { name: '第10节', time: '18:00 - 18:45' },
  { name: '第11节', time: '18:55 - 19:40' },
  { name: '第12节', time: '19:50 - 20:35' },
  { name: '第13节', time: '20:45 - 21:30' },
]

export const ColumnHeaderData = [
  '节次/周次',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
  '星期日',
]
