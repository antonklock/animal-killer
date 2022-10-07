import "./App.css";
import { useState, useEffect, useRef } from "react";
import cow from "./assets/cow.json";
//@ts-ignore
import chickenTest from "./assets/chicken_test.riv";
import {
  Alignment,
  Fit,
  Layout,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import gsap from "gsap";

function App() {
  const industryRef = useRef(null);
  const [playerCount, setPlayerCount] = useState(0);
  const [industryCount, setIndustryCount] = useState(0);
  const [playerAnim, setPlayerAnim] = useState(cow);
  const [explodeVisibility, setExplodeVisibility] = useState<
    "hidden" | "visible"
  >("hidden");

  let animSize = "200px";
  let rate = 0.05;

  const explodeStyle: React.CSSProperties = {
    width: "150px",
    position: "absolute",
    top: "310px",
    left: "auto",
    visibility: explodeVisibility,
  };

  const handleIncreasePlayerCount = () => {
    setPlayerCount(playerCount + 1);
    // @ts-ignore
    // setPlayerAnim(explode);
    explodePlayer?.fire();
    animSize = "10px";
    setExplodeVisibility("visible");
  };

  useEffect(() => {
    const addIndustryPoint = setInterval(() => {
      setIndustryCount((count) => count + 1);
    }, rate * 1000);
    return () => clearInterval(addIndustryPoint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rivePlayer = useRive({
    src: chickenTest,
    autoplay: true,
    stateMachines: "State Machine 1",
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.TopCenter,
    }),
  });

  const riveIndustry = useRive({
    src: chickenTest,
    autoplay: true,
    stateMachines: "State Machine 1",
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.TopCenter,
    }),
  });

  const explodePlayer = useStateMachineInput(
    rivePlayer.rive,
    "State Machine 1",
    "explode"
  );

  const explodeIndustry = useStateMachineInput(
    riveIndustry.rive,
    "State Machine 1",
    "explode"
  );

  const animOut = () => {
    gsap.to(industryRef.current, {
      filter: `blur(${blurAmount}px)`,
      x: -500,
      opacity: 0,
      duration: 0.5,
    });
  };

  let blurAmount = 5;

  return (
    <div className="App">
      <div style={{ userSelect: "none" }}>
        <div>
          <h1>Animal Killer</h1>
          <p>Can you kill animals at the same rate as the meat industry?</p>
        </div>
        <div className="GameContainer">
          <div className="IndustryContainer" style={{ overflow: "overflow" }}>
            <h2>Industry</h2>
            <div
              onClick={() => {
                explodeIndustry?.fire();
                animOut();
              }}
              ref={industryRef}
              style={{
                filter: `blur(0px)`,
                transform: "scale(5, 0.001)",
              }}
            >
              <div
                style={{
                  height: "300px",
                  width: "300px",
                  transform: "scale(calc(1/5), 1000)",
                }}
              >
                <riveIndustry.RiveComponent />
              </div>
            </div>
            <h3>{`x ${industryCount}`}</h3>
          </div>
          <div className="PlayerContainer">
            <h2>You</h2>
            <div
              style={{ height: "300px", width: "300px", cursor: "pointer" }}
              onClick={handleIncreasePlayerCount}
            >
              <rivePlayer.RiveComponent />
            </div>
            <h3>{`x ${playerCount}`}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
