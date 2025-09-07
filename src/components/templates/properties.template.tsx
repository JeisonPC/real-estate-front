import React from 'react'
import Card from '../molecules/card/Card.molecules'

function PropertiesTemplate() {
  return (
    <div>
      <Card id="1" title="Casa de playa" description="Una hermosa casa de playa." price={300000} image="/images/house1.jpg" />
    </div>
  )
}

export default PropertiesTemplate