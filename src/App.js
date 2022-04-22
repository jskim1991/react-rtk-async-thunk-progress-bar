import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "./store/user-slice";
import LoadingPage from "./LoadingPage";

function App() {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="App">
      <LoadingPage />
      {!isLoading &&
        users.map((user) => {
          return <div key={user.id}>{user.name}</div>;
        })}
    </div>
  );
}

export default App;
