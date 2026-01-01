import { storage } from '../server/storage';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const { matchId } = req.query;
    if (!matchId || typeof matchId !== 'string') {
      res.status(400).json({ error: 'matchId required' });
      return;
    }
    const messages = await storage.getMessagesForMatch(matchId);
    res.status(200).json(messages);
  } else if (req.method === 'POST') {
    const { matchId, senderId, text } = req.body;
    if (!matchId || !senderId || !text) {
      res.status(400).json({ error: 'matchId, senderId, and text required' });
      return;
    }
    const message = await storage.addMessageToMatch(matchId, senderId, text);
    res.status(200).json(message);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
