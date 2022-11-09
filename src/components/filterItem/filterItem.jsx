import './filterItem.css'
const FilterItem=({value})=>{
    return(
        <div className="filter-item">
            <input type="checkbox" className="" name={value} id={value}  />
            <span className="checkmark"></span>
            <label htmlFor={value} className="filter-item-checkbox">{value}</label>
        </div>)
}
export default FilterItem;