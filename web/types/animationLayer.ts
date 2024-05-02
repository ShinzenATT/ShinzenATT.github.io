import type AnimatorService from "~/services/animations/animatorService";

export interface AnimationLayer {
    animate: (st: AnimatorService, delta: DOMHighResTimeStamp) => void
    setEffect: (st: AnimatorService, event: "leftWind" | "rightWind" | "themeChange") => void
}