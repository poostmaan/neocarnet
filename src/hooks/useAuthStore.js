import { useDispatch, useSelector } from 'react-redux';
import { checking, login, logout } from '../store';

export const useAuthStore = () => {

    const dispatch = useDispatch();

    const {
        authenticated,
        bussinessName,
        id
    } = useSelector(state => state.auth)

    const startLogin = async(email, password) => { 
        dispatch( checking() );

        try {
            console.log(email, password);

            const id = 231;
            const bussinessName = 'deed';
            dispatch( login({id, bussinessName}) )
        } catch (error) {
            console.log('Error al logear' + error)
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

        // ** Metodos
        startLogin,
        startLogout,
    }
}