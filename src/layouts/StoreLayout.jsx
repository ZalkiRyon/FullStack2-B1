import React from 'react'
import { Outlet } from 'react-router-dom'

const StoreLayout = () => {
  return (
    <>
      {/* NavBar Aqui */}
      <main>
        <Outlet />
      </main>
      {/* Footer Aqui */}
    </>
  )
}

export default StoreLayout
