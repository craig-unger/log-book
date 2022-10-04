import {useState, useEffect} from 'react'; 
import {useParams,useOutletContext, useNavigate} from 'react-router-dom'

export default function EditProfile(){
    //navigation
    const navigate = useNavigate(); 
    //useState
    const [user,setUser] = useState(localStorage.getItem("token"));
    //params
    const params = useParams();
    // let user = users.find(u=>u.username == params.username);
    const [address, setAddress] = useState(user?.address)
    const [phone, setPhone] = useState(user?.phone)

    useEffect(()=>{
        let config  = {
            method:'GET',
            headers:{ 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }
        fetch(`http://localhost:8080/account/me`,config)
            .then(r=>r.json())
            .then(j => {
                setUser(j); 
            })
            .catch(e=>alert(e.message))

    },[params.username])

//     fetch(`http://localhost:8080/account/me`,config)

// },[params.username])

    //functions
    function updateProfile(){
        fetch(`http://localhost:8080/account/me`,{
            method:"PUT",
            headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,'Content-Type':'application/json'},
            // headers:{'Content-Type':'application/json'},
            body:JSON.stringify( {_id:user._id, address, phone, username:user.username, firstName:user.firstName, lastName:user.lastName, password:user.password})
            // body:JSON.stringify( {_id:user.username, address, phone})
        })
        .then(r=>r.json())
        .then(j => {
            //setUser(user.map(u=>u.username == params.username ? j : u)); /////////////////
            setUser(j)
            navigate("/user/$username")
        })
        .catch(e => alert(e.message)); 
    }
    // function cancel button
    function backButton(){
        navigate("/user/$username");
    }
    //JSX

    if(user == undefined){      
        return (<div>Not Found</div>);      
    }
    else{
        
        return(

            <div className="Div-border">
                <div>
                <h2>Edit details</h2>
                </div> 
                <label>Customer ID: {user?._id}</label>
                <div>
                <label>Username: {user?.username} </label>
                </div>
                <div>
                <label>First Name: {user?.firstName} </label>
                </div>
                <div>
                <label>Last Name: {user?.lastName} </label>
                </div>
                <div>
                <label>Address: {user?.address} </label>
                </div>
                <input value={address || ''} onChange={e=>setAddress(e.target.value)} />
                <div>
                <label>Phone: {user?.phone} </label>
                </div>
                <input value={phone || ''} onChange={e=>setPhone(e.target.value)} />
                <div>
            <button onClick={updateProfile}>Save</button>
            <button onClick={backButton}>Cancel</button>
            </div>
            </div>
        );

    }
}