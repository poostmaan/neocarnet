import { useDispatch, useSelector } from 'react-redux';
import { checking, login, logout, error as setError } from '../store';
import CarnetApi from '../api/CarnetApi';
import axios from 'axios';

export const useAuthStore = () => {

	const dispatch = useDispatch();

	const {
		authenticated,
		bussinessName,
		id,
		errorMessage
	} = useSelector(state => state.auth)

	const startLogin = async (data) => {
		dispatch(checking());

		try {

			// TODO: Consultar con la api y validar los datos con el servidor

			if (!data.email || !data.password) throw { errorMessage: "Se debe enviar un usuario y contraseña" }
			if (!data.captcha || !data["g-recaptcha-response"]) throw { errorMessage: "Debe completar el catcha de verificación" }

			console.log(data.captcha);
			const validatedUser = await CarnetApi.post("api/bussiness/login", data);

			if (validatedUser.data.statusCode !== 201) throw { errorMessage: validatedUser.response.data.data.response };

			const id = validatedUser.data.data[0].id;
			const bussinessName = validatedUser.data.data[0].bussinessName;
			dispatch(login({ id, bussinessName }));
		} catch (error) {

			let message = "";

			if (error.errorMessage) message = error.errorMessage;
			else if (error.response.data.data.response) message = error.response.data.data.response;
			else message = "Algo salió mal, verifique e intente nuevamente";

			dispatch(setError({ error: message }));
		}
	}

	const startLogout = () => {
		dispatch(logout())
	}

	return {

		// ** Variables
		authenticated,
		bussinessName,
		id,
		errorMessage,

		// ** Metodos
		startLogin,
		startLogout,
	}
}