import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

function makeRedis() {
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })
}

// Contact form: max 3 requests per 5 minutes per IP
export const contactRateLimit = new Ratelimit({
  redis: makeRedis(),
  limiter: Ratelimit.slidingWindow(3, '5 m'),
  prefix: 'rl:contact',
})

// Chat API: max 10 requests per minute per IP
export const chatRateLimit = new Ratelimit({
  redis: makeRedis(),
  limiter: Ratelimit.slidingWindow(10, '1 m'),
  prefix: 'rl:chat',
})

// Onboarding form: max 5 requests per 10 minutes per IP
export const onboardingRateLimit = new Ratelimit({
  redis: makeRedis(),
  limiter: Ratelimit.slidingWindow(5, '10 m'),
  prefix: 'rl:onboarding',
})
