import axios from 'axios';

export class PersonaService {
    baseUrl = "http://localhost:5000/api/personas";

    getAll(){
        return axios.get(this.baseUrl).then(res => res.data);
    }

    save(persona) {
        return axios.post(this.baseUrl, persona).then(res => res.data);
    }

    edit(id,persona) {
        return axios.put(this.baseUrl + "/"+id, persona).then(res => res.data);
    }

    delete(id) {
        return axios.delete(this.baseUrl + "/"+id).then(res => res.data);
    }
}