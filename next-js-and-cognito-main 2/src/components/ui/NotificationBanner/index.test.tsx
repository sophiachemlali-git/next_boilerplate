import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import NotificationBanner from '.'

describe('Notification Banner', () => {
  const onCloseMock = jest.fn()

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks() // Clear mock calls after each test
  })

  it('renders with the correct message and severity', () => {
    render(
      <NotificationBanner
        open={true}
        severity="info"
        message="Test message"
        onClose={onCloseMock}
      />
    )

    expect(screen.getByText('Test message')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardInfo')
  })

  it('closes when the user clicks the close button', async () => {
    render(
      <NotificationBanner
        open={true}
        severity="info"
        message="Test message"
        onClose={onCloseMock}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /close/i }))

    jest.runAllTimers()

    // Wait for the close animation to complete
    await waitFor(() => expect(onCloseMock).toHaveBeenCalledTimes(2))
  })

  it('closes automatically after the specified autoHideDuration', async () => {
    render(
      <NotificationBanner
        open={true}
        severity="info"
        message="Test message"
        autoHideDuration={3000}
        onClose={onCloseMock}
      />
    )

    jest.runAllTimers()

    // Wait for the autoHideDuration time
    await waitFor(() => expect(onCloseMock).toHaveBeenCalledTimes(1))
  })

  it('does not close if already closed before autoHideDuration', async () => {
    render(
      <NotificationBanner
        open={false}
        severity="info"
        message="Test message"
        autoHideDuration={3000}
        onClose={onCloseMock}
      />
    )

    jest.runAllTimers()

    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })
})
