import React from 'react'
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress'

export type LoadingProps = CircularProgressProps & {
  color?: string
}

const Loading: React.FC<LoadingProps> = ({ size = 24, color = 'primary', ...rest }) => {
  return <CircularProgress size={size} color={color} {...rest} />
}

export default Loading
