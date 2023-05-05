import { useDispatch, useSelector } from "react-redux";
import CarnetApi from "../api/CarnetApi";
import { setBussinessPersons, uploadPeople, cleanError, cleanPeople, setErrorMessage, setLoading } from "../store/persons";
import axios from "axios";

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

	const uploadPersons = async (data, bussinessId) => {

		dispatch(setLoading());

		try {
			// console.log("asddd");
			// const LocalApi = axios.create({
			// 	baseURL: "http://127.0.0.1:8080/neoCARNETSLocal"
			// })

			const dataSaved = await CarnetApi.post('/excel/uploadPeople.php', data);
			const refreshData = await CarnetApi.get(`/api/bussiness/${bussinessId}/persons`)

			dispatch(cleanError());
			dispatch(uploadPeople({ uploadedPeople: dataSaved.data.response }));
			dispatch(setBussinessPersons({ bussinessPersons: refreshData.data.data }))
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

