import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CatchGame = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [score, setScore] = useState(0);
  const [visible, setVisible] = useState(true);
  const [exitClick, setExitClick] = useState(0);
  const [moveDown, setMoveDown] = useState(true);
  const [fontColor, setfontColor] = useState("black");

  useEffect(() => {
    changelocation();
  }, []);

  useEffect(() => {
    const moveDot = () => {
      changelocation();
      setVisible(true);
    };

    if (visible) {
      const interval = setInterval(moveDot, 2000); // Moves every 2 seconds
      return () => clearInterval(interval);
    }
  }, [visible, moveDown]);

  const changelocation = () => {
    const maxX = window.innerWidth - 100; // Width of the dot (60px)
    const maxY = window.innerHeight - 180; // Height minus the header height and margin (80+50)

    const newTop = moveDown ? maxY : 0; // Toggle between topmost (0) and bottommost (maxY)
    setPosition({ top: newTop, left: Math.floor(Math.random() * maxX) });
    setMoveDown(!moveDown); // Toggle direction for the next move
  };

  useEffect(() => {
    if (exitClick === 5) {
      navigate("/");
    }
  }, [exitClick, navigate]);

  const handleClick = () => {
    setScore(score + 1);
    setVisible(false); // Start fading out the dot

    // Change background color to black and revert after 1 second
    setfontColor("green");
    setTimeout(() => {
      setfontColor("black");
    }, 1000);

    setTimeout(() => { // Show the new dot after 1 second
      setVisible(true);
    }, 1000);

    setTimeout(() => {
      changelocation(); // Move the new dot after 1.5 seconds
    }, 1500);
  };

  const preventZoomAndDrag = (e: any) => {
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
          backgroundColor: "white", // Background color state
          transition: "background-color 0.5s", // Smooth transition
        }}
        onWheel={preventZoomAndDrag} // Disable zooming with the mouse wheel
        onDragStart={preventZoomAndDrag} // Disable dragging
      >
        <div
          style={{
            textAlign: "center",
            height: "80px",
            backgroundColor: "white",
            color:fontColor
          }}
        >
          <p
            style={{ margin: "0", fontSize: "32px", cursor: "pointer" }}
            onClick={() => setExitClick(exitClick + 1)}
          >
            {score.toString().padStart(3, "0")}
          </p>
          <p style={{ margin: "0", fontSize: "12px", color: "gray" }}>
            {exitClick > 0
              ? `Click 5 times on score to exit (${exitClick})`
              : "Total Score"}
          </p>
        </div>
        <div
          style={{
            flexGrow: 1,
            position: "relative",
          }}
          onClick={() => setExitClick(0)}
        >
          {visible && (
            <div
              onMouseDown={handleClick}
              onTouchStart={handleClick}
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "white",
                borderRadius: "50%",
                position: "absolute",
                top: `${position.top}px`,
                left: `${position.left}px`,
                transition: "top 2s, left 2s, opacity 2s",
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
