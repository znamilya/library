import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <Link to="/register">Become a member</Link> <Link to="/catalog">Catalog</Link>
    </div>
  );
};
