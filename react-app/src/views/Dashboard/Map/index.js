import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
const Map = () => {
  // pk.eyJ1IjoidmFpYmhhdmNob3ByYTIwMDEiLCJhIjoiY2tvZGpzcXpzMDJsNjJ3cGxzcnoybmw0bSJ9.kr-wnzpPS3RasbmNM80mbQ
  const mapContainer = useRef(null)
  const map = useRef(null)
  mapboxgl.accessToken =
    'pk.eyJ1IjoidmFpYmhhdmNob3ByYTIwMDEiLCJhIjoiY2tvZGpzcXpzMDJsNjJ3cGxzcnoybmw0bSJ9.kr-wnzpPS3RasbmNM80mbQ'

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      //   style: 'mapbox://styles/mapbox/dark-v10',
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      // center: [lng, lat],
      // zoom: zoom
    })
  })

  //   var map = new mapboxgl.Map({
  //     container: mapRef.current,
  //     style: 'mapbox://styles/mapbox/streets-v11',
  //   })

  return <div ref={mapContainer} style={{ height: '100%' }}></div>
}

export default Map
