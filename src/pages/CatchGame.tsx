import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CatchGame = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [score, setScore] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dotColor, setDotColor] = useState("blue");
  const [exitclick, setExitclick] = useState(0);

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const moveDot = () => {
      const maxX = window.innerWidth - 40; // Width of the dot (30px)
      const maxY = window.innerHeight - 140; // Height minus the header height and margin

      const newLeft = Math.floor(Math.random() * maxX);
      const newTop = Math.floor(Math.random() * maxY);

      setPosition({ top: newTop, left: newLeft });
      setVisible(true);
    };

    if (visible) {
      const interval = setInterval(moveDot, 1000); // Moves every second
      return () => clearInterval(interval);
    }
  }, [visible]);

  useEffect(() => {
    if (exitclick === 5) {
      navigate("/");
    }
  }, [exitclick, navigate]);

  const handleClick = () => {
    setScore(score + 1);
    setVisible(false); // Start fading out the dot
    setTimeout(() => {
      setVisible(true); // Show the new dot after 3 seconds
    }, 3000);
    setDotColor(generateRandomColor()); // Set a new random color
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <div
          style={{
            textAlign: "center",
            height: "80px",
            backgroundColor: "white",
            borderBottom: "1px solid lightgray",
          }}
        >
          <p
            style={{ margin: "0", fontSize: "32px", cursor: "pointer" }}
            onClick={() => setExitclick(exitclick + 1)}
          >
            {score.toString().padStart(3, "0")}
          </p>
          <p style={{ margin: "0", fontSize: "12px", color: "gray" }}>
            {exitclick > 0
              ? `Click 5 times on score to exit (${exitclick})`
              : "Total Score"}
          </p>
        </div>
        <div
          style={{
            backgroundColor: "white",
            flexGrow: 1,
            position: "relative",
          }}
          onClick={() => setExitclick(0)}
        >
          {visible && (
            <div
              onClick={handleClick}
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: dotColor, // Use the random color
                borderRadius: "50%",
                position: "absolute",
                top: `${position.top}px`,
                left: `${position.left}px`,
                transition: "top 1s, left 1s, opacity 0.5s",
                cursor: "pointer",
                opacity: visible ? 1 : 0, // Fade out effect
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CatchGame;
