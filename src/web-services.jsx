const server = 'http://localhost:8080'

export function loginAsync(username,password){

    let data = {username,password}; 

    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }

    return fetch(`${server}/account/login`,config)

            .then(r => {
          
                if(r.status != 200){
                    throw Error("Invalid Login")
                }
                return r.json();
            })
            .then(j => {
                localStorage.setItem('token',j)
                
                return j; 
            })

}

export function register(username,password,firstName, lastName,address,phone){
    let config = {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body:  JSON.stringify({username,password,firstName,lastName,address, phone})
    }
    return fetch(`${server}/account/register`,config);       
}

export function submitTicket(category){

    let config = {
        method:'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body:  JSON.stringify(category)
    }

    return fetch(`${server}/tickets`,config); 

}

export function fetchAllUsers(){
    let config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }; 

    return fetch(`${server}/account/search`,config); 

}

export function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};