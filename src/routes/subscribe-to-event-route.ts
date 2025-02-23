import z from 'zod'

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        description: 'Route for subscribing to an event',
        summary: 'Create a new subscription',
        tags: ['subscription'], //group title
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            name: z.string(),
            email: z.string().email(),
          }),
        },
      },
    },
    (request, reply) => {
      const { name, email } = request.body

      reply.status(201).send({ name, email })
    }
  )
}
