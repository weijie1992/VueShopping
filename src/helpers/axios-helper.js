const setBearerToken = (token) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  }
}

export default { setBearerToken }
