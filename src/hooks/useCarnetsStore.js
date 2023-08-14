import { useDispatch, useSelector } from "react-redux";
import {
  setActiveCarnet,
  setCarnets,
  setErrorMessage,
  setFields,
  setLoading,
} from "../store/carnets";
import CarnetApi from "../api/CarnetApi";

export const useCarnetsStore = () => {
  const dispatch = useDispatch();

  const { 
    total, 
    errorMessage, 
    activeCarnet, 
    fields, 
    loading 
  } = useSelector(
    (state) => state.carnets
  );

  const { bussiness } = useSelector((state) => state.auth);

  const startLoadingCarnet = async () => {
    dispatch(setLoading());

    try {
      const carnet = await CarnetApi.get(
        `/api/v1/bussiness/${bussiness.id}/carnets`
      );
      dispatch(setCarnets({ total: carnet.data.data }));

      // let fields = carnet.data.data.fields.split(",");

      // dispatch(setFields({ fields }));
    } catch (error) {
      dispatch(setErrorMessage(error));
    }
  };

  const startSavingCarnet = async (data) => {
    dispatch(setLoading());

    try {
      const createdCarnet = await CarnetApi.post(
        `/api/v1/bussiness/${bussiness.id}/carnets`,
        data
      );
      dispatch(setActiveCarnet({ activeCarnet: createdCarnet.data.data }));
    } catch (error) {
      dispatch(setErrorMessage(error));
    }
  };

  const updateFields = async (field) => {
    console.log(fields, field);

    let fieldActived = fields.includes(field);

    let newFields = "";

    if (fieldActived) {
      newFields = fields.filter((e) => e !== field);
    } else {
      newFields = [...fields, field];
    }

    dispatch(setFields({ fields: newFields }));
  };

  return {
    total,
    loading,
    fields,
    activeCarnet,
    errorMessage,
    startLoadingCarnet,
    startSavingCarnet,
    updateFields,
  };
};
