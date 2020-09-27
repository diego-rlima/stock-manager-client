const flattenSuccessResponse = response => response.data.data || {}
const flattenErrorResponse = error => Promise.reject(error.response.data || {})

const showSuccessMessage = (response, store) => {
  const message = response.data.message || null

  if (message !== null) {
    store.commit('messages/setSuccess', message)
  }

  return response
}
const showErrorMessage = (error, store) => {
  const data = error.response.data
  const message = data.message || 'The action could not be completed due to an error'
  // const status = error.response.status || 500

  store.commit('messages/setError', message)

  return Promise.reject(error)
}

export default function ({ $axios, store }) {
  $axios.interceptors.response.use(
    response => showSuccessMessage(response, store),
    error => showErrorMessage(error, store)
  )
  $axios.interceptors.response.use(flattenSuccessResponse, flattenErrorResponse)
}
