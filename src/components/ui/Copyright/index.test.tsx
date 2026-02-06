import React from 'react'
import { render, screen } from '@testing-library/react'
import Copyright, { CopyrightProps } from '.'

describe('Copyright', () => {
  const defaultProps: CopyrightProps = {
    websiteName: 'Your Website',
  }

  it('renders the Copyright component with default props', () => {
    render(<Copyright {...defaultProps} />)

    const copyrightText = screen.getByTestId('copyright')
    expect(copyrightText).toBeInTheDocument()
    expect(copyrightText).toHaveTextContent(`Copyright © ${defaultProps.websiteName}`)
  })

  it('applies additional props correctly', () => {
    render(<Copyright {...defaultProps} color="secondary" variant="h6" />)

    const copyrightText = screen.getByTestId('copyright')
    expect(copyrightText).toHaveStyle('color: rgb(156, 39, 176)')
    expect(copyrightText).toHaveClass('MuiTypography-h6')
  })

  it('renders the correct year dynamically', () => {
    const currentYear = new Date().getFullYear()
    render(<Copyright {...defaultProps} />)

    const copyrightText = screen.getByText(
      `Copyright © ${defaultProps.websiteName} ${currentYear}.`
    )
    expect(copyrightText).toBeInTheDocument()
  })
})
