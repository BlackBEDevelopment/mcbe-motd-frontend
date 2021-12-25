import axios from "axios";

export default {
    async query(ip,port){
        return await axios.get('/api?host='+ip+":"+port);
    }
}