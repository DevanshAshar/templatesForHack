
export default async function getUserDataAndAuth() {
    const response = {
        isLoggedIn:false,
        user:{
            username:null,
            attributes:null
        }
    }

    const data =await fetch("/getAuth",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include"
    })
    console.log(dataInJSON)
    const dataInJSON = await data.json()
    if(data.status==200){
        response.isLoggedIn=true
        response.user.username=dataInJSON.username
    }
    return response
}
