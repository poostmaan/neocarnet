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
            if (!data.captcha) throw { errorMessage: "Debe completar el catcha de verificación" }

            console.log(data.captcha);
            const validatedUser = await CarnetApi.post("api/bussiness/login", data);

            console.log(validatedUser);
            if (validatedUser.data.statusCode !== 201) throw { message: "asdsd" };
            // console.log(email, password);

            const id = validatedUser.data.data[0].id;
            const bussinessName = validatedUser.data.data[0].bussinessName;
            dispatch(login({ id, bussinessName }))
            dispatch(setError({ error: "" }));
        } catch (error) {
            console.log(error);
            let message = error.errorMessage ?? "Algo salió mal, verifique e intente nuevamente";
            dispatch(setError({ error: message }));
            console.log('Error al logear' + error)
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