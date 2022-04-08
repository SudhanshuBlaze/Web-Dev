import { useState } from "react";
import { connect } from "react-redux";
import { buyCake } from "../redux/cake/cakeActions";

function NewCakeContainer({ numOfCakes, buyCake }) {
  const [number, setNumber] = useState(1);
  return (
    <div>
      <h2>Number of cakes: {numOfCakes}</h2>
      <input
        type="text"
        value={number}
        onChange={e => setNumber(e.target.value)}
      />
      <button onClick={() => buyCake(number)}>Buy {number} Cake</button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    // state.cake... : because we have combined reducers with this name
    numOfCakes: state.cake.numOfCakes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    buyCake: number => dispatch(buyCake(number)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCakeContainer);
