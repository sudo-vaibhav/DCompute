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
      // color2: "hsl(281, 81%, 56%)",
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
              <h1 className="text-5xl">
                Your Friendly Neighbourhood Super Computer
              </h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Hero
