import { useDispatch, useSelector } from "react-redux";
import {
  onEmptyEditor,
  setActiveCarnet as setActiveCarnetStore,
  setCarnet,
  setCarnets,
  setErrorMessage,
  setFields,
  setLoading,
  setSavedCarnet,
  toggleCarnetStatus,
  toggleModal
} from "../store/carnets";
import CarnetApi from "../api/CarnetApi";

export const useCarnetsStore = () => {

  const dispatch = useDispatch();

  const { 
    total, 
    errorMessage, 
    activeCarnet, 
    editor, 
    loading,
    modalIsOpened, 
  } = useSelector(
    (state) => state.carnets
  );

  const { bussiness } = useSelector((state) => state.auth);

  const toggleModal_ = () => {
    dispatch(toggleModal());
  }

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

    const { id } = activeCarnet;

    try {
      const createdCarnet = await CarnetApi.put(
        `/api/v1/bussiness/${bussiness.id}/carnets/${ id }`,
        data
      );
      dispatch(setActiveCarnetStore({ activeCarnet: createdCarnet.data.data }));
      dispatch(setSavedCarnet());
    } catch (error) {
      dispatch(setErrorMessage(error)); 
    }
  };

  const startCreatingCarnet = async(newCarnet) => {
    dispatch(setLoading());

    try {
      const createdCarnet = await CarnetApi.post(
        `/api/v1/bussiness/${bussiness.id}/carnets`,
        newCarnet
      );

      dispatch( setCarnet({ newCarnet: createdCarnet.data.data }));
      dispatch( toggleModal() );

    } catch (error) {
      dispatch(setErrorMessage(error)); 
    }
  }

  const updateFields = async (field) => {
    console.log(editor.fields, field);

    let fields = editor.fields;
    let fieldActived = fields.includes(field);

    let newFields = "";

    if (fieldActived) {
      newFields = fields.filter((e) => e !== field);
    } else {
      newFields = [...fields, field];
    }

    dispatch(setFields({ fields: newFields }));
  };

  const setInitFields = (fields) => {
    dispatch(setFields({ fields }));
  }

  const emptyFields = () => {
    dispatch(setFields({ fields: [] }));
  }

  const emptyEditor = () => {
    dispatch(onEmptyEditor())
  };

  const getPersonsByCarnetid = (carnetid) => total.find( elem => elem.id === carnetid )?.persons || [];

  const setActiveCarnet = (carnet) => {
    dispatch(setActiveCarnetStore({ activeCarnet: carnet }));
  }

  const disableCarnet = async(carnetid) => {
    dispatch(setLoading());

    try {
      await CarnetApi.patch(
        `/api/v1/bussiness/${bussiness.id}/carnets/${carnetid}`,
        { isDisabled: 1 }
      );

      dispatch( toggleCarnetStatus({ carnetid, isDisabled: 1 }) );

    } catch (error) {
      dispatch(setErrorMessage(error));
    }
  }

  const enableCarnet = async(carnetid) => {
    dispatch(setLoading());

    try {
      await CarnetApi.patch(
        `/api/v1/bussiness/${bussiness.id}/carnets/${carnetid}`,
        { isDisabled: 0 }
      );

      dispatch( toggleCarnetStatus({ carnetid, isDisabled: 0 }) );

    } catch (error) {
      dispatch(setErrorMessage(error));
    }
  }

  return {
    // Vars
    total,
    loading,
    editor,
    activeCarnet,
    errorMessage,
    modalIsOpened,
    // Functions
    disableCarnet,
    emptyEditor,
    emptyFields,
    enableCarnet,
    getPersonsByCarnetid,
    setActiveCarnet,
    setInitFields,
    startCreatingCarnet,
    startLoadingCarnet,
    startSavingCarnet,
    toggleModal_,
    updateFields,
  };
};
