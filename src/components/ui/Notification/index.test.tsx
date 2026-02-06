import React from 'react'
import { render, screen } from '@testing-library/react'
import Notification, { NotificationProps } from '.'

describe('Notification', () => {
  const defaultProps: NotificationProps = {
    message: 'Test Message',
    severity: 'info',
  }

  it('renders the notification with the correct message and severity', () => {
    render(<Notification {...defaultProps} />)

    expect(screen.getByText('Test Message')).toBeInTheDocument()
    expect(screen.getByText('Test Message')).toHaveClass('MuiAlert-message')
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardInfo')
  })

  it('renders the notification with title, message, and severity', () => {
    const propsWithTitle: NotificationProps = {
      ...defaultProps,
      title: 'Test Title',
    }

    render(<Notification {...propsWithTitle} />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Title')).toHaveClass('MuiAlertTitle-root')
    expect(screen.getByText('Test Message')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardInfo')
  })

  it('renders the notification with custom props', () => {
    const propsWithCustom: NotificationProps = {
      ...defaultProps,
      className: 'custom-class',
      onClose: jest.fn(),
    }

    render(<Notification {...propsWithCustom} />)

    expect(screen.getByText('Test Message')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveClass('custom-class')
    expect(propsWithCustom.onClose).not.toHaveBeenCalled()
  })
})
