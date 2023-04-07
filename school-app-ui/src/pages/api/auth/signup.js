import { hash } from "bcryptjs"

export default async function handler(req, res){
    const USER_BASE_URL="http://localhost:8080/api/v1/users"

    if(req.method == 'POST'){
        const {email, password, fullName, status} = req.body

        //user exists
        const checkExisting = await fetch(USER_BASE_URL + '/' + email)
        if(checkExisting.ok) return res.status(422).json({message: "User already exists"})

        const hashedPassword = await hash(password, 12)

        //try to register user
        const postRequest = await fetch(USER_BASE_URL, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({emailId: email, password: hashedPassword, fullName: fullName, status: status})})
        if(!postRequest.ok) return res.status(404).json({message: "Can't register user"})

        
        res.status(201).json({message: "Registered User"})
        
        
    }else{
        res.status(500).json({message: "HTTP method not valid"})
    }
}