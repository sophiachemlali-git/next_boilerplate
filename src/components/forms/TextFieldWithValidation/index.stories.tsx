import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import TextFieldWithValidation, { TextFieldWithValidationProps } from '.'

export default {
  title: 'Components/Forms/TextFieldWithValidation',
  component: TextFieldWithValidation,
} as Meta

const Template: StoryFn<TextFieldWithValidationProps> = args => (
  <TextFieldWithValidation {...args} />
)

export const Default = Template.bind({})
Default.args = {
  label: 'Email',
  type: 'email',
  validationHook: {
    value: '',
    setValue: () => {},
    isValid: true,
  },
  placeholder: 'Enter your email',
}

export const RequiredField = Template.bind({})
RequiredField.args = {
  label: 'Required Field',
  type: 'text',
  validationHook: {
    value: '',
    setValue: () => {},
    isValid: false,
  },
  hint: 'This field is required',
}

export const CustomMessage = Template.bind({})
CustomMessage.args = {
  label: 'Custom Message',
  type: 'text',
  validationHook: {
    value: '',
    setValue: () => {},
    isValid: false,
  },
  hint: 'Please enter a valid value',
}
