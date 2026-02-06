import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import BackButton, { BackButtonProps } from '.'

describe('BackButton', () => {
  const defaultProps: BackButtonProps = {
    onClick: jest.fn(),
  }

  it('renders the BackButton component with default props', () => {
    render(<BackButton {...defaultProps} />)

    const button = screen.getByTestId('back-button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Back')
    expect(button).not.toBeDisabled()
  })

  it('calls the onClick handler when the button is clicked', () => {
    render(<BackButton {...defaultProps} />)
    const button = screen.getByTestId('back-button')

    fireEvent.click(button)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('renders a disabled button when disabled prop is true', () => {
    render(<BackButton {...defaultProps} disabled={true} />)
    const button = screen.getByTestId('back-button')

    expect(button).toBeDisabled()
  })

  it('renders a button with a custom class when className prop is provided', () => {
    const customClass = 'custom-class'
    render(<BackButton {...defaultProps} className={customClass} />)
    const button = screen.getByTestId('back-button')

    expect(button).toHaveClass(customClass)
  })

  it('renders a button with a custom color when color prop is provided', () => {
    render(<BackButton {...defaultProps} color="secondary" />)
    const button = screen.getByTestId('back-button')

    expect(button).toHaveStyle('color: rgb(156, 39, 176)')
  })

  it('renders a button with a custom variant when variant prop is provided', () => {
    render(<BackButton {...defaultProps} variant="contained" />)
    const button = screen.getByTestId('back-button')

    expect(button).toHaveStyle('background-color: rgb(21, 101, 192)')
  })
})
