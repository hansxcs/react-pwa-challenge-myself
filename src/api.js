import axios from 'axios';

export default axios.create({
    baseURL:"https://challengemyself.andisusanto.tech/api/v1",
    responseType:"json"
});