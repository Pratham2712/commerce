import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { User_Home } from './constants/links'
import Home from './pages/Home'

const Routess = () => {
  return (
    <Routes>
    {/* <Route path={USER_Root} element={<UserLayouts />}></Route> */}
    <Route path={User_Home} element={<Home />}></Route>
  </Routes>
  )
}

export default Routess