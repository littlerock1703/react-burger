import { useEffect } from 'react'
import { useDispatch } from '../../services/reducers/index'

import { getIngredients } from '../../services/actions/burger-ingredients'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { Layout } from '../layout/layout'
import { Modal } from '../modal/modal'
import { HomePage } from '../../pages/home/home'
import { checkUserAuth } from '../../services/actions/user'
import { ResetPasswordPage } from '../../pages/reset-password/reset-password'
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password'
import { ProfilePage } from '../../pages/profile/profile'
import { IngredientDetails } from '../burger-ingredients/ingredient-details/ingredient-details'
import { FeedPage } from '../../pages/order-feed/order-feed'
import { LoginPage } from '../../pages/login/login'
import { RegisterPage } from '../../pages/register/register'
import { AllowAuth, AllowUnAuth } from '../protected-route/protected-route'
import { Profile } from '../profile/profile'
import { ProfileOrders } from '../profile/orders/orders'
import { OrderDetails } from '../order-details/order-details'

function App(): React.JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const background = location.state && location.state.background

  useEffect(() => {
    dispatch(checkUserAuth())
    dispatch(getIngredients())
  }, [])

  const closeModalWin = () => {
    navigate(-1)
  }

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
          <Route path="/register" element={<AllowUnAuth element={<RegisterPage />} />} />
          <Route path="/login" element={<AllowUnAuth element={<LoginPage />} />} />
          <Route path="/profile" element={<AllowAuth element={<ProfilePage />} />} >
            <Route index element={<Profile />} />
            <Route path="orders" element={<ProfileOrders />} />
          </Route>
          <Route path="/profile/orders/:id" element={<AllowAuth element={<OrderDetails />} />} />
          <Route path="/reset-password" element={<AllowUnAuth element={<ResetPasswordPage />} />} />
          <Route path="/forgot-password" element={<AllowUnAuth element={<ForgotPasswordPage />} />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:id" element={<OrderDetails />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={
              <Modal title={'Детали ингредиента'} onClose={closeModalWin}>
                <IngredientDetails />
              </Modal>
            } />
          <Route
            path="/profile/orders/:id" element={
              <Modal onClose={closeModalWin}>
                <AllowAuth element={<OrderDetails />} />
              </Modal>
            } />
          <Route path="/feed/:id"element={
              <Modal onClose={closeModalWin}>
                <OrderDetails />
              </Modal>
            } />
        </Routes>
      )}
    </>
  )
}

export default App