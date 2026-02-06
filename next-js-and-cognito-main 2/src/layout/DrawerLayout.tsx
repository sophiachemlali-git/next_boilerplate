import React from 'react'
import NavigationDrawer from '@/features/Dashboard/Drawer'

import DashboardIcon from '@mui/icons-material/Dashboard'
import JournalEntriesIcon from '@mui/icons-material/ImportContactsOutlined'
import ManageUsersIcon from '@mui/icons-material/ManageAccountsOutlined'
import ManageFiscalCodesIcon from '@mui/icons-material/EditCalendarOutlined'

import { selectUserInfo } from '@/store/selectors/authSelectors'
import { useSelector } from 'react-redux'

interface DrawerlayoutProps {
  children: React.ReactNode
}

const Drawerlayout: React.FC<DrawerlayoutProps> = ({ children }) => {
  const userInfo = useSelector(selectUserInfo)

  const sideBarMainLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon color="secondary" /> },
    {
      label: 'Journal Entries',
      path: '/journal-entries',
      icon: <JournalEntriesIcon color="secondary" />,
    },
    { label: 'Manage Users', path: '/settings/users', icon: <ManageUsersIcon color="secondary" /> },
    {
      label: 'Manage Fiscal Codes ',
      path: '/settings/fiscal-codes',
      icon: <ManageFiscalCodesIcon color="secondary" />,
    },
  ]

  return (
    <NavigationDrawer userData={userInfo} mainLinks={sideBarMainLinks}>
      {children}
    </NavigationDrawer>
  )
}

export default Drawerlayout
