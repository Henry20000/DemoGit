// export const isJsonString = (data) => {
//     try {
//         JSON.parse(data)
        
//     } catch (error) {
//         return false
//     }
//     return true
// }


export const isJsonString = (data) => {
    try {
        JSON.parse(data); 
        return true; 
    } catch (error) {
        return false;
    }
}

