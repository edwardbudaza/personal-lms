# -------- Base Image --------
    FROM node:18-alpine AS base

    # Base install of system dependencies
    RUN apk add --no-cache libc6-compat
    
    WORKDIR /app
    
    # -------- Dependencies Layer --------
    FROM base AS deps
    
    # Copy lockfiles and install production deps only
    COPY package.json package-lock.json* ./
    COPY prisma ./prisma  
    RUN npm ci --omit=dev
    
    # -------- Builder Layer --------
    FROM base AS builder
    
    WORKDIR /app
    
    # Copy node_modules from deps layer
    COPY --from=deps /app/node_modules ./node_modules
    
    # Copy app source code
    COPY . .
    
    # Generate Prisma client
    RUN npx prisma generate
    
    # Build the Next.js app
    ENV NEXT_TELEMETRY_DISABLED 1
    RUN npm run build
    
    # -------- Runner (Production) Layer --------
    FROM base AS runner
    
    WORKDIR /app
    
    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED 1
    ENV PORT=3000
    ENV HOSTNAME=0.0.0.0
    
    # Add non-root user
    RUN addgroup --system --gid 1001 nodejs
    RUN adduser --system --uid 1001 nextjs
    
    # Copy built app
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next/standalone ./
    COPY --from=builder /app/.next/static ./.next/static
    
    # Copy generated Prisma client + schema
    COPY --from=builder /app/prisma ./prisma
    COPY --from=builder /app/src/generated/prisma ./src/generated/prisma
    
    # Runtime dependencies
    COPY --from=builder /app/package.json ./package.json
    
    # Use non-root user
    USER nextjs
    
    EXPOSE 3000
    
    CMD ["node", "server.js"]
    