import { createRouter, createWebHistory } from 'vue-router'
import routes from './constants/routes.js'
import UserRegistration from './pages/auth/UserRegistration.vue'
import UserLogin from './pages/auth/UserLogin.vue'
import NotFound from './pages/NotFound.vue'
import AdminDashboard from './pages/admin/AdminDashboard.vue'
import AddCategory from './components/admin/AddCategory.vue'
import EditCategory from './components/admin/EditCategory.vue'
import AddProduct from './components/admin/AddProduct.vue'
import EditProduct from './components/admin/EditProduct.vue'
import ViewOrders from './components/admin/ViewOrders.vue'
import EmailActivation from './pages/auth/EmailActivation.vue'
import Landing from './pages/Landing.vue'
import store from './store/index'
import authApi from './api/auth-api.js'
import tokenHelper from './helpers/token-helper.js'

const redirectIfLoggedIn = (_, from, next) => {
  if (store.getters['auth/isLoggedIn']) {
    next(from.fullPath)
  } else {
    next()
  }
}

const isAdminLoggedIn = async (_, from, next) => {
  try {
    const { success } = await authApi.adminAuthCheck(
      tokenHelper.getLocalStorageToken()
    )
    if (success) {
      next()
    }
  } catch (err) {
    next({ name: routes.NOTFOUND })
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: routes.LANDING,
      path: '/',
      component: Landing,
    },
    {
      name: routes.REGISTER,
      path: '/register',
      component: UserRegistration,
      beforeEnter(to, from, next) {
        redirectIfLoggedIn(to, from, next)
      },
    },
    {
      name: routes.LOGIN,
      path: '/login',
      component: UserLogin,
      beforeEnter(to, from, next) {
        redirectIfLoggedIn(to, from, next)
      },
    },
    {
      name: routes.ADMINDASHBOARD,
      path: '/adminDashboard',
      component: AdminDashboard,
      beforeEnter(to, from, next) {
        isAdminLoggedIn(to, from, next)
      },
      children: [
        {
          path: 'addCategory',
          name: routes.ADDCATEGORY,
          component: AddCategory,
          beforeEnter(to, from, next) {
            isAdminLoggedIn(to, from, next)
          },
        },
        {
          path: 'editCategory',
          name: routes.EDITCATEGORY,
          component: EditCategory,
          beforeEnter(to, from, next) {
            isAdminLoggedIn(to, from, next)
          },
        },
        {
          path: 'addProduct',
          name: routes.ADDPRODUCT,
          component: AddProduct,
          beforeEnter(to, from, next) {
            isAdminLoggedIn(to, from, next)
          },
        },
        {
          path: 'editProduct',
          name: routes.EDITPRODUCT,
          component: EditProduct,
          beforeEnter(to, from, next) {
            isAdminLoggedIn(to, from, next)
          },
        },
        {
          path: 'viewOrders',
          name: routes.VIEWORDERS,
          component: ViewOrders,
          beforeEnter(to, from, next) {
            isAdminLoggedIn(to, from, next)
          },
        },
      ],
    },
    {
      name: routes.EMAILACTIVATION,
      path: '/activateEmail/:base64Token',
      component: EmailActivation,
      props: true,
      meta: {
        hideHeader: true,
      },
    },
    { name: routes.NOTFOUND, path: '/notfound', component: NotFound },
    { name: routes.CATCHALL, path: '/:notFound(.*)', component: NotFound },
  ],
})

export default router
