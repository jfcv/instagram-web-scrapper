import axios from 'axios';

const AddAccount = ({accounts, setAccounts, url}) => {

    const onChange = (e) => {
        setAccounts({
            data: accounts.data,
            url: e.target.value
        });
    }

    const handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
    }

    const onSubmitForm = async (e) => {
        
        try {
            e.preventDefault();
            if(accounts.url !== '') {
                const response = await axios.post(url,{account: accounts.url});
                setAccounts({
                    data: [...accounts.data, response.data.body],
                    url: ''
                });
                handleReset();
            } else {
                console.log('Empty form ! Fill it out !');
            }
        } catch (err) {
            console.error(err.message);
        }
        
    }

    return (
        <form className="d-flex flex-column mt-5" onSubmit={onSubmitForm}>
            <input 
                id="inputText"
                type="text" 
                className="form-control" 
                onChange={onChange}
            />
            <button 
                type="button" 
                className="btn btn-outline-primary mt-2"
                onClick={onSubmitForm}
            >
                Add Account
            </button>
        </form>
    )
}

export default AddAccount