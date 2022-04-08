import { connect } from "react-redux";
import { buyCake } from "../redux/cake/cakeActions";

function CakeContainer({ numOfCakes, buyCake }) {
  return (
    <div>
      <h2>Number of cakes: {numOfCakes}</h2>
      <button onClick={buyCake}>Buy Cake</button>
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
    buyCake: () => dispatch(buyCake()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CakeContainer);
