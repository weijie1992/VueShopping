import { createStore } from 'vuex'
import auth from './modules/auth/index'
import layout from './modules/layout/index'

const store = createStore({
  modules: {
    auth,
    layout,
  },
})

export default store
