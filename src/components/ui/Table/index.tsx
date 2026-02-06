import React from 'react'
import { DataGridPro, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid-pro'

import { IconButton, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/EditOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import DownloadIcon from '@mui/icons-material/CloudDownloadOutlined'

type Row = {
  id: number | string
  [key: string]: any
}

export interface TableProps {
  columns: GridColDef[]
  rows: Row[]
  sizePerPage?: number
  loading?: boolean
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  onDownload?: (id: number) => void
  enableActions?: boolean
  customActionsColumn?: GridColDef
}

const Table: React.FC<TableProps> = ({
  columns,
  rows,
  onEdit,
  onDelete,
  onDownload,
  enableActions = true,
  sizePerPage = 10,
  loading,
  customActionsColumn,
}) => {
  const handleEdit = (id: number) => {
    if (onEdit) {
      onEdit(id)
    }
  }

  const handleDelete = (id: number) => {
    if (onDelete) {
      onDelete(id)
    }
  }

  const handleDownload = (id: number) => {
    if (onDownload) {
      onDownload(id)
    }
  }

  const actionsColumn: GridColDef = {
    field: 'actions',
    headerName: 'Actions',
    width: 100,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams) => (
      <div>
        {enableActions && onEdit && (
          <Tooltip enterTouchDelay={0} title="Edit">
            <IconButton
              style={{ cursor: 'pointer', marginRight: onDelete || onDownload ? 8 : 0 }}
              sx={{ color: 'secondary.main' }}
              onClick={() => handleEdit(params.row.id)}
              data-testid="table-action-edit"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        {enableActions && onDownload && (
          <Tooltip enterTouchDelay={0} title="Download">
            <IconButton
              style={{ cursor: 'pointer' }}
              sx={{ color: 'secondary.main' }}
              onClick={() => handleDownload(params.row.id)}
              data-testid="table-action-download"
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        )}
        {enableActions && onDelete && (
          <Tooltip enterTouchDelay={0} title="Delete">
            <IconButton
              style={{ cursor: 'pointer' }}
              sx={{ color: 'secondary.main' }}
              onClick={() => handleDelete(params.row.id)}
              data-testid="table-action-delete"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    ),
  }

  const actions = customActionsColumn ? customActionsColumn : actionsColumn
  const columnsWithActions = enableActions
    ? [...columns, actions]
    : customActionsColumn
      ? [...columns, customActionsColumn]
      : columns
  const isEmpty = rows?.length === 0

  return (
    <div style={{ height: isEmpty ? 250 : 'auto', width: '100%' }}>
      <DataGridPro
        autoHeight
        loading={loading}
        rows={rows}
        columns={columnsWithActions}
        pagination
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: sizePerPage,
            },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20, 25, 30, 50, 100]}
        rowSelection={false}
        slots={{ toolbar: GridToolbar }}
        localeText={{
          noRowsLabel: 'No results found',
        }}
        sx={{
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: '#e0e0e0',
            borderRadius: '0',
          },
          '& .MuiDataGrid-toolbarContainer': {
            bgcolor: '#e0e0e0',
            pt: 1,
          },
          mt: 3,
        }}
      />
    </div>
  )
}

export default Table
