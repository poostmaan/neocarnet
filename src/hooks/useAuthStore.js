import { useDispatch, useSelector } from 'react-redux';
import { checking, login, logout, error as setError, cleanError } from '../store';
import CarnetApi from '../api/CarnetApi';

export const useAuthStore = () => {

	const dispatch = useDispatch();

	const {
		authenticated,
		bussiness,
		errorMessage,
		bussinessPersons
	} = useSelector(state => state.auth)

	const startLogin = async (data) => {

		dispatch(checking());

		try {


			if (!data.email || !data.password) throw { errorMessage: "Se debe enviar un usuario y contraseña" }
			if (!data.captcha || !data["g-recaptcha-response"]) throw { errorMessage: "Debe completar el catcha de verificación" }

			const validatedUser = await CarnetApi.post("/api/bussiness/login", data);

			// if (validatedUser.data.statusCode !== 201) throw { errorMessage: validatedUser.response.data.data.response };

			const bussinessPersons = await CarnetApi.get(`/api/bussiness/${validatedUser.data.data.id}/persons`)


			const bussiness = validatedUser.data.data;
			bussiness.bussinessPersons = bussinessPersons.data.data;
			dispatch(login({ bussiness: bussiness }))
		} catch (error) {

			let message = "";

			if (error.errorMessage) message = error.errorMessage;
			else if (error.response.data.data.response) message = error.response.data.data.response;
			else message = "Algo salió mal, verifique e intente nuevamente";

			dispatch(setError({ error: message }));
		}
	}

	const startRegister = async (data) => {

		dispatch(checking());

		try {
			const dataSaved = await CarnetApi.post('/api/bussiness/register', data);
			delete data.password;

			data.id = dataSaved.data.data.id;

			dispatch(login({ bussiness: data }))
		} catch (error) {
			let errorMessage = error.response.data.data.response
			dispatch(setError({ error: errorMessage }));
		}
	}

	const startUpdating = async (data) => {
		dispatch(checking());

		try {
			const dataSaved = await CarnetApi.put(`/api/bussiness/${bussiness.id}`, data);

			dispatch(login({ bussiness: data }))

		} catch (error) {
			let errorMessage = error.response.data.data.response
			dispatch(setError({ error: errorMessage }));
		}
	}

	const cleanErrorMessage = () => {
		dispatch(cleanError());
	}

	const startLogout = () => {
		dispatch(logout())
	}

	const uploadPersons = async (data) => {

		dispatch(checking());

		try {

			const LocalApi = axios.create({
				baseURL: "http://127.0.0.1:8080/neoCARNETSLocal"
			})

			const dataSaved = await CarnetApi.post('', data);
			delete data.password;

			data.id = dataSaved.data.data.id;

			dispatch(login({ bussiness: data }))
		} catch (error) {
			let errorMessage = error.response.data.data.response
			dispatch(setError({ error: errorMessage }));
		}
	}

	return {

		// ** Variables
		authenticated,
		bussiness,
		errorMessage,
		bussinessPersons,

		// ** Metodos
		startLogin,
		startRegister,
		startLogout,
		startUpdating,
		cleanErrorMessage,
		uploadPersons
	}
}