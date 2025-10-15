import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/common/Header'
import '../styles/store.css'

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
