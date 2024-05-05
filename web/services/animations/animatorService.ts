import type {Ref} from "vue";
import type {ThemeInstance} from "vuetify";
import type {AnimationLayer} from "~/types/animationLayer";
import BackgroundAnimation from "~/services/animations/backgroundAnimation";
import BubbleAnimation from "~/services/animations/bubbleAnimation";
import WaveAnimation from "~/services/animations/waveAnimation";

export default class AnimatorService {
    public readonly ctx: CanvasRenderingContext2D
    private readonly _width: Ref<number>
    private readonly _height: Ref<number>
    private readonly themes: ThemeInstance
    private isActive = true
    private callbackId: number | undefined
    private elapsedTime: DOMHighResTimeStamp = performance.now()
    private readonly animations: AnimationLayer[] = []

    public get width() {
        return this._width.value
    }
    public get height(){
        return this._height.value
    }
    public get primaryColor(){
        return this.themes.current.value.colors.primary
    }
    public get secondaryColor(){
        return this.themes.current.value.colors.secondary
    }

    public get theme(){
        return this.themes.current
    }

    constructor(ctx: CanvasRenderingContext2D, width: Ref<number>, height: Ref<number>, themes: ThemeInstance) {
        this.ctx = ctx
        this._width = width
        this._height = height
        this.themes = themes
        this.animations = [
            new BackgroundAnimation()
        ]
        for (let i = 0; i < 60; i++) {
            this.animations.push(new BubbleAnimation(this.width, this.height, this.secondaryColor))
        }
        this.animations.push(new WaveAnimation(this.width, this.height, this.secondaryColor))
    }

    public startFrameCycle(){
        this.isActive = true
        this.callbackId = window.requestAnimationFrame(t => this.continueCycle(t))
    }

    public stop(){
        this.isActive = false
        if(this.callbackId != null) {
            window.cancelAnimationFrame(this.callbackId)
            this.callbackId = undefined
        }
    }


    private drawFrame(timestamp: DOMHighResTimeStamp){
        const delta = timestamp - this.elapsedTime
        this.elapsedTime = timestamp
        //console.log("new frame, delta: " + delta)
        for (const it of this.animations) {
            it.animate(this, delta)
        }
    }

    private continueCycle(delta: DOMHighResTimeStamp = 0){
        this.drawFrame(delta)
        if(this.isActive)
            this.callbackId = window.requestAnimationFrame(t => this.continueCycle(t))
    }
}