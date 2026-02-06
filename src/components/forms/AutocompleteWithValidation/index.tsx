import React from 'react'
import { Autocomplete, TextField, TextFieldProps } from '@mui/material'
import { isObjectNotEmpty } from '@/utils'
import { ValidationResult } from '@/hooks/useValidation'

export interface AutocompleteWithValidationProps<T> {
  id: string
  label: string
  validationHook: ValidationResult<T>
  options: T[]
  getOptionLabel: (option: T) => string
  textFieldProps?: TextFieldProps
  required?: boolean
  disabled?: boolean
  defaultValue?: T
}

const AutocompleteWithValidation = <T,>({
  id,
  label,
  validationHook,
  options,
  getOptionLabel,
  textFieldProps = {},
  required = true,
  disabled,
}: AutocompleteWithValidationProps<T>) => {
  const { value, setValue, isValid } = validationHook

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: T | null) => {
    setValue(newValue as T)
  }
  let defaultValue = null

  if (typeof value === 'object') {
    defaultValue = isObjectNotEmpty(value as object) ? value : null
  }

  return (
    <Autocomplete
      id={id}
      disablePortal
      disabled={disabled}
      options={options}
      getOptionLabel={getOptionLabel}
      onChange={handleChange}
      value={defaultValue as T}
      renderInput={params => (
        <TextField
          {...params}
          name={label}
          label={label}
          value={value}
          required={required}
          error={!isValid}
          helperText={!isValid && `${label} is not valid`}
          {...textFieldProps}
          InputProps={{
            ...params.InputProps,
            ...textFieldProps.InputProps,
          }}
        />
      )}
    />
  )
}

export default AutocompleteWithValidation
