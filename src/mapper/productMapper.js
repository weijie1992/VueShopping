const filterProduct = (payload) => {
 
  const filters = [
    'name',
    'description',
    'price',
    'availableQuantity',
    'category',
    'shippingProviders',
  ]
  let mappedResults = {}
  Object.keys(payload).forEach((item) => {
    if (filters.includes(item)) {
      mappedResults[item] = payload[item]
    }
  })
  return mappedResults
}
export default {
  filterProduct,
}
