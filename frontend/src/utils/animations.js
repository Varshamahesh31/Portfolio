export const fadeUp = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6,ease:[0.4,0,0.2,1]}} };
export const fadeIn = { hidden:{opacity:0}, visible:{opacity:1,transition:{duration:0.5}} };
export const scaleReveal = { hidden:{opacity:0,scale:0.95}, visible:{opacity:1,scale:1,transition:{duration:0.5,ease:[0.4,0,0.2,1]}} };
export const stagger = { visible:{transition:{staggerChildren:0.12}} };
export const hoverLift = { y:-4, transition:{duration:0.2} };
