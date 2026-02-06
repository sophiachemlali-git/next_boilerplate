import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import ErrorValidation, { ErrorValidationProps } from '.'

export default {
  title: 'Components/UI/ErrorValidation',
  component: ErrorValidation,
} as Meta

const Template: StoryFn<ErrorValidationProps> = args => <ErrorValidation {...args} />

export const Default = Template.bind({})
Default.args = {
  errors: ['Error 1', 'Error 2', 'Error 3'],
}
