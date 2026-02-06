import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Table, { TableProps } from '.'

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 200 },
]

const rows = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
]

const renderTable = (props?: Partial<TableProps>) => {
  const defaultProps: TableProps = {
    columns,
    rows,
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    enableActions: true,
  }
  return render(<Table {...defaultProps} {...props} />)
}

describe('Table', () => {
  it('renders DataGrid with correct columns and rows', () => {
    renderTable()

    expect(screen.getByRole('grid')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(3) // Header + 2 Rows
  })

  it('calls onEdit when Edit button is clicked', () => {
    const onEditMock = jest.fn()
    renderTable({ onEdit: onEditMock })

    const editButtons = screen.getAllByRole('button', { name: /edit/i })
    fireEvent.click(editButtons[0])

    expect(onEditMock).toHaveBeenCalledWith(1)
  })

  it('renders DataGrid with correct styling', () => {
    renderTable()

    const dataGrid = screen.getByRole('grid')
    expect(dataGrid).toHaveStyle({ height: 'auto' })
  })

  it('does not render actions column when enableActions is false', () => {
    renderTable({ enableActions: false })

    const editButtons = screen.queryAllByRole('button', { name: /edit/i })
    const deleteButtons = screen.queryAllByRole('button', { name: /delete/i })

    expect(editButtons).toHaveLength(0)
    expect(deleteButtons).toHaveLength(0)
  })
})
