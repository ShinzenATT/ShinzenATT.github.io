import type {AnimationLayer} from "~/types/animationLayer";
import type AnimatorService from "~/services/animations/animatorService";
import {th} from "vuetify/locale";

export default class WaveAnimation implements AnimationLayer{
    private angleMod = 0
    private height: number
    private readonly amplitude = 50
    private readonly speed: number = Math.PI
    private readonly delay: number
    private riseSpeed: number
    private color: string

    constructor(height: number, color: string, delayMs: number = 0)  {
        this.color = color + "77"
        this.height = height + this.amplitude
        this.riseSpeed = Math.floor(height * 0.4)
        this.delay = delayMs
    }

    animate(st: AnimatorService, delta: number): void {
        if(st.elapsedTime < this.delay) return
        const deltaSec = delta / 1000
        this.transitionHeight(st.height, deltaSec)
        if(this.height < this.amplitude * -1) return
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

    transitionHeight(height: number, deltaSec: number){
        const targetHeight = height * 0.6 - window.scrollY
        if(targetHeight === this.height) return
        const heightDiff = targetHeight - this.height
        /*let progress: number
        if(heightDiff >= 0){
            progress = heightDiff / targetHeight
        } else {
            progress = Math.abs(heightDiff) / (height - targetHeight)
        }
        const easingMod = -(Math.cos(Math.PI * progress - 1) / 2)
        console.log("progress: " + progress + " easing: " + easingMod)*/
        if(Math.abs(heightDiff) < (this.riseSpeed * deltaSec)){
            this.height = targetHeight
        } else if(heightDiff >= 0){
            this.height += this.riseSpeed * deltaSec
        } else {
            this.height -= this.riseSpeed * deltaSec
        }
    }

    static calculateFrequency(width: number): number{
        const maxWidth = 1920
        const minWidth = 320
        const maxFreq = Math.PI / 700
        const minFreq = Math.PI / 1500

        const normalizedWidth = (width - minWidth) / (maxWidth - minWidth)

        return maxFreq - normalizedWidth * (maxFreq - minFreq)
    }

}