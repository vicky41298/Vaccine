import { v4 } from "uuid";
export const registerNewUserAPI = async (payload) => {
    try {
        const { data } = await fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...payload
            })
        });
        return data;
    } catch (error) {
        console.error(error);
    }

}
export const validateUserLogin = async (payload) => {
    try {
        const response = await fetch(`http://localhost:3001/users?email=${payload.email}&password=${payload.password}`);
        const data = await response.json();
        if (data.length > 0) {
            return {
                success: true,
                data: data[0]
            };
        }
        return {
            success: false,
            data: null
        }
    } catch (error) {
        console.error(error);
    }
}

export const fetchBookingsByUserId = async(user_id)=>{
    try {
        const response = await fetch(`http://localhost:3001/bookings?user_id=${user_id}`);
        const data = await response.json();
        if (data.length > 0) {
            return {
                success: true,
                data
            };
        }
        return {
            success: false,
            data: null
        }
    } catch (error) {
        console.error(error);
    }
}

export const newBookingAPI = async(payload)=>{
    try{
        const { data } = await fetch(`http://localhost:3001/bookings`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: v4(),
                ...payload
            })
        });
        return {
            success: true,
            data
        };
    }catch(error){
        return Promise.reject(error);
    }
}
//new API CALL for update
export const updateUserLoginAPI = async (payload) => {
    try {
        const {data} = await fetch(`http://localhost:3001/users?email=${payload.email}&password=${payload.password}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: v4(),
                ...payload
            })
        });
        return {
            success: true,
            data
        };
    } catch (error) {
        console.error(error);
    }
}

