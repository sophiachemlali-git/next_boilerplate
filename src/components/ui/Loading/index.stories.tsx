import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Loading, { LoadingProps } from '.'

export default {
  title: 'Components/UI/Loading',
  component: Loading,
  argTypes: {
    size: {
      control: {
        type: 'number',
      },
      description: 'The size of the loading spinner.',
      defaultValue: 40,
    },
    color: {
      control: {
        type: 'color',
      },
      description: 'The color of the loading spinner.',
      defaultValue: 'primary',
    },
  },
} as Meta

const Template: StoryFn<LoadingProps> = args => <Loading {...args} />

export const Default: StoryFn<LoadingProps> = Template.bind({})
Default.args = {
  size: 40,
  color: 'primary',
}

export const SmallLoading: StoryFn<LoadingProps> = Template.bind({})
SmallLoading.args = {
  size: 20,
  color: 'secondary',
}

export const LargeLoading: StoryFn<LoadingProps> = Template.bind({})
LargeLoading.args = {
  size: 80,
  color: 'error',
}

export const CustomColor: StoryFn<LoadingProps> = Template.bind({})
CustomColor.args = {
  size: 40,
  color: 'primary',
}
