import Container from '../components/container'
import Accounts from '../components/accounts'
import AddAccount from '../components/addAccount'
const url = '/api/accounts'
import {useState} from 'react'
import { pool } from '../utils/database'


const Index = (props) => {

    const [accounts, setAccounts] = useState({
        data: props.accounts,
        url: ''
    })

    return (
        <Container title={'Accounts'}>

            <h1 className="text-center">Instagram Accounts Currently Following</h1>

            <AddAccount accounts={accounts} setAccounts={setAccounts} url={url} />

            <Accounts accounts={accounts.data} />

        </Container>
    )
}

export async function getStaticProps(ctx) {
    try {
        const response = await pool.query('SELECT * FROM accounts');
        return {
            props: {
                accounts: response.rows,
                error: false
            },
        } 
    } catch (err) {
        console.error(err.message);
        return {
            props: {
                accounts: '',
                error: true
            },
        }
    }
}

export default Index