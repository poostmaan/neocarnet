import { Business } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import CarnetApi from "../api/CarnetApi";
import { deleteApikey, setApikey, setApikeys, setErrorMessage, setLoading } from "../store";

export const useApikeyStore = () => {
  const dispatch = useDispatch();

  const { newApikey, deletedApikey, apikeys, loading, errorMessage } = useSelector((state) => state.apikey);

  const startLoadingApikeys = async (bussinessid) => {

    dispatch( setLoading() );
    
    try {
      const getApikeys = await CarnetApi.get(`/api/bussiness/${bussinessid}/apikey`);
      
      const apikeys = getApikeys.data.data;

      dispatch( setApikeys({apikeys}) )  

    } catch (error) {
      let errorMessage = error.response.data.data.response
      dispatch(setErrorMessage({errorMessage}))
    }

  }

  const startSaveApikey = async(bussinessid) => {
    if(!bussinessid) return;

    dispatch( setLoading() );

    try {
      const apikey = await CarnetApi.post(`/api/bussiness/${bussinessid}/apikey`);
      dispatch( setApikey({ apikey: apikey.data.data}) );

    } catch (error) {
      let errorMessage = error.response.data.response;
      dispatch(setErrorMessage({errorMessage}));
    }
  }

  const startDeletingApikey = async(bussinessid, idapikey) => {
    if(!bussinessid) return;
    if(!idapikey) return;

    dispatch( setLoading() );

    try {
      await CarnetApi.delete(`/api/bussiness/${bussinessid}/apikey/${idapikey}`);

      dispatch( deleteApikey({ apikey: idapikey }) );

    } catch(error) {
      let errorMessage = error.response.data.response

      dispatch(setErrorMessage({errorMessage}))

      return null;
    }
  }

  return {
    // * Variables
    newApikey,
    apikeys, 
    errorMessage, 
    loading,
    deletedApikey,

    // * Methods

    startDeletingApikey,
    startLoadingApikeys, 
    startSaveApikey,
  };
};
