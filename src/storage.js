
const storage = {
    data: {},
    setData: ( key, data ) => {
        storage.data[key] = data;
    },
    getData: ( key ) => {
        let data = storage.data[key];
        if( Array.isArray(data) ){
            return [
                ...data
            ];
        }
        if( typeof(data) === "object" ){
            return {
                ...data
            }
        }
        return {
            data: storage.data[key] 
        };
    }
}


export default Object.freeze( storage );