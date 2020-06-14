import axios from 'axios';
var url = {
    local: "http://127.0.0.1:8000/api/v1",
    prod: "https://challengemyself.andisusanto.tech/api/v1",
};
export default axios.create({
    baseURL: url.prod,
    responseType: "json"
});