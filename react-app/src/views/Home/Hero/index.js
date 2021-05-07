import React from 'react'
import GLOBE from 'vanta/dist/vanta.globe.min'
class Hero extends React.Component {
  constructor() {
    super()
    this.vantaRef = React.createRef()
  }
  componentDidMount() {
    this.vantaEffect = GLOBE({
      el: this.vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: true,
      minHeight: window.innerHeight,
      minWidth: window.innerWidth,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 'hsl(303, 90%, 50%)',
      backgroundColor: 'hsl(240, 42%, 20%)',
    })
  }
  componentWillUnmount() {
    if (this.vantaEffect) this.vantaEffect.destroy()
  }
  render() {
    return (
      <div ref={this.vantaRef} className="">
        <div className="grid h-screen lg:grid-cols-2 container mx-auto">
          <div className=" flex justify-center items-center">
            <div>
              <h1 className="text-6xl">
                Your Friendly Neighbourhood
                <br />
                <span className="text-primary-700">Super</span> Computer
              </h1>
              <h2 className="mt-6 text-xl">
                Matching Innovation with{' '}
                <span className="font-semibold text-primary-700">
                  Untapped Idle Compute
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Hero
