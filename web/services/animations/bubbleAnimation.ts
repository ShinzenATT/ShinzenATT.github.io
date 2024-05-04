import type {AnimationLayer} from "~/types/animationLayer";
import type AnimatorService from "~/services/animations/animatorService";


export default class BubbleAnimation implements AnimationLayer {
    private x: number
    private y: number
    private readonly size: number
    private color: string
    private xSpeed: number
    private ySpeed: number

    constructor(width: number, height: number, color: string) {
        this.color = color
        this.size = Math.floor(width * 0.01 + Math.random() * (width * 0.01))
        this.x = Math.floor(Math.random() * width)
        this.y = height + this.size
        this.xSpeed = Math.floor(Math.random() * (width * 0.1)) - Math.floor(width * 0.05)
        this.ySpeed = Math.floor(Math.random() * (height * 0.1)) + 50
    }
    animate(st: AnimatorService, delta: number): void {
        const deltaSec = delta / 1000
        st.ctx.fillStyle = this.color
        this.x += this.xSpeed * deltaSec
        if (this.x > st.width + this.size){
            this.x = this.size * -1
        } else if(this.x < this.size * -1){
            this.x = st.width + this.size
        }
        this.y -= this.ySpeed * deltaSec
        if(this.y < this.size * -1){
            this.y = st.height + this.size
        }

        st.ctx.beginPath()
        st.ctx.ellipse(
            Math.floor(this.x),
            Math.floor(this.y),
            this.size,
            this.size,
            0,
            0,
            Math.PI * 2
        )
        st.ctx.fill()
    }

    setEffect(st: AnimatorService, event: "leftWind" | "rightWind" | "themeChange"): void {

    }

}