import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import {
  selectPropertiesList,
  fetchPropertiesIfNeeded,
  invalidatePropertiesList
} from "../actions";
import Header from "../components/Header";

class App extends Component {
  componentDidMount() {
    const { dispatch, selectedPropertiesList } = this.props;
    dispatch(fetchPropertiesIfNeeded(selectedPropertiesList));
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.selectedPropertiesList !== prevProps.selectedPropertiesList
    ) {
      const { dispatch, selectedPropertiesList } = this.props;
      dispatch(fetchPropertiesIfNeeded(selectedPropertiesList));
    }
  }

  handleChange = nextPropertiesList => {
    this.props.dispatch(selectPropertiesList(nextPropertiesList));
    this.props.dispatch(fetchPropertiesIfNeeded(nextPropertiesList));
  };

  handleRefreshClick = e => {
    e.preventDefault();

    const { dispatch, selectedPropertiesList } = this.props;
    dispatch(invalidatePropertiesList(selectedPropertiesList));
    dispatch(fetchPropertiesIfNeeded(selectedPropertiesList));
  };

  render() {
    const {
      selectedPropertiesList,
      properties,
      isFetching,
      lastUpdated
    } = this.props;
    return (
      <div>
        <Header onClick={e => this.handleChange(e)} />

        <Grid>
          <Row>
            <Col xs={12} sm={4}>
              Sidebar
            </Col>

            <Col xs={12} sm={8}>
              Map
              <p>
                {lastUpdated && (
                  <span>
                    Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{" "}
                  </span>
                )}
                {!isFetching && (
                  <a href="#" onClick={this.handleRefreshClick}>
                    Refresh
                  </a>
                )}
              </p>
              {isFetching && properties.length === 0 && <h2>Loading...</h2>}
              {!isFetching && properties.length === 0 && <h2>Empty.</h2>}
              {properties.length > 0 && (
                <div>
                  <div style={{ opacity: isFetching ? 0.5 : 1 }} />

                  <h2>{selectedPropertiesList}</h2>
                  <ul>
                    {properties.map((property, i) => (
                      <li key={i}>{property.propertyId}</li>
                    ))}
                  </ul>
                </div>
              )}
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  selectedPropertiesList: PropTypes.string.isRequired,
  properties: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedPropertiesList, propertiesByList } = state;
  const { isFetching, lastUpdated, items: properties } = propertiesByList[
    selectedPropertiesList
  ] || {
    isFetching: true,
    items: []
  };
  return {
    selectedPropertiesList,
    properties,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(App);
