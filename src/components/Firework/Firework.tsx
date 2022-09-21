import React, { useCallback, useContext, useEffect, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { AppContext } from "../../app/App";
import { AppContextInterface } from "../../app/types";

type TMakeShotOptions = {
  spread?: number;
  decay?: number;
  scalar?: number;
  startVelocity?: number;
  particleCount?: number;
};
const Firework = () => {
  const refAnimationInstance = useRef<any>(null);
  const { gameOver } = useContext(AppContext) as AppContextInterface;
  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback(
    (particleRatio: number, opts: TMakeShotOptions) => {
      refAnimationInstance.current &&
        refAnimationInstance.current({
          ...opts,
          origin: { y: 0.7 },
          particleCount: Math.floor(200 * particleRatio),
        });
    },
    []
  );
  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    makeShot(0.2, {
      spread: 60,
    });
    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  useEffect(() => {
    if (gameOver.guessedWord === true) fire();
  }, [fire, gameOver.guessedWord]);

  return <ReactCanvasConfetti refConfetti={getInstance} className="confetti" />;
};

export default Firework;
