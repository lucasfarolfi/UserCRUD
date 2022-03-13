import api from './api';

export const getAll = () => {
    return api.get("/users").then(res =>{
        return res.data || [];
    }).catch(e =>{
        throw e;
    })
}

export const createPerson = formData => {
    return api.post("/users", formData).then(res =>{
        return res.data || {};
    }).catch(e =>{
        throw e;
    })
}

export const deletePerson = id => {
    return api.delete("/users/"+id).then(res =>{
        return res.data || {};
    }).catch(e =>{
        throw e;
    })
}

export const getOne = id => {
    return api.get("/users/"+id).then(res =>{
        return res.data || {};
    }).catch(e =>{
        throw e;
    })
}

export const updatePerson = (id, body) => {
    return api.patch("/users/"+id, body).then(res =>{
        return res.data || {};
    }).catch(e =>{
        throw e;
    })
}