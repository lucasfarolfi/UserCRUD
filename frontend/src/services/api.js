import api from 'axios';

export default api.create({
    baseURL: "http://localhost:8200",
    headers:{
    'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
    }
});