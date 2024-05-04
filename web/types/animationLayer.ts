import type AnimatorService from "~/services/animations/animatorService";

export interface AnimationLayer {
    animate: (st: AnimatorService, delta: number) => void
    setEffect: (st: AnimatorService, event: "leftWind" | "rightWind" | "themeChange") => void
}