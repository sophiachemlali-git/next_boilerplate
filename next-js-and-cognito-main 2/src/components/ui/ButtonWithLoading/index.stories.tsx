import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import ButtonWithLoading, { ButtonWithLoadingProps } from '.'

export default {
  title: 'Components/UI/ButtonWithLoading',
  component: ButtonWithLoading,
} as Meta

const Template: StoryFn<ButtonWithLoadingProps> = args => <ButtonWithLoading {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Click me',
  isLoading: false,
}

export const LoadingState = Template.bind({})
LoadingState.args = {
  label: 'Loading...',
  isLoading: true,
}

export const DisabledState = Template.bind({})
DisabledState.args = {
  label: 'Disabled',
  isLoading: false,
  disabled: true,
}
