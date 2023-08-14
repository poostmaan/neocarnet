import { Chip } from "@mui/material";
import { useState } from "react";
import { useCarnetsStore } from "../../hooks";

export const ChipFields = ({ field, active }) => {

  const [actived, setActive] = useState(false)

  const {
    updateFields,
  } = useCarnetsStore();


  const handleDelete = () => {
    setActive(!actived);
  };

  console.log({ field, active })

  return (
    <>
      <Chip id={field} label={field} onClick={ () => updateFields(field) } className={ active ? 'chip-active' : '' }/>
    </>
  );
};
