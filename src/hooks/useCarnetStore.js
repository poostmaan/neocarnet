import { useDispatch, useSelector } from "react-redux";
import { setActiveCarnet, setErrorMessage, setFields, setLoading } from "../store/carnets";
import CarnetApi from "../api/CarnetApi";

export const useCarnetStore = () => { 

    const dispatch = useDispatch();

	const {
		errorMessage,
        activeCarnet,
        fields
	} = useSelector(state => state.carnet)

    const { bussiness } = useSelector(state => state.auth)

    const startLoadingCarnet = async() => {
        dispatch(setLoading());

        try {

            const carnet = await CarnetApi.get(`/api/bussiness/${bussiness.id}/carnet`);
            dispatch( setActiveCarnet({ activeCarnet: carnet.data.data }) );

            let fields = carnet.data.data.fields.split(",");

            dispatch( setFields({ fields }) );

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

    const updateFields = async(field) => {

        console.log(fields, field);

        let fieldActived = fields.includes(field)

        let newFields = "";

        if(fieldActived) {
            newFields = fields.filter(e => e !== field);
        } else {
            newFields = [ ...fields, field ];
        }

        dispatch( setFields({ fields: newFields }) );

    }

    return {
        currentfields: fields,
        activeCarnet,
        errorMessage,
        startLoadingCarnet,
        startSavingCarnet,
        updateFields
    }
}