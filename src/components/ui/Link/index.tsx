import React from 'react'
import NextLink, { LinkProps } from 'next/link'
import styled from '@emotion/styled'
import { styled as styledMUI } from '@mui/system'
import { Typography } from '@mui/material'

const Link = styled(NextLink)`
  cursor: pointer;
  text-decoration: none;
`

const Wrapper = styledMUI(Typography)({
  textDecoration: 'underline',
})

export interface NextLinkWrapperProps extends LinkProps {
  children: React.ReactNode
}

const NextLinkWrapper: React.FC<NextLinkWrapperProps> = ({ children, ...nextLinkProps }) => {
  return (
    <Link {...nextLinkProps} passHref>
      <Wrapper variant="body2" color="primary">
        {children}
      </Wrapper>
    </Link>
  )
}

export default NextLinkWrapper
