import React, { useState, useEffect, useMemo } from 'react'
import { type Dayjs } from 'dayjs'

/**
 * Type definition for the validation result:
 * - value: Represents the validated value of generic type T.
 * - isValid: A boolean indicating the validity of the value.
 * - errors: An optional array of strings or null, representing validation errors.
 * - setValue: A React state setter function, typed to accept actions for updating the value.
 */
export type ValidationResult<T> = {
  value: T
  isValid: boolean
  errors?: string[] | null
  setValue: React.Dispatch<React.SetStateAction<T>>
}

export type PasswordValidations = {
  text: string
  complete: boolean
}

export type PasswordValidationResult = {
  isValid: boolean
  errors: string[] | null
}

/**
 * Validates the strength of the password based on custom rules.
 * @param text - The password text to be validated.
 * @param passwordInitialsValidations - Initial set of password validation rules.
 * @param matchValue - Optional value to match against (e.g., confirm password).
 * @returns Updated set of password validation rules.
 */
const validPasswordRules = (
  text: string,
  passwordInitialsValidations: PasswordValidations[],
  matchValue: string = ''
): PasswordValidations[] => {
  const newRules: PasswordValidations[] = [...passwordInitialsValidations]

  // Rule: Minimum 8 characters
  newRules[0].complete = text.length >= 8

  // Rule: At least one uppercase letter
  newRules[1].complete = new RegExp('.*[A-Z].*').test(text)

  // Rule: At least one special character
  newRules[2].complete = new RegExp('.*[!@#$%^&*()\\-_=+[\\]{}|;:\'",.<>/?].*').test(text)

  // Rule: Match against another value (if provided)
  if (matchValue && newRules[3]) {
    newRules[3].complete = text === matchValue
  }

  return newRules
}

/**
 * Validates the password and provides information about its strength.
 * @param value - The password text to be validated.
 * @param matchValue - Optional value to match against (e.g., confirm password).
 * @returns Object with the validity indicator and a list of errors.
 */
const validatePassword = (value: string, matchValue: string = ''): PasswordValidationResult => {
  if (value.length === 0) {
    return { isValid: true, errors: null }
  }

  const rules = [
    { text: 'Minimum 8 characters', complete: false },
    { text: 'At least one uppercase letter', complete: false },
    { text: 'At least one special character', complete: false },
  ]

  const result: PasswordValidationResult = {
    isValid: true,
    errors: [],
  }

  if (matchValue) {
    rules.push({ text: 'Passwords do not match', complete: false })
  }

  const passwordValidations = validPasswordRules(value, rules, matchValue)
  result.isValid = passwordValidations.every(rule => rule.complete)
  result.errors = passwordValidations.filter(rule => !rule.complete).map(rule => rule.text)

  return result
}

// Validation function for email
const validateEmail = (value: string): boolean => {
  return value.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

// Validation function for username
const validateUsername = (value: string): boolean => {
  return value.length === 0 || value.length >= 8
}

// Validation function for text
const validateText = (value: string): boolean => {
  return value.length === 0 || value.length >= 2
}

// Validation function for code
const validateCode = (value: string): boolean => {
  return value.length === 0 || value.length >= 6
}

// Validation function for dates
const validateDate = (date: Dayjs | null): boolean => {
  if (date === null) {
    return true
  }

  const currentDate = date as Dayjs
  return currentDate && currentDate.isValid()
}

// Validation function for objects
const validateObject = <T>(obj: T): boolean => {
  return obj !== null && obj !== undefined
}

/**
 * Custom hook for validating email.
 * @param initialValue - Initial value of the email.
 * @returns Object with the current value, function to set the value, and a validity indicator.
 */
export const useValidEmail = (initialValue: string): ValidationResult<string> => {
  const [email, setEmail] = useState(initialValue)
  const [emailIsValid, setEmailIsValid] = useState(true)

  useEffect(() => {
    setEmailIsValid(validateEmail(email))
  }, [email])

  return { value: email, setValue: setEmail, isValid: emailIsValid }
}

/**
 * Custom hook for validating password.
 * @param initialValue - Initial value of the password.
 * @param matchValue - Optional value to match against (e.g., confirm password).
 * @returns Object with the current value, function to set the value, validity indicator, and a list of errors.
 */
export const useValidPassword = (
  initialValue: string,
  matchValue: string = ''
): ValidationResult<string> => {
  const [password, setPassword] = useState(initialValue)

  const { isValid, errors } = useMemo(
    () => validatePassword(password, matchValue),
    [password, matchValue]
  )

  return { value: password, setValue: setPassword, isValid, errors }
}

/**
 * Custom hook for validating username.
 * @param initialValue - Initial value of the username.
 * @returns Object with the current value, function to set the value, and a validity indicator.
 */
export const useValidUsername = (initialValue: string): ValidationResult<string> => {
  const [username, setUsername] = useState(initialValue)
  const [usernameIsValid, setUsernameIsValid] = useState(true)

  useEffect(() => {
    setUsernameIsValid(validateUsername(username))
  }, [username])

  return { value: username, setValue: setUsername, isValid: usernameIsValid }
}

/**
 * Custom hook for validating text.
 * @param initialValue - Initial value of the text.
 * @returns Object with the current value, function to set the value, and a validity indicator.
 */
export const useValidText = (initialValue: string): ValidationResult<string> => {
  const [text, setText] = useState(initialValue)
  const [textIsValid, setTextIsValid] = useState(true)

  useEffect(() => {
    setTextIsValid(validateText(text))
  }, [text])

  return { value: text, setValue: setText, isValid: textIsValid }
}

/**
 * Custom hook for validating date
 * @param initialValue - Initial value of the date
 * @returns Object with the current value, function to set the value, and a validity indicator.
 */
export const useValidDate = (initialValue: Dayjs | null): ValidationResult<Dayjs | null> => {
  const [date, setDate] = useState(initialValue)
  const [dateIsValid, setDateIsValid] = useState(true)

  useEffect(() => {
    setDateIsValid(validateDate(date))
  }, [date])

  return { value: date, setValue: setDate, isValid: dateIsValid }
}

/**
 * Custom hook for validating selection
 * @param initialValue - Initial value of the object
 * @returns Object with the current value, function to set the value, and a validity indicator.
 */
export const useValidSelection = <T>(initialValue: T): ValidationResult<T> => {
  const [selection, setSelection] = useState(initialValue)
  const [selectionIsValid, setSelectionIsValid] = useState(true)

  useEffect(() => {
    setSelectionIsValid(validateObject(selection))
  }, [selection])

  return { value: selection, setValue: setSelection, isValid: selectionIsValid }
}

/**
 * Custom hook for validating code.
 * @param initialValue - Initial value of the code.
 * @returns Object with the current value, function to set the value, and a validity indicator.
 */
export const useValidCode = (initialValue: string): ValidationResult<string> => {
  const [code, setCode] = useState(initialValue)
  const [codeIsValid, setCodeIsValid] = useState(true)

  useEffect(() => {
    setCodeIsValid(validateCode(code))
  }, [code])

  return { value: code, setValue: setCode, isValid: codeIsValid }
}
