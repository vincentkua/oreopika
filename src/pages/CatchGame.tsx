import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CatchGame = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [score, setScore] = useState(0);
  const [visible, setVisible] = useState(true);
  const [exitclick, setExitclick] = useState(0);
  const [moveDown, setMoveDown] = useState(true);

  useEffect(() => {
    const moveDot = () => {
      const maxX = window.innerWidth - 100; // Width of the dot (60px)
      const maxY = window.innerHeight - 180; // Height minus the header height and margin (80+50)

      const newTop = moveDown ? maxY : 0; // Toggle between topmost (0) and bottommost (maxY)
      setPosition({ top: newTop, left: Math.floor(Math.random() * maxX) });

      setMoveDown(!moveDown); // Toggle direction for the next move
      setVisible(true);
    };

    if (visible) {
      const interval = setInterval(moveDot, 4000); // Moves every 4 seconds
      return () => clearInterval(interval);
    }
  }, [visible, moveDown]);

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
  };

  const preventZoomAndDrag = (e:any) => {
    e.preventDefault(); // Prevent default behavior for zoom and drag
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          touchAction: "none", // Prevent pinch-zoom on touch devices
        }}
        onWheel={preventZoomAndDrag} // Disable zooming with the mouse wheel
        onDragStart={preventZoomAndDrag} // Disable dragging
      >
        <div
          style={{
            textAlign: "center",
            height: "80px",
            backgroundColor: "white",
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
              onMouseDown={handleClick}
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "white",
                borderRadius: "50%",
                position: "absolute",
                top: `${position.top}px`,
                left: `${position.left}px`,
                transition: "top 4s, left 4s, opacity 0.5s",
                cursor: "pointer",
                opacity: visible ? 1 : 0, // Fade out effect
              }}
              onDragStart={preventZoomAndDrag} // Disable dragging for the dot
            >
              <div
                style={{
                  position: "absolute",
                  left: "35px",
                  top: "35px",
                  borderRadius: "50%",
                  backgroundColor: "black",
                  width: "30px",
                  height: "30px",
                }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CatchGame;
