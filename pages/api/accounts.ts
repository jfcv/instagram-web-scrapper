import { NextApiRequest, NextApiResponse } from 'next'
import { QueryResult } from 'pg'
import { pool } from '../../utils/database'

export default async (req: NextApiRequest, res: NextApiResponse) => {

  try{        
    const { method } = req;
    switch (method) {
      case 'GET':
        const response: QueryResult = await pool.query('SELECT * FROM accounts');
        return res.json(response.rows);
        break
      case 'POST':
        let {account} = req.body;
        await pool.query('INSERT INTO accounts (account) VALUES ($1)', [account]);
        const lastAccount: QueryResult = await pool.query('SELECT * FROM accounts WHERE id = (SELECT MAX(id) FROM accounts)');
        return res.json({
            message: 'account added successfully',
            body: lastAccount.rows[0]
        })
        break
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch(err) {
      console.error(err);
      return res.json('error');
  }

}
