import React, { Component } from 'react';
import locations from './data/locations.json';
import RestaurantMap from './components/RestaurantMap';
import SearchList from './components/SearchList';
import './App.css';
import menu from './data/menu.jpg';

class App extends Component {

  // intial map attributes
  state = {
    lat: 30.021,
    lng: -90.064683,
    zoom: 15,
    places: locations,
    showList: false,
    filteredList: null,
    selected: null
  }

  // no filter to apply at the beginning with empty query
  componentDidMount = () => {
    this.setState({
      ...this.state,
      filteredList: this.filterList(this.state.places, "")
    });
  }

  // invoke filter function with change in query
  updateQuery = (text) => {
    this.setState({ 
      ...this.state,
      filteredList: this.filterList(this.state.places, text),
      selected: null
    });
  }

  // filter function
  filterList = (places, text) => {
    return places.filter(place => place.name.toLowerCase().includes(text.toLowerCase()));
  }

  // toggle list of restaurants
  toggleList = () => {
    this.setState({ showList: !this.state.showList });
  }

  // save selected item and close search drawer
  clickPlace = (index) => {
    this.setState({
      selected: index,
      showList: !this.state.showList
    });
  }

  render () {
    return (
      <div>
        <div className="App">
          <div>
            <button className="listButton" onClick={this.toggleList}>
              <img src={menu} alt='menu icon' />
            </button>
          </div>
          <h1>Restaurants around University of New Orleans</h1>
        </div>
        <RestaurantMap
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          places={this.state.filteredList}
          onClickPlace={this.clickPlace}
          selected={this.state.selected}
        />
        <SearchList
          places={this.state.filteredList}
          toggle={this.toggleList}
          showList={this.state.showList}
          filterList={this.updateQuery}
          onClickPlace={this.clickPlace}
        />
      </div>
    );
  }
}

export default App;
