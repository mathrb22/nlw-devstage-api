import { redis } from '../redis/client'

interface AccessInviteLinkParams {
  subscriberId: string
}

export async function accessInviteLink({
  subscriberId,
}: AccessInviteLinkParams) {
  await redis.hincrby('referral:access-count', subscriberId, 1)
}

// lists [] -> simple lists of strings, sorted by insertion order. - commands that start with the letter 'l'
// hashes {} -> objects with multiple fields, sorted by field name. - commands that start with the letter 'h'
// sorted sets [] -> lists of strings sorted by a column - commands that start with the letter 'z'
