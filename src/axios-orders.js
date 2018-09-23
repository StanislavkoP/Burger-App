import axios from 'axios';

const instance = axios.create({
	baseURL : 'https://react-burger-app-4335c.firebaseio.com/'
});

export default instance;