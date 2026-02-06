import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ButtonWithLoading, { ButtonWithLoadingProps } from '.'

describe('ButtonWithLoading', () => {
  const defaultProps: ButtonWithLoadingProps = {
    label: 'Submit',
    isLoading: false,
    onClick: jest.fn(),
  }

  it('renders the ButtonWithLoading component with default props', () => {
    render(<ButtonWithLoading {...defaultProps} />)

    const button = screen.getByTestId('button-with-loading')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Submit')
    expect(button).not.toBeDisabled()
  })

  it('calls the onClick handler when the button is clicked', () => {
    render(<ButtonWithLoading {...defaultProps} />)
    const button = screen.getByTestId('button-with-loading')

    fireEvent.click(button)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('disables the button when loading is true', () => {
    render(<ButtonWithLoading {...defaultProps} isLoading={true} />)
    const button = screen.getByTestId('button-with-loading')

    expect(button).toBeDisabled()
  })

  it('renders the loading component when loading is true', () => {
    render(<ButtonWithLoading {...defaultProps} isLoading={true} />)
    const loadingElement = screen.getByTestId('button-with-loading')

    expect(loadingElement).toBeInTheDocument()
  })

  it('renders a disabled button when disabled prop is true', () => {
    render(<ButtonWithLoading {...defaultProps} disabled={true} />)
    const button = screen.getByTestId('button-with-loading')

    expect(button).toBeDisabled()
  })

  it('renders a full-width button when fullWidth prop is true', () => {
    render(<ButtonWithLoading {...defaultProps} fullWidth={true} />)
    const button = screen.getByTestId('button-with-loading')

    expect(button).toHaveStyle('width: 100%')
  })
})
