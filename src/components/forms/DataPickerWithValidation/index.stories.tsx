import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import DatePickerWithValidation, { DatePickerWithValidationProps } from '.'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

export default {
  title: 'Components/Forms/DatePickerWithValidation',
  component: DatePickerWithValidation,
} as Meta

const Template: StoryFn<DatePickerWithValidationProps> = args => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePickerWithValidation {...args} />
  </LocalizationProvider>
)

export const Default = Template.bind({})
Default.args = {
  label: 'Select a date',
  validationHook: {
    value: dayjs(), // Initial value for the story
    setValue: () => {}, // Mock setValue function
    isValid: true, // Mock isValid value
  },
  required: true,
  defaultValue: dayjs(),
}
