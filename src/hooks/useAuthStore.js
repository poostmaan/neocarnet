import { useDispatch, useSelector } from 'react-redux';
import { checking, login, logout, setError } from '../store';
import CarnetApi from '../api/CarnetApi';
import { logoutCarnet } from '../store/carnets';
import { logoutPersons } from '../store/persons';
export const useAuthStore = () => {

	const dispatch = useDispatch();

	const {
		authenticated,
		bussiness,
		errorMessage
	} = useSelector(state => state.auth)

	const startLogin = async (data) => {

		dispatch(checking()); 

		try {


			if (!data.email || !data.password) throw { errorMessage: "Se debe enviar un usuario y contraseña" }
			if (!data.captcha || !data["g-recaptcha-response"]) throw { errorMessage: "Debe completar el catcha de verificación" }

			const validatedUser = await CarnetApi.post("/api/bussiness/login", data);

			const bussiness = validatedUser.data.data;
			dispatch(login({ bussiness }));
		} catch (err) {

			let error = "Algo salio mal. Contacte a un administrador";

			dispatch(setError({ error }));
		}
	}

	const startRegister = async (data) => {

		dispatch(checking());

		try {
			const dataSaved = await CarnetApi.post('/api/bussiness/register', data);
			delete data.password;

			data.id = dataSaved.data.data.id;

			dispatch(login({ bussiness: data }))
		} catch (err) {
			let errorMessage = err.response.data.response
			dispatch(setError({ error: errorMessage }));
		}
	}

	const startUpdating = async (data) => {
		if(!data) return;
		dispatch(checking());

		try {

			const dataSaved = await CarnetApi.post(`/api/bussiness/${bussiness.id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      let bussinessUpdated = dataSaved.data.data  

			dispatch(login({ bussiness: bussinessUpdated })) 

		} catch (error) {
      console.log(error)
			dispatch(setError({ error: "algo salio mal" }));
		}
	}

	const startLogout = () => {
		dispatch(logout())
		dispatch(logoutCarnet());
		dispatch(logoutPersons());
	}

	return {

		// ** Variables
		authenticated,
		bussiness,
		errorMessage,

		// ** Metodos
		startLogin,
		startRegister,
		startLogout,
		startUpdating,
	}
}