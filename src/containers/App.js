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
import Sidebar from "../components/Sidebar";
import MapContainer from "../components/Map";

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
            <Col xs={12} sm={3}>
              <Sidebar />
            </Col>

            <Col xs={12} sm={9}>
              <MapContainer properties={properties} isFetching />

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

const mapStateToProps = state => {
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
};

export default connect(mapStateToProps)(App);
