import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Table, { TableProps } from '.'

export default {
  component: Table,
  title: 'Components/UI/Table',
} as Meta

const Template: StoryFn<TableProps> = args => <Table {...args} />

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'age', headerName: 'Age', width: 150 },
]

const rows = [
  { id: 1, name: 'John Doe', age: 25 },
  { id: 2, name: 'Jane Doe', age: 30 },
]

export const Basic = Template.bind({})
Basic.args = {
  columns,
  rows,
  onEdit: (id: number) => console.log(`Edit clicked for ID ${id}`),
  onDelete: (id: number) => console.log(`Delete clicked for ID ${id}`),
}

export const WithoutActions = Template.bind({})
WithoutActions.args = {
  columns,
  rows,
  enableActions: false,
}

export const WithActions = Template.bind({})
WithActions.args = {
  columns,
  rows,
  onEdit: (id: number) => console.log(`Edit clicked for ID ${id}`),
  onDelete: (id: number) => console.log(`Delete clicked for ID ${id}`),
  enableActions: true,
}
