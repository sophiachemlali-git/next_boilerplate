import React from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { ValidationResult } from '@/hooks/useValidation'

export type TextFieldWithValidationProps = {
  label: string
  type?: string
  validationHook: ValidationResult<string>
  textFieldProps?: TextFieldProps
  hint?: React.ReactNode | string
  placeholder?: string
}

const TextFieldWithValidation: React.FC<TextFieldWithValidationProps> = ({
  label,
  type,
  validationHook,
  hint,
  placeholder,
  textFieldProps = {},
}) => {
  const { value, setValue, isValid } = validationHook

  const hintComponent = hint || `${label} is not valid`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <TextField
      id={label}
      margin="normal"
      required
      fullWidth
      label={label}
      name={label}
      value={value}
      type={type}
      onChange={handleChange}
      error={!isValid}
      placeholder={placeholder}
      helperText={!isValid && hintComponent}
      color="primary"
      InputProps={{
        style: { color: 'primary' },
      }}
      {...textFieldProps}
    />
  )
}

export default TextFieldWithValidation
