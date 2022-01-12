const containers = document.querySelectorAll('.input-container')
const form = document.querySelector('form')

const tl = gsap.timeline({defaults: { duration: 1 }})

// line
const start = "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512"

const end = "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512"

// Elastic effect
containers.forEach((container) => {
  const input = container.querySelector('.input')
  const line = container.querySelector('.elastic-line')
  const placeholder = container.querySelector('.placeholder')

  input.addEventListener('focus', () => {
    // Check for input text
    if (!input.value) {
      tl.fromTo(line, { attr: { d: start } }, { attr: { d: end }, ease: 'Power2.out', duration: .3 })
      tl.to(line, { attr: { d: start }, ease: "elastic.out(3, 0.5)" }, '<40%')
      // Placeholder shift
      tl.to(placeholder, { top: -18, left: 0, scale: .9, duration: .5, ease: "Power2.out" }, '<')
    }
  })
})

// Revert back if input not focused
form.addEventListener('click', () => {
  containers.forEach((container) => {
    const input = container.querySelector('.input')
    const line = container.querySelector('.elastic-line')
    const placeholder = container.querySelector('.placeholder')
    if(document.activeElement !== input) {
      if (!input.value) {
        gsap.to(placeholder, { top: 0, left: 0, scale: 1, duration: .5, ease: "Power2.out" })
      }
    }
    // Validations
    input.addEventListener('input', (e) => {
      // Validate Name
      if(e.target.type === 'text') {
        let inputText = e.target.value
        if (inputText.length > 2) {
          colorize('#6391e8', line, placeholder)
        } else {
          colorize('#fe8c99', line, placeholder)
        }
      }
      // Validate Email
      if (e.target.type === 'email') {
        let inputEmail = e.target.value
        if (validateEmail(inputEmail)) {
          colorize('#6391e8', line, placeholder)
        } else {
          colorize('#fe8c99', line, placeholder)
        }
      }
      // Validate Phone
      if (e.target.type === 'tel') {
        let inputTel = e.target.value
        if (validatePhone(inputTel)) {
          colorize('#6391e8', line, placeholder)
        } else {
          colorize('#fe8c99', line, placeholder)
        }
      }
    })
  })
})

// checking email validation

const validateEmail = (email) => {
  let re = /\S+@\S+\.\S+/
  return re.test(email)
}

const validatePhone = (phone) => {
  let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  return re.test(phone)
}

// Colorize
const colorize = (color, line ,placeholder) => {
  gsap.to(line, { stroke: color, duration: .75 })
  gsap.to(placeholder, { color: color, duration: .75 })
}

// Checkbox animation fill
const checkbox = document.querySelector('.checkbox')
const tl2 = gsap.timeline({ defaults: { duration: .5, ease: "Power2.out" } })

const tickMarkPath = document.querySelector('.tick-mark path')
const pathLength = tickMarkPath.getTotalLength()

gsap.set(tickMarkPath, { strokeDashoffset: pathLength, strokeDasharray: pathLength })

checkbox.addEventListener('click', () => {
  if (checkbox.checked) {
    tl2.to('.checkbox-fill', {
      top: '0%'
    })
    tl2.fromTo(tickMarkPath, { strokeDashoffset: pathLength }, { strokeDashoffset: 0 }, '<50%')
    tl2.to('.checkbox-label', { color: '#6391e8' }, '<')
  } else {
    tl2.fromTo(tickMarkPath, { strokeDashoffset: 0 }, { strokeDashoffset: pathLength })
    tl2.to('.checkbox-fill', { top: '100%' }, '<50%')
    tl2.to('.checkbox-label', { color: '#777474' }, '<')
  }
})

// Character animation
gsap.set('#eye', { transformOrigin: "center" })
gsap.fromTo('#eye', { scaleY: 1 }, { scaleY: .3, repeat: -1, yoyo: true, repeatDelay: .5, ease: 'Power2.out' })
gsap.fromTo('#eyebrow', { y: 0 },  { y: -1, repeat: -1, yoyo: true, repeatDelay: .5, ease: 'Power2.out'  })

// Submit button
const button = document.querySelector('button')
const tl3 = gsap.timeline({ defaults: { duration: .75, ease: 'power2.out' } })

gsap.set('#hand', { transformOrigin: 'left' })

button.addEventListener('click', (event) => {
  event.preventDefault()
  tl3.to('.contact-right, .contact-left', { y: 30, opacity: 0, pointerEvents: 'none' })
  tl3.to('form', { scale: .8 }, '<')
  tl3.fromTo('.submitted', { opacity: 0, y: -30 }, { opacity: '100%', y: 0 }, '<80%')
  //Hand wave
  gsap.fromTo('#hand', { rotation: 0, y: 0 }, { rotation: -10, y: 2, ease: 'elastic(3, .3)', duration: 2, delay: 1 })
})
