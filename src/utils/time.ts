import dayjs from 'dayjs'

export const formatDate = (inputDate: string, format = 'MM/DD/YYYY') => {
  return dayjs(inputDate).format(format)
}

export const getDate = (date: string) => {
  const formattedDate = dayjs(date).format('MM/DD/YYYY')
  const isMidnight = dayjs(date).format('HH:mm') === '00:00'

  return isMidnight ? formattedDate : `${formattedDate} ${dayjs(date).format('hh:mm A')}`
}
