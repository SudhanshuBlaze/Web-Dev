import { connect } from "react-redux";
import buyIcecream from "../redux/icecream/icecreamActions";

function IcecreamContainer({ numOfIcecreams, buyIcecream }) {
  return (
    <div>
      <h2>Number of Icecreams: {numOfIcecreams}</h2>
      <button onClick={buyIcecream}>Buy Icecreams</button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    // state.icecream... : because we have combined reducers with this name
    numOfIcecreams: state.icecream.numOfIcecreams,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    buyIcecream: () => dispatch(buyIcecream()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IcecreamContainer);
