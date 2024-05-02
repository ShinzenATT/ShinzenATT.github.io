import type {AnimationLayer} from "~/types/animationLayer";
import type AnimatorService from "~/services/animations/animatorService";

export default class BackgroundAnimation implements AnimationLayer{
    animate(st: AnimatorService, delta: DOMHighResTimeStamp): void {
        st.ctx.fillStyle = st.primaryColor
        st.ctx.fillRect(0, 0, st.width, st.height)
    }

    setEffect(st: AnimatorService, event: "leftWind" | "rightWind" | "themeChange"): void {

    }


}