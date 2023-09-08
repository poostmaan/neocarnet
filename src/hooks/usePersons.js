import { useDispatch, useSelector } from "react-redux";
import CarnetApi from "../api/CarnetApi";
import { setBussinessPersons, uploadPeople, cleanError, cleanPeople, setErrorMessage, setLoading } from "../store/persons";
import { toggleModal } from "../store/carnets";

export const usePersons = () => {

	const dispatch = useDispatch();

  const { bussinessPersons, uploadedPeople, uploadedSucessfully, uploadedFailed, loading, errorMessage } = useSelector((state) => state.persons);


	const getBussinessPersons = async (id) => {

		dispatch(setLoading());
		
		try {
			
			const bussinessPersonsData = await CarnetApi.get(`/api/bussiness/${id}/persons`);

			const bussinessPersons = bussinessPersonsData.data.data;
			dispatch(setBussinessPersons({ bussinessPersons }));
		} catch (error) {
			let message = "";

			if (error.errorMessage) message = error.errorMessage;
			else if (error.response.data.data.response) message = error.response.data.data.response;
			else message = "Algo salió mal, verifique e intente nuevamente";

			dispatch(setErrorMessage({ error: message }));
		}
	}

	const uploadPersons = async (data, bussinessid) => {

		dispatch(setLoading());

		try {
			// * Esta no pertenece al ambito de slim

			console.log(Object.fromEntries(data), bussinessid);
			
			const dataSaved = await CarnetApi.post('/excel2/uploadPeople.php', data); 
			const bussinessPersonsData = await CarnetApi.get(`/api/bussiness/${bussinessid}/persons`)

			dispatch(cleanError());
			dispatch(uploadPeople({ uploadedPeople: dataSaved.data.response }));

			const bussinessPersons = bussinessPersonsData.data.data;
			dispatch(setBussinessPersons({ bussinessPersons }));
			dispatch( toggleModal() );

			

		} catch (error) {
			let errorMessage = error.response.data.response
			dispatch(cleanPeople());
			dispatch(setErrorMessage({ errorMessage }));
		}
	}

	const cleanErrorMessage = () => {
		dispatch(cleanError());
	}

	const cleanPeopleMessages = () => {
		dispatch(cleanPeople());
	}

	return {
		// * Variables
		bussinessPersons,
		uploadedPeople,
		uploadedSucessfully,
		uploadedFailed,
		errorMessage,
		loading,

		// * Methods
		uploadPersons,
		getBussinessPersons,
		cleanErrorMessage,
		cleanPeopleMessages
	};
}

