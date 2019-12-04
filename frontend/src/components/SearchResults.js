import React from 'react' 
import ResultsCard from './ResultsCard'

export default class SearchResults extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      filteredResults: [],
      filters: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  // handleChange(e) {
  //   const filterData = e.target.name ? { ...this.state.filterData, [e.target.name]: e.target.value } : { ...this.state.filterData, [e.target.id]: e.target.value }
  //   console.log('title', e.target.id, e.target.value)
  //   // console.log(this.state.searchData)
  //   this.setState({ filterData }, this.changeFilterableValue())
  // }
  changeFilterableValue() {
    let filteredResults = this.props.flightResults
    filteredResults = this.props.flightResults.data.filter(flight => (flight.price <= this.state.filterData.price && flight.route.length <= this.state.filterData.layovers) ) 
    this.setState({ filteredResults })
  }
  getMaxValue(arg) {
    return arg && Math.max(...arg)
  }
  getMinValue(arg) {
    return arg && Math.min(...arg)
  }
  handleChange(e) {
    console.log(e.target.id, e.target.value)
    let filteredResults = []
    if (e.target.id === 'price') {
      filteredResults = this.props.flightResults.data.filter(flight => flight.price <= parseInt(e.target.value)) 
    } else if (e.target.id === 'layovers') {
      console.log('results', this.props.flightResults.data.filter(flight => flight.route.length <= parseInt(3)))
      filteredResults = this.props.flightResults.data.filter(flight => flight.route.length <= parseInt(e.target.value))
    }
    this.setState({ filteredResults })
  }
  componentDidMount() {
    this.setState({ filteredResults: this.props.flightResults.data }, this.getFilters())
  }
  getFilters() {
    const filters = {}
    filters.layovers = [...new Set(this.props.flightResults.data.map(flight => (flight.route.length)))]
    filters.prices = [...new Set(this.props.flightResults.data.map(flight => (flight.price)))]
    filters.originAirports = [...new Set(this.props.flightResults.data.map(flight => (flight.flyFrom)))]
    filters.destinationAirports = [...new Set(this.props.flightResults.data.map(flight => (flight.flyTo)))]
    filters.durations = [...new Set(this.props.flightResults.data.map(flight => (flight.fly_duration)))]
    filters.airlines = [...new Set(this.props.flightResults.data.map(flight => (flight.airlines)))]
    return this.setState({ filters })
  }

  render() {
    if (!this.state.filters) return null
    const { flightResults } = this.props
    const { filters, filteredResults } = this.state
    console.log(this.state.filters)
    return (
      <section className="flex-row">
        <div className="filters quarter-parent-wide">
          {filters.layovers && 
          <div className="slidecontainer">
            <p className="small-text without-margin">Max Layovers</p>
            <input 
              type="range" 
              min={this.getMinValue(filters.layovers)}
              max={this.getMaxValue(filters.layovers)}
              defaultValue={this.getMaxValue(filters.layovers)}
              step="1"
              className="slider" 
              id="layovers"
              onChange={this.handleChange}/>
          </div>}
          {filters.prices &&
            <div className="slidecontainer">
              <p className="small-text without-margin">Max Price</p>
              <input
                type="range"
                min={this.getMinValue(filters.prices)}
                max={this.getMaxValue(filters.prices)}
                defaultValue={this.getMaxValue(filters.prices)}
                step="1"
                className="slider"
                id="price"
                onChange={this.handleChange}/>
            </div>}
        </div>
        {filteredResults && 
        <div>
          <h1>{filteredResults.length} flights found:</h1>
          {filteredResults.map(flight => (
            <ResultsCard key={flight.id}
              {...flight}
              currency={flightResults.currency} />))
          }
        </div>}
      </section>
    )
  }
}