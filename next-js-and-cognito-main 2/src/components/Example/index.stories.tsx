import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Counter from '.'

export default {
  title: 'Examples/Counter',
  component: Counter,
} as Meta

const Template: StoryFn = args => <Counter {...args} />

export const Default = Template.bind({})
Default.args = {}
