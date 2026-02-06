import Button, { ButtonProps } from '@mui/material/Button'
import Loading, { LoadingProps } from '../Loading'

export type ButtonWithLoadingProps = {
  label: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: any) => Promise<void>
  isLoading: boolean
  disabled?: boolean
  LoadingProps?: LoadingProps
  fullWidth?: boolean
  buttonProps?: ButtonProps
  variant?: 'text' | 'contained' | 'outlined'
  dataTestId?: string
}

const ButtonWithLoading: React.FC<ButtonWithLoadingProps> = ({
  label,
  type,
  onClick,
  isLoading,
  disabled,
  fullWidth = true,
  LoadingProps = {},
  buttonProps = {},
  variant = 'contained',
  dataTestId = 'button-with-loading',
}) => {
  return (
    <Button
      type={type || 'submit'}
      fullWidth={fullWidth}
      variant={variant}
      sx={{ mt: 3, mb: 2 }}
      onClick={onClick}
      disabled={isLoading || disabled}
      data-testid={dataTestId}
      {...buttonProps}
    >
      {isLoading ? <Loading {...LoadingProps} /> : label}
    </Button>
  )
}

export default ButtonWithLoading
