import React, {Component} from 'react';
import MapError from './MapError';
import {Map, GoogleApiWrapper} from 'google-maps-react';
import '../App.css';
import { InfoWindow } from 'google-maps-react/dist/components/InfoWindow';

// google map key
const key = 'Your_API_Key';

//foursquare credentials
const fsClientID = "Your_Foursquare_Client_ID";
const fsClientSecret = "Your_Foursquare_Client_Secret";
const fsVersion = "20180323";

class RestaurantMap extends Component {
    state = {
        map: null,
        markers: [],
        props: [],
        activeMarker: null,
        activeProps: null,
        showInfo: false
    }

    componentWillReceiveProps = (props) => {
        // if query shortened the list, rendered only filtered set of places
        if (this.state.markers.length !== props.places.length) {
            this.removeInfo();
            this.updateMarkers(props.places);
            this.setState({activeMarker: null});
            return;
        }

        // close InfoWindow if different place clicked on search list
        if (!props.selected || (this.state.activeMarker && (this.state.markers[props.selected]!==this.state.activeMarker)))
            this.removeInfo();

        // do nothing if no place selected
        if (props.selected === null || typeof(props.selected) === undefined)
            return;
       
        // replicate click on a marker on selection
        this.onClickMarker(this.state.markers[props.selected], this.state.props[props.selected]);
    }

    // refresh relevant markers
    updateMap = (props, map) => {
        this.setState({map});
        this.updateMarkers(this.props.places);
    }

    // close InfoWindow
    removeInfo = () => {
        this.state.activeMarker && this.state.activeMarker.setAnimation(null);
        this.setState({showInfo: false, activeMarker: null, activeProps: null});
    }

    // using json from foursquare to filter out relevant restaurant data
    getFourSquareInfo = (props, data) => {
        return data.response.venues.filter(
            location => location.name.includes(props.name) || props.name.includes(location.name)
        );
    }

    onClickMarker = (marker, props, event) => {

        this.removeInfo();

        // request for foursquare data about a location
        let fsDataRequest = new Request(`https://api.foursquare.com/v2/venues/search?client_id=${fsClientID}&client_secret=${fsClientSecret}&v=${fsVersion}&radius=100&ll=${props.coordinates.lat},${props.coordinates.lng}`,{
            method: 'GET',
            headers: new Headers()
        });

        let props_activeMarker;
        fetch(fsDataRequest)
            .then(response => response.json())
            .then(data => {
                let restaurant = this.getFourSquareInfo(props, data);
                props_activeMarker = {
                    ...props,
                    fourSquareData: restaurant[0]
                }

                // getting only the first restaurant data
                if (props_activeMarker.fourSquareData) {
                    fetch(`https://api.foursquare.com/v2/venues/${restaurant[0].id}/photos?client_id=${fsClientID}&client_secret=${fsClientSecret}&v=${fsVersion}`)
                        .then(response => response.json())
                        .then(data => {  // getting photos
                            props_activeMarker = {
                                ...props_activeMarker,
                                images: data.response.photos
                            };
                            // stop animation on previous activeMarker
                            if (this.state.activeMarker)
                                this.state.activeMarker.setAnimation(null);

                            marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
                            this.setState({showInfo: true, activeMarker: marker, activeProps: props_activeMarker});
                        }
                    );
                }
                else { // only animations if data not found from foursquare
                    marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
                    this.setState({showInfo: true, activeMarker: marker, activeProps: props_activeMarker});
                }
            }
        );
    }

    // fill the markers and props states each time the map renders
    updateMarkers = (places) => {
        if (!places)
            return;

        this.state.markers.forEach(marker => marker.setMap(null));

        let markerProps = [];
        let markers = places.map( (place, index) => {
            let props = {
                key: index,
                name: place.name,
                street: place.street,
                coordinates: place.co,
                site: place.site
            }
            markerProps.push(props);

            let marker = new this.props.google.maps.Marker({
                position: place.co,
                map: this.state.map,
                animation: this.props.google.maps.Animation.DROP
            });

            marker.addListener('click', () => {
                this.onClickMarker(marker, props, null);
            });

            return marker;
        });

        this.setState({markers: markers, props: markerProps});
    }

    render = () => {
        const center = {
            lat: this.props.lat,
            lng: this.props.lng
        }

        // render the info about the concerned restaurant through activeProps
        let active_props = this.state.activeProps;

        return (
            <Map
                role="application"
                aria-label="map"
                onReady={this.updateMap}
                zoom={this.props.zoom}
                google={this.props.google}
                initialCenter={center}
                onClick={this.removeInfo}
                >
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showInfo}
                    onClose={this.removeInfo}>
                    <div className="info">
                        <h3>{active_props && active_props.name}</h3>
                        {active_props && active_props.street ? 
                            ( <p>{active_props.street}</p> ) : ""
                        }
                        {active_props && active_props.site ? 
                            ( <a href={active_props.site} target="_blank" rel="noopener noreferrer">Visit website</a> ) : ""
                        }
                        {active_props && (active_props.images && active_props.images.items[0]) ? 
                            (
                                <div>
                                    <img src={active_props.images.items[0].prefix + "100x100" + active_props.images.items[0].suffix}
                                         alt={"Image from " + active_props.name} />
                                    <p>Image of {active_props.name} by Foursquare</p>
                                </div>
                            ) : <p className="noImage">No image available</p>
                        }
                    </div>
                </InfoWindow>
            </Map>
        );
    };
}

export default GoogleApiWrapper({apiKey: key, LoadingContainer: MapError})(RestaurantMap);