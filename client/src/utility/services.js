export const baseUrl = 'http://localhost:3000';

export const postRequest = async(url,body) => {
    const response = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body
    });
    const data = await response.json();
    console.log('Incoming Posted',data);
    if(!response.ok){
        let message;
        if(data?.message)
            message =  data.message;
        else
            message =  data;
        return {error:true, message}
    }

    return data;
}

export const getRequest = async(url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Incoming GetData',data);

    if(!response.ok){
        let message;
        if(data?.message)
            message = data.message;
        else
            message = data;
        return {error:true,message};
    }
    return data;
}