import { useNavigate } from "react-router-dom";
import logo512 from "/512.png";
import Card from "react-bootstrap/Card";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <img
        src={logo512}
        style={{
          display: "block",
          maxWidth: "300px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <div style={{ textAlign: "center" }}>
        <h4>Oreo Pika</h4>
        <p>What do you want to play?</p>
        <br />
        <Card
          style={{
            maxWidth: "300px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#4e7ada",
            color: "white",
            cursor: "pointer",
            marginBottom: "16px",
          }}
          onClick={() => navigate("/catchgame")}
        >
          <Card.Body>Catch The Dot</Card.Body>
        </Card>
        <Card
          style={{
            maxWidth: "300px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#4e7ada",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => navigate("/soundgame")}
        >
          <Card.Body>Make Some Noise</Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Home;
