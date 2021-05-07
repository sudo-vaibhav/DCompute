import React from 'react'

const ColorGrid = () => {
  const palette = {
    primary: [700, 900],
    secondary: [700, 900],
    dark: [500, 700, 900],
    light: [100, 500],
  }

  return (
    <div>
      <button data-button="btn-primary-md">hi</button>
      {Object.keys(palette).map((key) => {
        return (
          <div>
            <p>{key}</p>
            <div className="grid gap-4 grid-cols-5 w-full">
              {palette[key].map((intensity) => {
                return (
                  <div
                    style={{ height: 100 }}
                    className={`bg-${key}-${intensity}`}
                  ></div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ColorGrid
