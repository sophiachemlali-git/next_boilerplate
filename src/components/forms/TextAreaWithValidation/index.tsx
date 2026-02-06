import React from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { ValidationResult } from '@/hooks/useValidation'

export type TextAreaWithValidationProps = {
  label: string
  type?: string
  validationHook: ValidationResult<string>
  textFieldProps?: TextFieldProps
  hint?: React.ReactNode | string
  placeholder?: string
  required?: boolean
  rows?: number | string | undefined
  disabled?: boolean
}

const TextAreaWithValidation: React.FC<TextAreaWithValidationProps> = ({
  label,
  type,
  validationHook,
  hint,
  placeholder,
  textFieldProps = {},
  required = true,
  disabled = false,
  rows,
}) => {
  const { value, setValue, isValid } = validationHook

  const hintComponent = hint || `${label} is not valid`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <TextField
      id={label}
      required={required}
      fullWidth
      label={label}
      name={label}
      value={value}
      type={type}
      onChange={handleChange}
      error={!isValid}
      placeholder={placeholder}
      helperText={!isValid && hintComponent}
      multiline
      rows={rows}
      disabled={disabled}
      color="primary"
      InputProps={{
        style: { color: 'primary' },
      }}
      {...textFieldProps}
    />
  )
}

export default TextAreaWithValidation
