import "./style.css";
const RadioFilter = ({ labelName, check, checkedd }) => {
  const onCheck = (e) => {
    
  };
  return (
    <>
      <div className="radio-label">
        <input
          type="radio"
          name={"filter"}
        //   checked={check}
          onChange={(e) => onCheck(e)}
          id={labelName}
        />
        <label htmlFor={labelName}>{labelName}</label>
      </div>
    </>
  );
};
export default RadioFilter;
