import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import Notification, { NotificationProps } from '.'

export default {
  title: 'Components/UI/Notification',
  component: Notification,
  argTypes: {
    severity: {
      control: {
        type: 'select',
        options: ['error', 'warning', 'info', 'success'],
      },
    },
  },
} as Meta

const Template: StoryFn<NotificationProps> = args => <Notification {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Error',
  message: 'This is an error message.',
  severity: 'error',
}
