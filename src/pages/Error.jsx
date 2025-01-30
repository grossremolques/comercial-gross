import { useNavigate } from "react-router-dom";
export default function Error() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <h1>NotFound</h1>
      <button className="" onClick={handleClick}>Go to Home</button>
    </>
  );
}