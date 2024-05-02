import type {Ref} from "vue";
import type {ThemeInstance} from "vuetify";
import type {AnimationLayer} from "~/types/animationLayer";
import BackgroundAnimation from "~/services/animations/backgroundAnimation";

export default class AnimatorService {
    public readonly ctx: CanvasRenderingContext2D
    private readonly _width: Ref<number>
    private readonly _height: Ref<number>
    private readonly themes: ThemeInstance
    private isActive = true
    private callbackId: number | undefined
    private animations: AnimationLayer[] = []

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

    constructor(ctx: CanvasRenderingContext2D, width: Ref<number>, height: Ref<number>, themes: ThemeInstance) {
        this.ctx = ctx
        this._width = width
        this._height = height
        this.themes = themes
        this.animations = [
            new BackgroundAnimation()
        ]
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


    private drawFrame(delta: DOMHighResTimeStamp){
        console.log("new frame")
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