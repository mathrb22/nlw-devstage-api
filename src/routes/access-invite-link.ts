import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../../env'
import { accessInviteLink } from '../functions/access-invite-link'
import { redis } from '../redis/client'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Access invite link',
        operationId: 'accessInviteLink',
        tags: ['referral'],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          301: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await accessInviteLink({ subscriberId })

      console.log(await redis.hgetall('referral:access-count'))

      const redirectUrl = new URL(env.WEB_URL)

      redirectUrl.searchParams.set('referrer', subscriberId)

      // 301: permanent redirect - in this case, the browser will cache the redirect, so the next time the user tries to access the same URL, the browser will go directly to the new location, not increasing the access count for the referrer

      // 302: temporary redirect - in this case, the browser will not cache the redirect, so the next time the user tries to access the same URL, the browser will go to the original location, increasing the access count for the referrer

      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
