export const successResponse = (data: any, message?: string) => ({
  success: true,
  data: data,
  message: message || 'Operação realizada com sucesso',
});

export const errorResponse = (message: string, errors?: any) => ({
  success: false,
  message,
  errors: errors || {},
});
