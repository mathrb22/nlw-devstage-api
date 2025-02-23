import { fastify } from 'fastify';

import { fastifyCors } from '@fastify/cors';

import {
	validatorCompiler,
	serializerCompiler,
	type ZodTypeProvider,
	jsonSchemaTransform,
} from 'fastify-type-provider-zod';

import { fastifySwagger } from '@fastify/swagger';

import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { subscribeToEventRoute } from './routes/subscribe-to-event-route';
import { env } from '../env';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors);

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'NLW Connect - Node API',
			version: '0.0.1',
		},
	},
	//transform the zod schema to json schema for the swagger documentation
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
	routePrefix: '/docs',
});

app.register(subscribeToEventRoute);

app.listen({ port: env.PORT }).then(async () => {
	console.log('✅ API HTTP Server running on port', process.env.PORT);
	console.log(
		'📚 Swagger documentation available at: http://localhost:3333/docs'
	);
});
