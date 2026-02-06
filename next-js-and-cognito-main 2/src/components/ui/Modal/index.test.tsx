import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Modal, { ModalProps } from '.'

describe('Modal', () => {
  const defaultProps: ModalProps = {
    open: true,
    onClose: jest.fn(),
    children: <div>Test Content</div>,
    title: 'Test Title',
    description: 'Test Description',
    cancelTitle: 'Cancel',
    actionTitle: 'Confirm',
    withActions: true,
    onAction: jest.fn(),
  }

  it('renders the modal with the correct title, description, and content', () => {
    render(<Modal {...defaultProps} />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('calls onClose when clicking the Cancel button', () => {
    render(<Modal {...defaultProps} />)

    fireEvent.click(screen.getByText('Cancel'))

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onAction when clicking the Confirm button', () => {
    render(<Modal {...defaultProps} />)

    fireEvent.click(screen.getByText('Confirm'))

    expect(defaultProps.onAction).toHaveBeenCalledTimes(1)
  })

  it('renders the modal without title and actions when title is not provided', () => {
    const propsWithoutTitle: ModalProps = {
      ...defaultProps,
      title: undefined,
    }

    render(<Modal {...propsWithoutTitle} />)

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument()
    expect(screen.queryByText('Cancel')).toBeInTheDocument()
    expect(screen.queryByText('Confirm')).toBeInTheDocument()
  })
})
