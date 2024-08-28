import { Button } from "react-bootstrap";
import logo512 from "/512.png";

const Home = () => {
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
      <div style={{textAlign:"center"}}>
        <h3>Oreo Pika</h3>
        <p>Oreo.Pika is a cat!!!!</p>
        <Button>Says Meow</Button>
      </div>
    </>
  );
};

export default Home;
