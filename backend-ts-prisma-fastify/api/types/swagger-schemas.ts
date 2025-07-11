// REQUESTS

export const uuidParamSchema = {
	type: 'object',
	properties: {
		id: {
			type: 'string',
			format: 'uuid',
		},
	},
	required: ['id'],
};

export const uuidUserParamSchema = {
	type: 'object',
	properties: {
		id: {
			type: 'string',
			format: 'uuid',
		},
	},
	required: ['id'],
};

export const categoryParamSchema = {
	type: 'object',
	properties: {
		category: {
			type: 'string',
			enum: [
				'tenis_masculinos',
				'tenis_femininos',
				'calcas_masculinas',
				'calcas_femininas',
				'camisetas_masculinas',
				'camisetas_femininas',
				'bolsas_femininas',
			],
		},
	},
	required: ['category'],
};

export const createUserRequestSchema = {
	type: 'object',
	required: ['email', 'password'],
	properties: {
		name: { type: 'string' },
		email: { type: 'string', format: 'email' },
		password: {
			type: 'string',
			minLength: 6,
		},
	},
};

export const loginUserRequestSchema = {
	type: 'object',
	required: ['email', 'password'],
	properties: {
		email: { type: 'string', format: 'email' },
		password: {
			type: 'string',
			minLength: 6,
		},
	},
};

export const updateProfileRequestSchema = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			minLength: 1,
		},
		email: {
			type: 'string',
			format: 'email',
		},
		password: {
			type: 'string',
			minLength: 6,
		},
	},
};

export const productRequestSchema = {
	type: 'object',
	properties: {
		id: { type: 'string', format: 'uuid' },
	},
};

export const categoryRequestSchema = {
	type: 'object',
	properties: {
		category: {
			type: 'string',
			minLength: 1,
		},
	},
};

export const relatedProductsRequestSchema = {
	type: 'object',
	properties: {
		category: {
			type: 'string',
			minLength: 1,
		},
	},
};

export const relatedProductsQuerySchema = {
	type: 'object',
	properties: {
		exclude: {
			type: 'string',
			format: 'uuid',
		},
		limit: {
			type: 'string',
			pattern: '^\\d+$',
		},
	},
	required: ['exclude']
};

export const searchParamSchema = {
	type: 'object',
	properties: {
		searchTerm: { type: 'string', minLength: 1 },
	},
	required: ['searchTerm'],
};

// DATA

export const loginDataSchema = {
	type: 'object',
	properties: {
		id: { type: 'string', format: 'uuid' },
	},
};

export const createUserDataSchema = {
	type: 'object',
	properties: {
		id: { type: 'string', format: 'uuid' },
		name: { type: 'string' },
		email: { type: 'string', format: 'email' },
		password: { type: 'string' },
	},
};

export const productDataSchema = {
	type: 'object',
	properties: {
		id: { type: 'string', format: 'uuid' },
		productName: { type: 'string' },
		brand: { type: 'string' },
		model: { type: 'string' },
		category: { type: 'string' },
		genre: { type: 'string' },
		warranty: { type: 'string' },
		weight: { type: 'string' },
		originalPrice: { type: 'string' },
		discountedPrice: { type: 'string' },
		discount: { type: 'string' },
		quantity: { type: 'integer' },
		description: { type: 'string' },
		image: { type: 'string' },
		createdAt: { type: 'string', format: 'date-time' },
		updatedAt: { type: 'string', format: 'date-time' },
		vendorId: { type: 'string', format: 'uuid' },
	},
};

// SUCESSO

export const loginResponseSchema = {
	type: 'object',
	properties: {
		success: { type: 'boolean' },
		data: loginDataSchema,
	},
};

export const createUserResponseSchema = {
	type: 'object',
	properties: {
		success: { type: 'boolean' },
		data: createUserDataSchema,
	},
};

export const productResponseSchema = {
	type: 'object',
	properties: {
		success: { type: 'boolean' },
		data: productDataSchema,
	},
};

export const productsListResponseSchema = {
	type: 'object',
	properties: {
		success: { type: 'boolean' },
		data: {
			type: 'array',
			items: productDataSchema,
		},
	},
};

export const deleteResponseSchema = {
	type: 'object',
	properties: {
		success: { type: 'boolean' },
	},
};

// ERROS

export const errorResponseSchema = {
	type: 'object',
	properties: {
		success: { type: 'boolean' },
		errors: {
			type: 'object',
			additionalProperties: { type: 'string' },
		},
	},
};
