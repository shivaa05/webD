// const tl = gsap.timeline()
// tl.from(".wrapper", {
//   h: 0,
//   scale: 0,
//   duration: 1,
//   delay:0.5
// })
gsap.from(".image img", {
  rotateX: -90,
  duration: 1.4,
  opacity: 0,
  transformOrigin: "top",
});
gsap.from(".left", {
  rotateX:90,
  duration: 0.2,
  opacity: 0,
  transformOrigin: "top",
})

gsap.from(".signup *", {
  rotateX: 90,
  delay: 0.5,
  stagger: 0.1,
  opacity: 0.4,
  duration:0.2,
  origin:top,
  transformOrigin:"top"
})