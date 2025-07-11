import type { NextApiRequest, NextApiResponse } from 'next';
import { appRouter } from '@/server/api/root';
import { createTRPCContext } from '@/server/api/trpc';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET ?? ''}`) {
    return res.status(401).json({ error: 'Unauthorized at Cron' });
  }

  try {
    // Create tRPC context
    const ctx = await createTRPCContext({ req, res });

    // Use createCaller to invoke the mutation as it would be from the client
    const caller = appRouter.createCaller(ctx);
    const result = await caller.contributors.updateFromGitHub();

    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to sync contributors',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}