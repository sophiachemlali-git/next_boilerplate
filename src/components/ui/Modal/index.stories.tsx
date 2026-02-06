import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Modal, { ModalProps } from '.'

export default {
  component: Modal,
  title: 'Components/UI/Modal',
  argTypes: {
    open: { control: 'boolean' },
    onClose: { action: 'closed' },
    onAction: { action: 'confirmed' },
    children: { control: 'text' },
    title: { control: 'text' },
    actionTitle: { control: 'text' },
    cancelTitle: { control: 'text' },
    description: { control: 'text' },
  },
} as Meta

const Template: StoryFn<ModalProps> = args => <Modal {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
  onClose: () => {},
  children: <div>Modal Content</div>,
}

export const WithTitleAndDescription = Template.bind({})
WithTitleAndDescription.args = {
  ...Default.args,
  title: 'Custom Title',
  description:
    'To subscribe to this website, please enter your email address here. We will send updates occasionally.',
}

export const WithAction = Template.bind({})
WithAction.args = {
  ...Default.args,
  onAction: () => {},
  actionTitle: 'Custom Action',
}

export const CustomButtons = Template.bind({})
CustomButtons.args = {
  ...Default.args,
  cancelTitle: 'Close',
  actionTitle: 'Submit',
}

export const WithoutActionButton = Template.bind({})
WithoutActionButton.args = {
  ...Default.args,
  onAction: undefined,
}

export const WithoutActions = Template.bind({})
WithoutActions.args = {
  ...Default.args,
  title: 'Custom Title',
  description: 'This is a custom description.',
  withActions: false,
}
