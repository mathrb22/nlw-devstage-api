import z from 'zod'

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        description: 'Route for subscribing to the event',
        summary: 'Create a new subscription',
        tags: ['subscription'], //group title
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body

      const { subscriberId } = await subscribeToEvent({ name, email })

      reply.status(201).send({ subscriberId })
    }
  )
}
