import axios from 'axios'
import authHelper from '../helpers/axios-helper'

const emailRegistration = async (fullName, email, password) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASEURL_AUTH}emailRegistration`,
    { fullName, email, password }
  )
  return res.data
}

const loginByEmail = async (email, password) => {
  const res = await axios.post(`${import.meta.env.VITE_BASEURL_AUTH}login`, {
    email,
    password,
  })
  return res.data
}

const emailActivation = async (token) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASEURL_AUTH}activateEmail`,
    { token }
  )
  return res.data
}

const userAuthCheck = async (token) => {
  const headerAuthorization = authHelper.setBearerToken(token)
  const res = await axios.get(
    `${import.meta.env.VITE_BASEURL_AUTH}userAuthCheck`,
    headerAuthorization
  )
  return res.data
}

const adminAuthCheck = async (token) => {
  const headerAuthorization = authHelper.setBearerToken(token)
  const res = await axios.get(
    `${import.meta.env.VITE_BASEURL_AUTH}adminAuthCheck`,
    headerAuthorization
  )
  return res.data
}

export default {
  emailRegistration,
  loginByEmail,
  emailActivation,
  userAuthCheck,
  adminAuthCheck,
}
