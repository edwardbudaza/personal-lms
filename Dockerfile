# -------- Base Layer --------
  FROM node:18-alpine AS base
  RUN apk add --no-cache libc6-compat
  WORKDIR /app
  
  # -------- Dependencies Layer --------
  FROM base AS deps
  COPY package.json package-lock.json* ./
  COPY prisma ./prisma
  # Install production dependencies only for the final runtime
  RUN npm ci --omit=dev
  
  # -------- Builder Layer --------
  FROM base AS builder
  WORKDIR /app
  COPY package.json package-lock.json* ./
  COPY prisma ./prisma
  # Install ALL dependencies (including dev deps) for building
  RUN npm ci
  COPY . .
  RUN npx prisma generate
  
  # Set build arguments
  ARG DATABASE_URL
  ARG NEXT_PUBLIC_SUPABASE_URL
  ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
  ARG R2_ENDPOINT
  ARG R2_BUCKET_NAME
  ARG R2_ACCOUNT_ID
  ARG R2_ACCESS_KEY_ID
  ARG R2_SECRET_ACCESS_KEY
  ARG R2_PUBLIC_DOMAIN
  
  # Set environment variables for build
  ENV DATABASE_URL=$DATABASE_URL
  ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
  ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
  ENV R2_ENDPOINT=$R2_ENDPOINT
  ENV R2_BUCKET_NAME=$R2_BUCKET_NAME
  ENV R2_ACCOUNT_ID=$R2_ACCOUNT_ID
  ENV R2_ACCESS_KEY_ID=$R2_ACCESS_KEY_ID
  ENV R2_SECRET_ACCESS_KEY=$R2_SECRET_ACCESS_KEY
  ENV R2_PUBLIC_DOMAIN=$R2_PUBLIC_DOMAIN
  
  # Build Next.js app
  RUN npm run build
  
  # -------- Runner (Production) Layer --------
  FROM base AS runner
  WORKDIR /app
  ENV NODE_ENV=production
  
  # Create user and group
  RUN addgroup --system --gid 1001 nodejs \
      && adduser --system --uid 1001 nextjs
  
  # Copy built application
  COPY --from=builder /app/.next/standalone ./
  COPY --from=builder /app/.next/static ./.next/static
  COPY --from=builder /app/public ./public
  
  # Copy Prisma schema for potential runtime migrations
  COPY --from=builder /app/prisma ./prisma
  
  # Copy production dependencies (includes generated Prisma client)
  COPY --from=deps /app/node_modules ./node_modules
  
  # Copy package.json for runtime
  COPY --from=builder /app/package.json ./package.json
  
  # Create temp directory for uploads with proper permissions
  RUN mkdir -p /tmp/uploads && chown -R nextjs:nodejs /tmp/uploads
  
  # Set runtime environment variables
  ARG DATABASE_URL
  ARG NEXT_PUBLIC_SUPABASE_URL
  ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
  ARG R2_ENDPOINT
  ARG R2_BUCKET_NAME
  ARG R2_ACCOUNT_ID
  ARG R2_ACCESS_KEY_ID
  ARG R2_SECRET_ACCESS_KEY
  ARG R2_PUBLIC_DOMAIN
  
  ENV DATABASE_URL=$DATABASE_URL
  ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
  ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
  ENV R2_ENDPOINT=$R2_ENDPOINT
  ENV R2_BUCKET_NAME=$R2_BUCKET_NAME
  ENV R2_ACCOUNT_ID=$R2_ACCOUNT_ID
  ENV R2_ACCESS_KEY_ID=$R2_ACCESS_KEY_ID
  ENV R2_SECRET_ACCESS_KEY=$R2_SECRET_ACCESS_KEY
  ENV R2_PUBLIC_DOMAIN=$R2_PUBLIC_DOMAIN
  
  # Generate Prisma client for runtime
  RUN npx prisma generate
  
  # Change ownership of app directory
  RUN chown -R nextjs:nodejs /app
  
  USER nextjs
  
  EXPOSE 3000
  ENV PORT=3000
  ENV HOSTNAME="0.0.0.0"
  
  CMD ["node", "server.js"]