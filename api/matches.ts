import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { userId } = req.query;
    if (!userId || typeof userId !== 'string') {
      res.status(400).json({ error: 'userId required' });
      return;
    }
    const matches = await storage.getMatchesForUser(userId);
    res.status(200).json(matches);
  } else if (req.method === 'POST') {
    const { userId1, userId2 } = req.body;
    if (!userId1 || !userId2) {
      res.status(400).json({ error: 'userId1 and userId2 required' });
      return;
    }
    const match = await storage.createMatch(userId1, userId2);
    res.status(200).json(match);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
