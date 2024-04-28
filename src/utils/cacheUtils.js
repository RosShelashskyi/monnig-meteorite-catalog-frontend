//Used to store and get data from local storage
export default{
    set(key, data, expire){
        let cachedValue = {data};
        if(expire){
            cachedValue.expire = new Date().getTime() + expire * 1000;
        }
        localStorage.setItem(key, JSON.stringify(cachedValue));
    },
    get(key){
        const cachedValueString = localStorage.getItem(key);
        if(cachedValueString){
            const cachedValue = JSON.parse(cachedValueString);
            const expire = cachedValue.expire;

            if(expire && expire < new Date().getTime()){
                localStorage.removeItem(key);
                return null;
            }
            return cachedValue.data;
        }
        return null;
    },
    remove(key){
        localStorage.removeItem(key);
    }
}