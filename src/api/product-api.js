import axios from 'axios'
const addCategory = async (name) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASEURL_PRODUCT}addCategory`,
    { name }
  )
  return res.data
}
const getCategory = async(id) => {
   const res = await axios.get(
     `${import.meta.env.VITE_BASEURL_PRODUCT}getCategory/${id}`
  )
  return res.data
}

const getCategories = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASEURL_PRODUCT}getCategories`
  )
  return res.data
}

const updateCategory = async (id, name) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASEURL_PRODUCT}updateCategory`,
    { id, name }
  )
  return res.data
}

const deleteCategory = async (id) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASEURL_PRODUCT}deleteCategory`,
    { id }
  )
  return res.data
}

export default {
  addCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
}
