import { storage } from '../server/storage';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const users = Array.from((storage as any).users?.values?.() ?? []);
    const profiles = (users as any[]).map(({ password, ...rest }) => rest);
    res.status(200).json(profiles);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
