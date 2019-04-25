const baseURL = 'http://localhost:3000';

class DATAHandler {
    constructor(baseURL) {
        this.BASE_URL = baseURL;
    }
    postProjectTitle(inputTitle) {
        return axios.post(`${baseURL}/api/addProject`, inputTitle).then(response => {
            return response;
        });
    }
    postNewTask(formData) {
        return axios.post(`${baseURL}/api/addTask`, formData).then(response => {
            return response;
        });
    }
}
