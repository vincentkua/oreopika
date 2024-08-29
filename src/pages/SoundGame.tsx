import { Button } from "react-bootstrap";
import Meow1 from "../assets/sounds/meow1.mp3";
import Meow2 from "../assets/sounds/meow2.mp3";
import Vacuum from "../assets/sounds/vacuum.mp3";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SoundGame = () => {
  const navigate = useNavigate();
  const [currentSound, setCurrentSound] = useState<HTMLAudioElement | null>(
    null
  );
  const [elapsedTime, setElapsedTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playsound = (path: string) => {
    // Stop the currently playing sound, if any
    if (currentSound) {
      currentSound.pause();
      currentSound.currentTime = 0; // Reset the sound to the beginning
    }

    // Create and play a new sound
    const newSound = new Audio(path);
    setCurrentSound(newSound);
    setElapsedTime(0);
    setDuration(0);
    newSound.play();

    // Update status when the new sound ends
    newSound.onended = () => {
      setCurrentSound(null);
    };

    // Track the duration when metadata is loaded
    newSound.onloadedmetadata = () => {
      setDuration(newSound.duration);
    };

    // Track the elapsed time as the audio plays
    newSound.ontimeupdate = () => {
      setElapsedTime(newSound.currentTime);
    };
  };

  // Calculate the progress percentage
  const progress = duration ? (elapsedTime / duration) * 100 : 0;

  // Format elapsed and total duration
  const formattedElapsedTime = duration ? Math.floor(elapsedTime) : 0;
  const formattedDuration = duration ? Math.floor(duration) : 0;

  return (
    <>
      <p
        style={{ color: "gray", cursor: "pointer", paddingLeft: "4px" }}
        onClick={() => navigate("/")}
      >
        <u>&lt; back</u>
      </p>
      <div style={{ textAlign: "center" }}>
        <h4>Sound Game</h4>
        <div
          style={{
            width: "300px",
            margin: "auto",
            padding: "10px",
          }}
        >
          <progress
            value={progress}
            max={100}
            style={{ width: "250px", height: "20px" }}
          />
          <p style={{ margin: "0" }}>
            {formattedElapsedTime}/{formattedDuration} seconds
          </p>
        </div>
        <br />
        <br />
        <Button style={{ margin: "2px" }} onClick={() => playsound(Meow1)}>
          Meow 1
        </Button>
        <Button style={{ margin: "2px" }} onClick={() => playsound(Meow2)}>
          Meow 2
        </Button>
        <Button style={{ margin: "2px" }} onClick={() => playsound(Vacuum)}>
          Vacuum
        </Button>
      </div>
    </>
  );
};

export default SoundGame;
