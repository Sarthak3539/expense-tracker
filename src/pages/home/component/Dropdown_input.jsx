

export default function Dropdown_input(props) {
  const list = props.options?.map((val) => {

    return <option className="drop-down-options pop-input" key={val._id || val} value={val._id || val} selected={props.state[0]==(val._id||val)}>{val.name || val}</option>;
  });

  return (
    <div className="drop-down-container pop-input">
      <select
        className="drop-down-select pop-input"
        // value={props.state[0]}
        onChange={(e) => props.state[1](e.target.value)}
      >
        {list}
      </select>
      
      
     
    </div>
  );
}
