import type {AnimationLayer} from "~/types/animationLayer";
import type AnimatorService from "~/services/animations/animatorService";

export default class WaveAnimation implements AnimationLayer{
    private angleMod = 0
    private height: number
    private readonly amplitude = 50
    private readonly speed: number = Math.PI
    private color: string

    constructor(width: number, height: number, color: string) {
        this.color = color + "aa"
        this.height = Math.floor(height * 0.6)
    }

    animate(st: AnimatorService, delta: number): void {
        const deltaSec = delta / 1000
        this.angleMod += this.speed * deltaSec
        const frequency = WaveAnimation.calculateFrequency(st.width)
        let angle = this.angleMod
        st.ctx.beginPath()
        st.ctx.moveTo(0, Math.sin(angle) * this.amplitude + this.height)
        for (let i = 1; i < st.width; i++) {
            angle -= frequency
            st.ctx.lineTo(i, Math.sin(angle) * this.amplitude + this.height)
        }
        st.ctx.lineTo(st.width, st.height)
        st.ctx.lineTo(0, st.height)
        st.ctx.closePath()
        st.ctx.fillStyle = this.color
        st.ctx.fill()
    }

    setEffect(st: AnimatorService, event: "leftWind" | "rightWind" | "themeChange"): void {
    }

    static calculateFrequency(width: number): number{
        const maxWidth = 1920
        const minWidth = 320
        const maxFreq = Math.PI / 200
        const minFreq = Math.PI / 1000

        const normalizedWidth = (width - minWidth) / (maxWidth - minWidth)

        return maxFreq - normalizedWidth * (maxFreq - minFreq)
    }

}