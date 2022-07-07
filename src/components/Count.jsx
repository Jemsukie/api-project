const Count = (props) => {
  return (
    <ul>
      {props.list.map((item, index) => {
        return (
          <li key={index}>
            <span className="name">
              {item.cityName}, {item.stateName}
              <>&nbsp;</>
            </span>
            <span className="population">{item.population}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Count;
