# -------- Base Layer --------
  FROM node:18-alpine AS base
  RUN apk add --no-cache libc6-compat
  WORKDIR /app
  
  # -------- Dependencies Layer --------
  FROM base AS deps
  COPY package.json package-lock.json* ./
  RUN npm ci --omit=dev
  
  # -------- Builder Layer --------
  FROM base AS builder
  WORKDIR /app
  
  COPY --from=deps /app/node_modules ./node_modules
  COPY . .
  
  RUN npx prisma generate
  
  # Optional: pass in build-time ENV vars
  ARG NEXT_PUBLIC_SUPABASE_URL
  ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
  ARG R2_ENDPOINT
  ARG R2_BUCKET_NAME
  ARG R2_ACCOUNT_ID
  ARG R2_ACCESS_KEY_ID
  ARG R2_SECRET_ACCESS_KEY
  ARG R2_PUBLIC_DOMAIN
  
  ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
  ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
  ENV R2_ENDPOINT=$R2_ENDPOINT
  ENV R2_BUCKET_NAME=$R2_BUCKET_NAME
  ENV R2_ACCOUNT_ID=$R2_ACCOUNT_ID
  ENV R2_ACCESS_KEY_ID=$R2_ACCESS_KEY_ID
  ENV R2_SECRET_ACCESS_KEY=$R2_SECRET_ACCESS_KEY
  ENV R2_PUBLIC_DOMAIN=$R2_PUBLIC_DOMAIN
  
  RUN npm run build
  
  # -------- Production Runner Layer --------
  FROM base AS runner
  WORKDIR /app
  
  ENV NODE_ENV=production
  ENV PORT=3000
  ENV HOSTNAME=0.0.0.0
  
  # Create non-root user
  RUN addgroup --system --gid 1001 nodejs \
   && adduser --system --uid 1001 nextjs
  
  # Copy app
  COPY --from=builder /app/.next/standalone ./
  COPY --from=builder /app/.next/static ./.next/static
  COPY --from=builder /app/public ./public
  COPY --from=builder /app/prisma ./prisma
  COPY --from=builder /app/package.json ./package.json
  
  USER nextjs
  
  EXPOSE 3000
  
  # Start Next.js standalone server
  CMD ["node", "server.js"]
  