import axios from 'axios';

export default axios.create({
    baseURL:"http://challengemyself.andisusanto.tech/api/v1",
    responseType:"json"
});