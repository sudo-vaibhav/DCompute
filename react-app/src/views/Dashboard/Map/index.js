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

    // Create a default Marker and add it to the map.

    db.collection('user')
      .get()
      .then((querySnapshot) => {
        console.log(
          querySnapshot.docs.forEach((doc) => {
            const data = doc.data()
            var marker1 = new mapboxgl.Marker({
              color: 'var(--color-primary-700)',
            })
              .setLngLat([data.longitude, data.latitude])
              .addTo(map.current)
            // doc.data()
          }),
        )
      })
  })

  //   var map = new mapboxgl.Map({
  //     container: mapRef.current,
  //     style: 'mapbox://styles/mapbox/streets-v11',
  //   })

  return <div ref={mapContainer} style={{ height: '100%' }}></div>
}

export default Map
