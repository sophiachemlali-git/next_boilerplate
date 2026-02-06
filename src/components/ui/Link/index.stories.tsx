import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import NextLinkWrapper, { NextLinkWrapperProps } from '.'

export default {
  title: 'Components/UI/Link',
  component: NextLinkWrapper,
} as Meta

const Template: StoryFn<NextLinkWrapperProps> = args => <NextLinkWrapper {...args} />

export const Default = Template.bind({})
Default.args = {
  href: '/example',
  children: 'Go to Example',
}
