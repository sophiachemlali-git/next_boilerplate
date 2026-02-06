import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import NotificationBanner, { NotificationBannerProps } from '.'

export default {
  component: NotificationBanner,
  title: 'Components/UI/NotificationBanner',
} as Meta

const Template: StoryFn<NotificationBannerProps> = args => <NotificationBanner {...args} />

export const SuccessNotificationBanner = Template.bind({})
SuccessNotificationBanner.args = {
  open: true,
  severity: 'success',
  message: 'Operation successful',
  onClose: () => {},
}

export const ErrorNotificationBanner = Template.bind({})
ErrorNotificationBanner.args = {
  open: true,
  severity: 'error',
  message: 'Something went wrong',
  onClose: () => {},
}
