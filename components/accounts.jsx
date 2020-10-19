import axios from 'axios'

const Accounts = ({accounts}) => {

    return (
        <ul className="mt-5">
            {
                accounts.map(account => (
                <li className="list-group-item list-group-item-action" key={account.id}>
                    <div className="row ml-2">

                        <h5 className="d-flex">{account.id}-<div id={`accountUrl/${account.id}`}>{account.account}</div></h5>

                        <button 
                            type="button" 
                            className="btn btn-outline-secondary ml-auto mr-4" 
                            onClick={async (e) => {
                                    try {
                                        e.preventDefault();
                                        const MILISECS = 1000;
                                        const SECONDS = 60;
                                        const MINUTES = 2;
                                        const REPORT_PERIOD = MINUTES * SECONDS * MILISECS;
                                        
                                        const accountUrl = document.getElementById(`accountUrl/${account.id}`).innerText;
                                        setInterval(async () => {
                                            const response = await axios.post('/api/mail',{account: accountUrl});
                                            console.log(response.data);
                                        }, REPORT_PERIOD);
                                    } catch (err) {
                                        console.error(err.message);
                                    }
                            }} 
                        >
                                Track Account
                        </button>

                    </div>
                </li>
                ))
            }
        </ul>
    )
}

export default Accounts