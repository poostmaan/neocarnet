export const TextOptions = () => {
  return (
    <>
      <button id="bold">
        <b>N</b>
      </button>
      <button id="italic">
        <i>I</i>
      </button>
      <button id="underline">
        <u>U</u>
      </button>
      &nbsp; Fuente: &nbsp;
      <select id="fontSelector">
        <option value="Arial">Arial</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Verdana">Verdana</option>
        <option value="Georgia">Georgia</option>
        <option value="Impact">Impact</option>
        <option value="Comic Sans MS">Comic Sans MS</option>
      </select>
      &nbsp; Color: &nbsp;
      <input type="color" id="fontColor" />
    </>
  );
};
