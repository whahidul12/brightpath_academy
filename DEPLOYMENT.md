# Deployment Guide

This document provides instructions for deploying the BrightPath Academy application to production and handling security-related tasks.

## Environment Variables

### Required Environment Variables

The application requires the following environment variables to be configured in your deployment environment (e.g., Vercel):

| Variable                            | Description                                          | Where to Obtain                                                               |
| ----------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------- |
| `DATABASE_URL`                      | PostgreSQL connection string with connection pooling | Supabase Dashboard > Project Settings > Database > Connection Pooling         |
| `DIRECT_URL`                        | Direct PostgreSQL connection (for migrations)        | Supabase Dashboard > Project Settings > Database > Connection String (Direct) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (client-safe)                  | Clerk Dashboard > API Keys > Publishable Key                                  |
| `CLERK_SECRET_KEY`                  | Clerk secret key (server-only)                       | Clerk Dashboard > API Keys > Secret Key                                       |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL`     | Sign-in route path                                   | Set to `/` or your custom sign-in route                                       |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name                                | Cloudinary Dashboard > Account Details > Cloud Name                           |
| `NEXT_PUBLIC_CLOUDINARY_API_KEY`    | Cloudinary API key                                   | Cloudinary Dashboard > Account Details > API Key                              |

### Development vs Production Keys

**Clerk API Keys:**

- **Development:** Use test keys (`pk_test_...` and `sk_test_...`)
- **Production:** Use live keys (`pk_live_...` and `sk_live_...`)
- **Important:** Never use test keys in production or live keys in development

**Database URLs:**

- **Development:** Can use local PostgreSQL or Supabase development instance
- **Production:** Use Supabase production instance with connection pooling enabled

## Vercel Deployment

### Initial Setup

1. **Connect Repository:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your Git repository

2. **Configure Environment Variables:**
   - In project settings, go to "Environment Variables"
   - Add all required variables from the table above
   - Use production values (live Clerk keys, production database URLs)

3. **Configure Build Settings:**
   - Framework Preset: Next.js
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

### Database Migrations

Before deploying, ensure your database schema is up to date:

```bash
# Run migrations locally first
npx prisma migrate deploy

# Or run in Vercel deployment (add to build command if needed)
npm run build && npx prisma migrate deploy
```

### Clerk Webhook Configuration

Configure Clerk webhooks to keep user data synchronized:

1. Go to Clerk Dashboard > Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/webhooks/clerk`
3. Subscribe to events: `user.created`, `user.updated`, `user.deleted`
4. Copy the signing secret and add to Vercel environment variables as `CLERK_WEBHOOK_SECRET`

## Security: Removing .env from Git History

If the `.env` file was accidentally committed to Git history, follow these steps to remove it:

### ⚠️ WARNING

- This process rewrites Git history
- Coordinate with your team before proceeding
- All team members will need to re-clone the repository
- Backup your repository before starting

### Step 1: Remove File from History

```bash
# Option A: Using git filter-branch (works on all Git versions)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Option B: Using git filter-repo (faster, recommended if available)
# Install: pip install git-filter-repo
git filter-repo --path .env --invert-paths
```

### Step 2: Force Push Changes

```bash
# Push to all branches
git push origin --force --all

# Push to all tags
git push origin --force --tags
```

### Step 3: Clean Up Local Repository

```bash
# Remove backup refs
rm -rf .git/refs/original/

# Expire reflog
git reflog expire --expire=now --all

# Garbage collect
git gc --prune=now --aggressive
```

### Step 4: Notify Team Members

All team members must re-clone the repository:

```bash
# Delete local repository
cd ..
rm -rf brightpath_academy

# Clone fresh copy
git clone <repository-url>
cd brightpath_academy

# Install dependencies
npm install
```

## Credential Rotation (In Case of Exposure)

If environment variables were exposed (e.g., committed to Git, leaked in logs), rotate all credentials immediately:

### 1. Rotate Clerk API Keys

1. Go to Clerk Dashboard > API Keys
2. Click "Regenerate" for both Publishable and Secret keys
3. Update keys in:
   - Local `.env` file
   - Vercel environment variables
   - Any CI/CD pipelines
4. Redeploy application

### 2. Rotate Database Credentials

1. Go to Supabase Dashboard > Project Settings > Database
2. Click "Reset Database Password"
3. Update `DATABASE_URL` and `DIRECT_URL` with new credentials in:
   - Local `.env` file
   - Vercel environment variables
4. Run database migrations with new credentials
5. Redeploy application

### 3. Rotate Cloudinary Credentials

1. Go to Cloudinary Dashboard > Settings > Security
2. Click "Regenerate" for API Key and API Secret
3. Update credentials in:
   - Local `.env` file
   - Vercel environment variables
4. Redeploy application

### 4. Verify Rotation

After rotating credentials:

- [ ] Test local development environment
- [ ] Test production deployment
- [ ] Verify authentication works (Clerk)
- [ ] Verify database connections work
- [ ] Verify image uploads work (Cloudinary)
- [ ] Monitor error logs for authentication failures

## Deployment Checklist

Use this checklist before deploying to production:

### Pre-Deployment

- [ ] All environment variables configured in Vercel
- [ ] Using production/live API keys (not test keys)
- [ ] Database migrations applied to production database
- [ ] `.env` file is in `.gitignore` (verify with `git status`)
- [ ] `.env` file is NOT in Git history (check with `git log --all --full-history -- .env`)
- [ ] Clerk webhooks configured (if using)
- [ ] Cloudinary upload presets configured

### Post-Deployment

- [ ] Application loads successfully
- [ ] Authentication works (sign in/sign out)
- [ ] Database queries work (view students, teachers, etc.)
- [ ] Image uploads work
- [ ] Create/Update/Delete operations work
- [ ] Error monitoring configured (Vercel Analytics, Sentry, etc.)
- [ ] Performance monitoring enabled

## Troubleshooting

### Common Issues

**Issue:** "Invalid Clerk API Key"

- **Solution:** Verify you're using live keys (`pk_live_...`, `sk_live_...`) in production

**Issue:** "Database connection failed"

- **Solution:** Check that `DATABASE_URL` uses connection pooling URL (`?pgbouncer=true`)

**Issue:** "Prisma migration failed"

- **Solution:** Ensure `DIRECT_URL` is set (migrations require direct connection, not pooled)

**Issue:** "Image upload fails"

- **Solution:** Verify Cloudinary credentials and upload preset configuration

### Getting Help

- **Vercel Support:** https://vercel.com/support
- **Clerk Support:** https://clerk.com/support
- **Supabase Support:** https://supabase.com/support
- **Cloudinary Support:** https://cloudinary.com/support

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Clerk Production Checklist](https://clerk.com/docs/deployments/production-checklist)
- [Supabase Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooling)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides)
