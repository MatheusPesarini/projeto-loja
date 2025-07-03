export const successResponse = (data: any, message?: string) => ({
  success: true,
  data,
  message: message || 'Operação realizada com successo'
})

export const errorResponse = (message: string, errors?: any) => ({
  success: false,
  message,
  errors: errors || {}
})

