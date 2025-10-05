import "./style.css"

import Lenis from "lenis";

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

class Animation {
  constructor() {
    this.dom = document.querySelector(".section")
    this.frontImages = this.dom.querySelectorAll(".section__media__front")
    this.smallImages = this.dom.querySelectorAll(".section__images img")
  }

  init() {
    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.dom,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const easedProgress = gsap.parseEase("power1.inOut")(self.progress)
          this.dom.style.setProperty("--scale", easedProgress)
        }
      }
    })

    this.animate()
  }

  animate() {
    gsap.set(this.smallImages, {
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      force3D: true
    })

    this.timeline.to(this.smallImages, {
      z: "100vh",
      duration: 1,
      ease: "power1.inOut",
      stagger: {
        amount: 0.2,
        from: "center"
      }
    })

    this.timeline.to(this.frontImages, {
      scale: 1,
      duration: 1,
      ease: "power1.inOut",
      delay: .1,
    }, 0.6)

    this.timeline.to(this.frontImages, {
      duration: 1,
      filter: "blur(0px)",
      ease: "power1.inOut",
      delay: .4,
      stagger: {
        amount: 0.2,
        from: "end"
      }
    }, 0.4)
  }
}


const lenis = new Lenis({
  duration: 1.2,
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  wheelMultiplier: 2,
  touchMultiplier: 2,
})

window.lenis = lenis

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)


const animation = new Animation()
animation.init()
