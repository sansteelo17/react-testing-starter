import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({});

  const clickEventHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      setUser(data);
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <span className="user">{user.name}</span>
      <form>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={!username && !password} onClick={clickEventHandler}>
          {!loading ? "Login" : "Loading..."}
        </button>
        <span style={{ visibility: error ? "visible" : "hidden" }}>
          Something went wrong
        </span>
      </form>
    </div>
  );
};

export default Login;
