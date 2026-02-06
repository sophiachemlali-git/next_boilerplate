export type MessageProps = {
  title: string
  severity: 'success' | 'error'
  message: string
}

export const MessagesCode: { [key: string]: MessageProps } = {
  SUCCESS: {
    title: 'Success',
    severity: 'success',
    message: 'Authentication code sent successfully.',
  },
  ERROR: {
    title: 'Error',
    severity: 'error',
    message: 'Something goes wrong with the code. Try again.',
  },
}
