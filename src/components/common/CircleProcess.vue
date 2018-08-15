<template>
<!-- <div class="wrapper base" ref="wrapper">
  <div class="circle base circle-left" ref="left"></div>
  <div class="circle base  circle-right" ref="right"></div>
	
</div> -->
<svg>
    <circle id="circle" class="svg-circle" cx="25" cy="25" r="22" fill="none" stroke-dasharray="0,10000"  stroke="#ffc000" stroke-width="4" stroke-linecap="round">
      
    </circle>
    <!-- <circle class="demo2" id="J_demo2" cx="55" cy="55" r="50" fill="none" stroke="red" stroke-width="5" stroke-dasharray="0,10000"/> -->
</svg>
</template>
<script>
    export default {
        name: 'CircleProcess',
        data(){
            return {

            }
        },
        props: {
            
        },
        methods: {
            
    
        }
    }
</script>
<style>
svg{
 margin-top: 2px;
 height: 50px;
 width: 50px;
 transform: rotate(-90deg);
}
.svg-circle{
  transform-origin: center;
  
  /* transition: all 1s ease; */
}
.wrapper {
  width: 50px; /* Set the size of the progress bar */
  height: 50px;
  position: absolute; /* Enable clipping */
  left: 4px;
  top: 3px;
  clip: rect(0px, 50px, 50px, 25px); /* Hide half of the progress bar */
}
/* Set the sizes of the elements that make up the progress bar */
.circle {
  width: 42px;
  height: 42px;
  border: 3px solid #ffc000;
  border-radius: 30px;
  position: absolute;
  clip: rect(0px, 25px, 50px, 0px);
	
}

/* Using the data attributes for the animation selectors. */
/* Base settings for all animated elements */

 
.wrapper {
  animation-duration: 0.01s; /* Complete keyframes asap */
  animation-delay: 1.5s; /* Wait half of the animation */
  animation-name: close-wrapper; /* Keyframes name */

}
 
.circle.circle-left {
  animation-duration: 3s; /* Full animation time */
  animation-name: left-spin;
 
}
 
.circle.circle-right {
  animation-duration: 1.5s; /* Half animation time */
  animation-name: right-spin;
  
}

.base {
  animation-iteration-count: 1;  /* Only run once */
  animation-fill-mode: forwards; /* Hold the last keyframe */
  animation-timing-function:linear; /* Linear animation */
  animation-play-state: paused;
}
@keyframes right-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}
/* Rotate the left side of the progress bar from 0 to 360 degrees */
@keyframes left-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
/* Set the wrapper clip to auto, effectively removing the clip */
@keyframes close-wrapper {
  to {
    clip: rect(auto, auto, auto, auto);
  }
}
</style>