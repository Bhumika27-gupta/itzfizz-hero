import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const words = ['WELCOME', 'ITZFIZZ']

const stats = [
  { value: '90%', label: 'Client Satisfaction' },
  { value: '85%', label: 'Faster Delivery' },
  { value: '70%', label: 'Business Growth' },
]

export default function Hero() {
  const heroRef = useRef(null)
  const orbRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Page load animation
      gsap
        .timeline()
        .from('.letter', {
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.05,
          ease: 'power3.out',
        })
        .from(
          '.stat',
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.25,
            ease: 'power2.out',
          },
          '-=0.2'
        )

      // Scroll animation
      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=1500',
          pin: true,
          scrub: 1,
        },
      }).fromTo(
        orbRef.current,
        {
          x: '-22vw',
          rotation: 0,
          scale: 0.8,
        },
        {
          x: '22vw',
          rotation: 360,
          scale: 1.3,
          ease: 'none',
        }
      )

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative flex h-screen flex-col items-center justify-between overflow-hidden px-4 py-12 sm:py-16"
    >

      {/* Headline */}
      <h1 className="flex flex-wrap justify-center gap-x-6 text-2xl font-bold sm:gap-x-10 sm:text-5xl lg:text-7xl">
        {words.map((word) => (
          <span key={word} className="flex">
            {word.split('').map((letter, index) => (
              <span
                key={index}
                className="letter inline-block px-[0.15em] sm:px-[0.2em]"
              >
                {letter}
              </span>
            ))}
          </span>
        ))}
      </h1>

      {/* Main visual */}
      <div
        ref={orbRef}
        className="absolute left-1/2 top-1/2 -ml-[4.5rem] -mt-[4.5rem] h-36 w-36 rounded-full bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 shadow-[0_0_80px_rgba(56,189,248,0.5)] will-change-transform sm:-ml-28 sm:-mt-28 sm:h-56 sm:w-56 lg:-ml-36 lg:-mt-36 lg:h-72 lg:w-72"
      >
        <div className="absolute inset-3 rounded-full border-2 border-dashed border-white/40" />
        <div className="absolute left-1/2 top-2 h-4 w-4 -translate-x-1/2 rounded-full bg-white" />
      </div>

      {/* Statistics */}
      <div className="grid w-full max-w-4xl grid-cols-3 gap-2 text-center sm:gap-6">
        {stats.map((item) => (
          <div
            key={item.label}
            className="stat rounded-xl border border-white/10 bg-white/5 px-2 py-4 sm:px-6 sm:py-6"
          >
            <p className="text-2xl font-bold text-cyan-400 sm:text-4xl lg:text-5xl">
              {item.value}
            </p>

            <p className="mt-1 text-xs text-gray-300 sm:text-base">
              {item.label}
            </p>
          </div>
        ))}
      </div>

    </section>
  )
}