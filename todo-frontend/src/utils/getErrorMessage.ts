import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const getErrorMessage = (error: unknown): string => {
  if ('data' in (error as FetchBaseQueryError)) {
    const data = (error as FetchBaseQueryError).data

    if (
      typeof data === 'object' &&
      data !== null &&
      'message' in data
    ) {
      return String(data.message)
    }
  }

  return 'Something went wrong'
}