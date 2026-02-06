import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Toast, { ToastProps } from '.'

export default {
  component: Toast,
  title: 'Components/UI/Toast',
} as Meta

const Template: StoryFn<ToastProps> = args => <Toast {...args} />

export const SuccessToast = Template.bind({})
SuccessToast.args = {
  open: true,
  severity: 'success',
  message: 'Operation successful',
  onClose: () => {},
}

export const ErrorToast = Template.bind({})
ErrorToast.args = {
  open: true,
  severity: 'error',
  message: 'Something went wrong',
  onClose: () => {},
}
