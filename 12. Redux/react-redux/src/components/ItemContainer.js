import { useState } from "react";
import { connect } from "react-redux";
import { buyCake } from "../redux/cake/cakeActions";
import buyIcecream from "../redux/icecream/icecreamActions";

function ItemContainer({ itemNumber, buyItem }) {
  const [number, setNumber] = useState(1);
  return (
    <div>
      <h2>Number of Item: {itemNumber}</h2>
      <button onClick={buyItem}>BuyItem</button>
    </div>
  );
}

// Real world application of "ownProps" param:  when from a list of items when you click on a particular item you will pass the item 'id' as a prop and then fetch the data only for that 'id' from redux

const mapStateToProps = (state, ownProps) => {
  const itemState = ownProps.cake
    ? state.cake.numOfCakes
    : state.icecream.numOfIcecreams;
  return {
    itemNumber: itemState,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const dispatchFunction = ownProps.cake
    ? () => dispatch(buyCake())
    : () => dispatch(buyIcecream());
  return {
    buyItem: dispatchFunction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);
