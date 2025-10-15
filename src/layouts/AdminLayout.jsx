import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
    {/* Sidebar aqui */}
      <Outlet />
    </>
  )
}

export default AdminLayout
