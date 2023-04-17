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
        
        dispatch( checking() );

        try {
            // TODO: Consultar con la api y validar los datos con el servidor

            if (!data.email || !data.password) throw { errorMessage: "Se debe enviar un usuario y contraseña" }
            if (!data.captcha) throw { errorMessage: "Debe completar el catcha de verificación" }

            const validatedUser = await CarnetApi.post("/api/bussiness/login", data);

            if (validatedUser.data.statusCode !== 201) throw { message: "asdsd" };

            const bussiness = validatedUser.data.data[0];
            dispatch( login({ bussiness: bussiness }) )
        } catch (error) {
            let message = error.errorMessage ?? "Algo salió mal, verifique e intente nuevamente";
            dispatch(setError({ error: message }));
        }
    }

    const startRegister = async(data) => {

        dispatch( checking() );

        try {
            const dataSaved = await CarnetApi.post('/api/bussiness/register', data);
            delete data.password;

            data.id = dataSaved.data.data.id;

            dispatch( login({ bussiness: data }) )
        } catch (error) {
            dispatch( setError({ error }) );
        }
    }

    const startLogout = () => {
        dispatch( logout() )
    }

    return {

        // ** Variables
        authenticated,
        bussinessName,
        id,
        errorMessage,

        // ** Metodos
        startLogin,
        startRegister,
        startLogout,
    }
}