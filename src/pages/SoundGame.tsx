import { Button } from "react-bootstrap";
import Vacuum from "../assets/sounds/vacuum.mp3";
import MeowAttract1 from "../assets/sounds/MeowAttract1.mp3";
import MeowAttract2 from "../assets/sounds/MeowAttract2.mp3";
import MeowAttract3 from "../assets/sounds/MeowAttract3.mp3";
import MeowScared1 from "../assets/sounds/MeowScared1.mp3";
import MeowScared2 from "../assets/sounds/MeowScared2.mp3";
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
      <div style={{ textAlign: "center" }} className="container">
        <p
          style={{ color: "gray", cursor: "pointer", paddingLeft: "4px" }}
          onClick={() => navigate("/")}
        >
          <u>&lt; back</u>
        </p>
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

        <div
          style={{
            border: "1px solid lightgray",
            maxWidth: "600px",
            margin: "auto",
            borderRadius: "4px",
            padding: "10px",
            backgroundColor:"#f0f0f0"
          }}
        >
          <p style={{ fontWeight: "bold" }}>Attract Cat</p>
          <Button style={{ margin: "2px" }} onClick={() => playsound(MeowAttract1)}>
            Attract 1 
          </Button>
          <Button style={{ margin: "2px" }} onClick={() => playsound(MeowAttract2)}>
            Attract 2
          </Button>
          <Button style={{ margin: "2px" }} onClick={() => playsound(MeowAttract3)}>
            Attract 3
          </Button>
        </div>

        <br />

        <div
          style={{
            border: "1px solid lightgray",
            maxWidth: "600px",
            margin: "auto",
            borderRadius: "4px",
            padding: "10px",
            backgroundColor:"#f0f0f0"
          }}
        >
          <p style={{ fontWeight: "bold" }}>Scaring Cat</p>
          <Button style={{ margin: "2px" }} onClick={() => playsound(MeowScared1)}>
            Scaring 1 
          </Button>
          <Button style={{ margin: "2px" }} onClick={() => playsound(MeowScared2)}>
            Scaring 2
          </Button>
          <Button style={{ margin: "2px" }} onClick={() => playsound(Vacuum)}>
            Scaring 3
          </Button>
        </div>
      </div>
    </>
  );
};

export default SoundGame;
