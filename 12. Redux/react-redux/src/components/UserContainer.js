import { connect } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../redux/user/userActions";

const UserContainer = ({ userData, fetchUsers }) => {
  useEffect(() => {
    fetchUsers();
  }, []);
  return userData.loading ? (
    <h2>Loading...</h2>
  ) : userData.error ? (
    <h2>{userData.error}</h2>
  ) : (
    <div>
      <h2>UserLists</h2>
      <div>
        {userData?.users.map(user => (
          <li>{user.name}</li>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
