import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import TextAreaWithValidation, { TextAreaWithValidationProps } from '.'

export default {
  title: 'Components/Forms/TextAreaWithValidation',
  component: TextAreaWithValidation,
} as Meta

const Template: StoryFn<TextAreaWithValidationProps> = args => <TextAreaWithValidation {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Description',
  validationHook: {
    value: '', // Initial value for the story
    setValue: () => {}, // Mock setValue function
    isValid: true, // Mock isValid value
  },
  required: true,
  placeholder: 'Enter your description here',
  rows: 4,
}
