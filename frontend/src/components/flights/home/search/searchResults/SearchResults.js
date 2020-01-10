import React from 'react' 
import ResultsCard from './resultsCard/ResultsCard'

let price = null // external variable to avoid delay in state update
let layovers = null // external variable to avoid delay in state update

export default class SearchResults extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      filteredResults: [],
      filterData: {
        layovers: [],
        price: []
      },
      filters: {
        layovers: [],
        price: []
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    if (e.target.id === 'price') {
      price = e.target.value
    } else if (e.target.id === 'layovers') {
      layovers = e.target.value
    }
    // console.log('filtering', e.target.id, e.target.value, this.props.flightResults.data.length, price, layovers)
    const filteredResults = this.props.flightResults.data.filter(flight => (flight.price <= price && flight.route.length <= layovers))
    this.setState({ filteredResults })
  }

  getMaxValue(arg) {
    return arg && Math.max(...arg)
  }
  getMinValue(arg) {
    return arg && Math.min(...arg)
  }

  componentDidMount() {
    this.setState({ filteredResults: this.props.flightResults.data }, this.getFilterData())
  }
  getFilterData() {
    const filterData = {}
    filterData.layovers = [...new Set(this.props.flightResults.data.map(flight => (flight.route.length)))]
    filterData.prices = [...new Set(this.props.flightResults.data.map(flight => (flight.price)))]
    filterData.originAirports = [...new Set(this.props.flightResults.data.map(flight => (flight.flyFrom)))]
    filterData.destinationAirports = [...new Set(this.props.flightResults.data.map(flight => (flight.flyTo)))]
    filterData.durations = [...new Set(this.props.flightResults.data.map(flight => (flight.fly_duration)))]
    filterData.airlines = [...new Set(this.props.flightResults.data.map(flight => (flight.airlines)))]
    price = this.getMaxValue(filterData.prices) // external variable to avoid delay in state update
    layovers = this.getMaxValue(filterData.layovers) // external variable to avoid delay in state update
    this.setState({ filterData })
  }

  render() {
    if (!this.state.filterData && !price && !layovers) return null
    const { flightResults } = this.props
    const { filterData, filteredResults } = this.state
    // console.log(this.state)
    return (
      <section className="flex-row space-between full-parent-wide">
        <div className="quarter-parent-wide with-border-right">
          <div className="flex-column centered margin-height-10v">
            {filterData.layovers && 
          <div className="slidecontainer three-quarters-parent-wide">
            <p className="small-text without-margin">Max Layovers: 
              {layovers && layovers - 1}
            </p>
            <input 
              type="range" 
              min={this.getMinValue(filterData.layovers)}
              max={this.getMaxValue(filterData.layovers)}
              defaultValue={this.getMaxValue(filterData.layovers)}
              step="1"
              className="slider full-parent-wide" 
              id="layovers"
              onChange={this.handleChange}/>
          </div>}
            {filterData.prices &&
              <div className="slidecontainer three-quarters-parent-wide">
                <p className="small-text without-margin">Max Price: 
                  {price && price}
                </p>
                <input
                  type="range"
                  min={this.getMinValue(filterData.prices)}
                  max={this.getMaxValue(filterData.prices)}
                  defaultValue={this.getMaxValue(filterData.prices)}
                  step="1"
                  className="slider full-parent-wide"
                  id="price"
                  onChange={this.handleChange}/>
              </div>}
          </div>
        </div>
        {filteredResults && 
        <div className="margin-width-1v half-parent-wide">
          <h2>{filteredResults.length} {filteredResults.length === 1 ? 'flight' : 'flights'} found:</h2>
          {filteredResults.map(flight => (
            <ResultsCard key={flight.id}
              {...flight}
              currency={flightResults.currency} />))
          }
        </div>}
        <div className="quarter-parent-wide">
        </div>
      </section>
    )
  }
}