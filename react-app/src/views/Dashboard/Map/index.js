import { useRef, useEffect } from 'react'
import { db } from '../../../context'

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
      style: 'mapbox://styles/mapbox/dark-v10',
      // center: [lng, lat],
      zoom: 2,
      center: [0, 20],
    })

    db.collection('user')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          var marker1 = new mapboxgl.Marker({
            color: 'var(--color-primary-700)',
          })
            .setLngLat([data.longitude, data.latitude])
            .addTo(map.current)
          // doc.data()
        })
      })
    ;[
      [77.0365, 38.8977],
      [139.6503, 35.6762],
      [55.2744, 25.1972],
      [43.1729, 22.9068],
      [37.6173, 55.7558],
      [75.6972, 45.4215],
    ].forEach((coord) => {
      new mapboxgl.Marker({
        color: 'var(--color-primary-700)',
      })
        .setLngLat(coord)
        .addTo(map.current)
    })
  })

  //   var map = new mapboxgl.Map({
  //     container: mapRef.current,
  //     style: 'mapbox://styles/mapbox/streets-v11',
  //   })

  return <div ref={mapContainer} style={{ height: '100%' }}></div>
}

export default Map
