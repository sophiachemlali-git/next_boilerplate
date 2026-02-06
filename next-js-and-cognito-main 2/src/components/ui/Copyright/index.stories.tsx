import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Copyright, { CopyrightProps } from '.'

export default {
  title: 'Components/UI/Copyright',
  component: Copyright,
} as Meta

const Template: StoryFn<CopyrightProps> = args => <Copyright {...args} />

export const Default = Template.bind({})
Default.args = {
  websiteName: 'My Website',
}

export const WithCustomStyles = Template.bind({})
WithCustomStyles.args = {
  websiteName: 'My Custom Website',
  variant: 'h6',
  align: 'right',
  color: 'error',
}
