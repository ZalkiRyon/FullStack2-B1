import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/common/Header'

const StoreLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {/* Footer Aqui */}
    </>
  )
}

export default StoreLayout
