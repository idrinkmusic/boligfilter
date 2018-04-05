import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import "./Map.css";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props.data,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  render() {
    const { google, properties, isFetching } = this.props;

    {
      isFetching && !google && properties.length === 0 && <h2>Loading...</h2>;
    }

    {
      !isFetching && google && properties.length === 0 && <h2>Empty.</h2>;
    }

    {
      properties.length > 0 && (
        <div style={{ opacity: isFetching ? 0.5 : 1 }} />
      );
    }

    return (
      <div>
        <Map
          style={{
            minWidth: "200px",
            minHeight: "500px"
          }}
          google={google}
          zoom={12}
          initialCenter={{ lat: 55.6698922, lng: 12.5875282 }}
        >
          {properties.map(property => (
            <Marker
              key={property.propertyId}
              onClick={this.onMarkerClick}
              data={property}
              position={{ lat: property.latLon.lat, lng: property.latLon.lon }}
            />
          ))}

          {Object.keys(this.state.selectedPlace).length > 0 && (
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div className="media">
                <div className="media-left">
                  <img
                    className="media-object"
                    src="http://via.placeholder.com/100x100"
                    alt={this.state.selectedPlace.address1}
                  />
                </div>
                <div className="media-body">
                  <h4 className="media-heading">
                    {this.state.selectedPlace.address1}
                  </h4>

                  <p>
                    {this.state.selectedPlace.zipCode.zipCodeId}{" "}
                    {this.state.selectedPlace.zipCode.name}
                  </p>

                  <p>
                    {`${this.state.selectedPlace.totalNumberOfRooms} room(s), ${
                      this.state.selectedPlace.propertySizeAdvertized
                    } m²`}
                  </p>

                  <p>
                    <strong>{`Only ${
                      this.state.selectedPlace.price
                    } kr.`}</strong>
                  </p>
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCcF_dXMs1uwNLbVyD1bUHOGStS9FarC6A",
  v: "3"
})(MapContainer);
