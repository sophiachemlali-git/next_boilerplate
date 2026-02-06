import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import AutocompleteWithValidation, { AutocompleteWithValidationProps } from '.'

interface Option {
  id: number
  label: string
}

export default {
  title: 'Components/Forms/AutocompleteWithValidation',
  component: AutocompleteWithValidation,
} as Meta

const Template: StoryFn<AutocompleteWithValidationProps<Option>> = args => (
  <AutocompleteWithValidation<Option> {...args} />
)

const options: Option[] = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
  { id: 3, label: 'Option 3' },
]

export const Default = Template.bind({})
Default.args = {
  id: 'autocomplete-id',
  label: 'Select an option',
  validationHook: {
    value: options[0], // Initial value for the story
    setValue: () => {}, // Mock setValue function
    isValid: true, // Mock isValid value
  },
  options,
  getOptionLabel: option => option.label,
  required: true,
  disabled: false,
  textFieldProps: {},
}
