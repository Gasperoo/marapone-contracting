# API Routes - Local Development Note

## Important: API Routes in Development

The `/api` routes in this project are **Vercel Serverless Functions** and will **NOT work** in local development with `npm run dev`.

### Why?
- Vite dev server doesn't handle `/api` routes
- These routes are designed to run on Vercel's serverless platform
- Environment variables for serverless functions work differently in local vs production

### Testing API Routes Locally

To test API routes locally, you have two options:

1. **Use Vercel CLI** (Recommended):
   ```bash
   npm install -g vercel
   vercel dev
   ```
   This will start a local Vercel development server that properly handles API routes.

2. **Test in Production**:
   - Push your changes to GitHub
   - Vercel will automatically deploy
   - Test the API routes on the deployed site

### Current API Endpoints

- `POST /api/send-waitlist-email` - Sends waitlist signup emails via Resend

### Environment Variables

Make sure these are set in Vercel:
- `RESEND_API_KEY` - Your Resend API key for sending emails

For local testing with Vercel CLI, create a `.env` file with:
```
RESEND_API_KEY=your_key_here
```

### Expected Behavior

- **Local Dev (`npm run dev`)**: API calls will fail with 404 or network errors
- **Vercel Dev (`vercel dev`)**: API calls will work correctly
- **Production (Vercel)**: API calls will work correctly
