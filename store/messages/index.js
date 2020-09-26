export const state = () => ({
  error: '',
  success: ''
})

export const mutations = {
  setError (state, text) {
    state.error = text
    state.success = ''
  },
  setSuccess (state, text) {
    state.success = text
    state.error = ''
  }
}
