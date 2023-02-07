/*
info is like:

"算法与数据结构(CS101.01) (赵登吉)<br>(9-16,教学中心302)<br>算法与数据结构(CS101.01) (耿浩)<br>(1-8,教学中心302)"

We need to split it into:
算法与数据结构(CS101.01)
(赵登吉)
(9-16,教学中心302)
算法与数据结构(CS101.01)
(耿浩)
(1-8,教学中心302)
*/

export const useCourseCard = (info: string | null) => {
  if (info === null) return []
  let result: string[] = []
  let items = info.split('<br>').forEach((item) => {
    if (item) {
      result.push(...item.split(' '))
    }
  })
  return result
}
