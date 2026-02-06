import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import BackButton, { BackButtonProps } from '.'

export default {
  title: 'Components/UI/BackButton',
  component: BackButton,
} as Meta

const Template: StoryFn<BackButtonProps> = args => <BackButton {...args} />

export const Default = Template.bind({})
Default.args = {
  onClick: () => console.log('Back button clicked'),
}
