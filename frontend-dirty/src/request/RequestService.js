import axios from "axios";

export default class RequestService {

    makeRequest(apiUrl) {
        axios.get(apiUrl)
            .then(response => {
                // return response.data;
                // this.setState({
                //     data: response.data
                // });
            })
            .catch(error => {
                console.log(error);
            })
    }

    getCards() {
        return this.makeRequest('https://reqres.in/api/users');
    }
}