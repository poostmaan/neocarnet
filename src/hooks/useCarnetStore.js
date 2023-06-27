import { useDispatch, useSelector } from "react-redux";
import { setActiveCarnet, setErrorMessage, setLoading } from "../store/carnets";
import CarnetApi from "../api/CarnetApi";

export const useCarnetStore = () => { 

    const dispatch = useDispatch();

	const {
		errorMessage,
        activeCarnet
	} = useSelector(state => state.carnet)

    const { bussiness } = useSelector(state => state.auth)

    const startLoadingCarnet = async() => {
        dispatch(setLoading());

        try {

            const carnet = await CarnetApi.get(`/api/bussiness/${bussiness.id}/carnet`);
            dispatch( setActiveCarnet({ activeCarnet: carnet.data.data }) );

        } catch (error) {
            dispatch(setErrorMessage(error));
        }

    }

    const startSavingCarnet = async(data) => {
        dispatch(setLoading());

        try {

            const createdCarnet = await CarnetApi.post(`/api/bussiness/${bussiness.id}/carnet`, data);
            dispatch( setActiveCarnet({ activeCarnet: createdCarnet.data.data }) );
            
        } catch (error) {
            dispatch(setErrorMessage(error));
        }
    }

    return {
        activeCarnet,
        errorMessage,
        startLoadingCarnet,
        startSavingCarnet
    }
}