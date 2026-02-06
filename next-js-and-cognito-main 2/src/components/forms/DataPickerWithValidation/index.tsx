import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TextFieldProps } from '@mui/material/TextField'
import { ValidationResult } from '@/hooks/useValidation'
import dayjs, { Dayjs } from 'dayjs'

export type DatePickerWithValidationProps = {
  label: string
  validationHook: ValidationResult<Dayjs | null>
  textFieldProps?: TextFieldProps
  required?: boolean
  defaultValue?: Dayjs
  disabled?: boolean
}

const DatePickerWithValidation = ({
  label,
  validationHook,
  textFieldProps = {},
  required = true,
  disabled = false,
  defaultValue = dayjs(new Date()),
}: DatePickerWithValidationProps) => {
  const { value, setValue, isValid } = validationHook

  const handleDateChange = (date: Dayjs | null) => {
    setValue(date)
  }

  return (
    <DatePicker
      label={label}
      value={value}
      onChange={handleDateChange}
      defaultValue={defaultValue}
      disabled={disabled}
      sx={{ width: '100%' }}
      slotProps={{
        textField: {
          error: !isValid,
          helperText: !isValid && `${label} is not valid`,
          required: required || false,
          name: label,
          ...textFieldProps,
        },
      }}
    />
  )
}

export default DatePickerWithValidation
