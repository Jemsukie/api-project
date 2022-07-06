const Container = () =>{

    return (
        <div className="container">
            <input type="text" className="search" placeholder="City or State" />
            <br /><br />
            <span id="count">(↑) Type here to check cities (↑)</span>
            <ul className="suggestions">
            <li>Filter for a city</li>
            <li>or a state</li>
            </ul>
      </div>
    )
}
export default Container;