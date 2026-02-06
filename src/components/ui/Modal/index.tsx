import React, { ReactNode } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Divider } from '@mui/material'

export interface ModalProps {
  open: boolean
  onClose: () => void
  onAction?: () => void
  children: ReactNode
  title?: string
  actionTitle?: string
  cancelTitle?: string
  description?: string
  withActions?: boolean
}

const Modal: React.FC<ModalProps> = ({
  open = false,
  onClose,
  children,
  title,
  description,
  cancelTitle = 'Cancel',
  actionTitle = 'Confirm',
  withActions = true,
  onAction,
}) => {
  const handleClose = () => {
    onClose && onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      {title && (
        <>
          <DialogTitle color="primary">{title}</DialogTitle>
          <Divider />
        </>
      )}
      <DialogContent>
        {description && <DialogContentText sx={{ mb: 2 }}>{description}</DialogContentText>}
        {children}
      </DialogContent>
      {withActions && (
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            {cancelTitle}
          </Button>
          {onAction && (
            <Button onClick={onAction} color="primary">
              {actionTitle}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default Modal
