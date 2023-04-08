import { useEffect, useRef } from 'react'
declare const anychart: any;

const ChoroplethMap = ({ dataSet }) => {
  const containerRef = useRef(null)

  let map = null;

  useEffect(() => {
    if (containerRef.current) {
      anychart.onDocumentReady(function () {
        map = anychart.map()
        map.geoData(anychart.maps.united_states_of_america)

        const series = map.choropleth(dataSet)
        series.stroke('#000 .3')
        series.labels().fontColor('black')
        series.tooltip().format('Orders: {%Value}')

        // define the color of the hovered district
        series.selected().fill('#5588ff')

        // making of the ordinal colorRange
        const ocs = anychart.scales.ordinalColor([
          { less: 10 },
          { from: 10, to: 50 },
          { from: 50, to: 100 },
          { from: 100, to: 250 },
          { greater: 250 }
        ])
        ocs.colors(['rgb(253,225,86)', 'rgb(249, 193, 62)', 'rgb(244, 162, 38)', 'rgb(232, 122, 28)', 'rgb(221,76,55)'])

        // tell the series what to use as a colorRange (colorScale)
        series.colorScale(ocs)

        map.legend().enabled(true)
        map.legend().itemsSourceMode('categories')

        // Configure your map chart here

        map.title('Orders by State')
        map.container(containerRef.current)
        map.draw()
      })
    }

    return () => {
      if (map) {
        map.dispose()
      }
    }
  }, [containerRef, dataSet])

  return (
    <div>
      <div ref={containerRef} style={{ width: '800px', height: '600px' }} />
    </div>
  )
}

export default ChoroplethMap
