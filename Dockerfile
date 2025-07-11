# ---------- Base image ----------
    FROM node:18-alpine AS base

    # Add required packages for Prisma and compatibility
    RUN apk add --no-cache libc6-compat openssl
    
    WORKDIR /app
    
    # ---------- Dependencies ----------
    FROM base AS deps
    
    # Copy only package manager files to install dependencies
    COPY package.json package-lock.json* ./
    
    # Install production dependencies
    RUN npm ci --omit=dev
    
    # Install Prisma CLI (used at build time only)
    RUN npm install -g prisma
    
    # ---------- Build ----------
    FROM base AS builder
    
    WORKDIR /app
    
    # Copy production node_modules
    COPY --from=deps /app/node_modules ./node_modules
    
    # Copy rest of the source code
    COPY . .
    
    # Disable Next.js telemetry
    ENV NEXT_TELEMETRY_DISABLED=1
    
    # Generate Prisma client before building
    RUN npx prisma generate
    
    # Build the Next.js app
    RUN npm run build
    
    # ---------- Production ----------
    FROM base AS runner
    
    WORKDIR /app
    
    # Set production environment variables
    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    ENV PORT=3000
    ENV HOSTNAME=0.0.0.0
    
    # Create a non-root user
    RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs
    
    # Copy essential build outputs only
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next/standalone ./
    COPY --from=builder /app/.next/static ./.next/static
    
    # If you're using Prisma, copy schema and generated client
    COPY --from=builder /app/prisma ./prisma
    COPY --from=builder /app/src/generated ./src/generated
    
    # Ensure correct permissions
    RUN mkdir -p .next && chown -R nextjs:nodejs .next
    
    # Use non-root user for security
    USER nextjs
    
    EXPOSE 3000
    
    # Use Next.js standalone server
    CMD ["node", "server.js"]
    