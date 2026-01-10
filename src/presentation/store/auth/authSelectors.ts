import { RootState } from '../store'

export const selectAuthLoading = (state: RootState) => state.auth.loading
export const selectUsername = (state: RootState) => state.auth.username
export const selectPassword = (state: RootState) => state.auth.password
export const selectAuthError = (state: RootState) => state.auth.error
export const selectUser = (state: RootState) => state.auth.user