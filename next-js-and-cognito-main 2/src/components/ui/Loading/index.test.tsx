import React from 'react'
import { render, screen } from '@testing-library/react'
import Loading, { LoadingProps } from '.'

describe('Loading', () => {
  it('renders the Loading component with custom size and color', () => {
    const customProps: LoadingProps = {
      size: 32,
      color: 'secondary',
    }

    render(<Loading {...customProps} />)

    const loadingElement = screen.getByRole('progressbar')
    expect(loadingElement).toHaveStyle({ width: '32px', height: '32px' })
    expect(loadingElement).toHaveAttribute(
      'class',
      expect.stringContaining('MuiCircularProgress-colorSecondary')
    )
  })
})
