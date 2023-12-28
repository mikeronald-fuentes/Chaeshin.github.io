const words = ['Software Engineer', 'Backend Developer', 'FullStack Developer']

let mainTimeline = gsap.timeline({
    repeat: -1
})

words.forEach(word => {
    let textTimeline = gsap.timeline({
        repeat: 1,
        yoyo: true,
        repeatDelay: 4
    })

    textTimeline.to('#typewriter',{
        text: word,
        duration: 1,
        onUpdate: () => {
            cursorTimeline.restart()
            cursorTimeline.pause()
        },
        onComplete: () => {
            cursorTimeline.play()
        }
    })

    mainTimeline.add(textTimeline)
})

let cursorTimeline = gsap.timeline({
    repeat: -1, 
    repeatDelay: .8
})

cursorTimeline.to('#cursor', {
    opacity: 1,
    duration: 0
}).to('#cursor', {
    opacity: 0,
    duration: 0, 
    delay: 0.5
})
