import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from 'actions';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { Container, Icon, Button, Content } from 'native-base';
import * as Colors from 'themes/colors';
import Loading from 'components/Loading';

class Details extends Component {
  componentDidMount() {
    const { filmData } = this.props.route.params;

    this.props.fetchFilm(filmData.imdbID);
  }

  onBack = () => {
    this.props.navigation.pop();
  }

  render() {
    const { fetching, filmDetails } = this.props;
    return (
      <Container style={{ backgroundColor: Colors.backgroundDark }}>
        <StatusBar barStyle="light-content"/>
        <Loading processing={fetching} cleanBackground />
        <View style={styles.iconContainer}>
            <TouchableOpacity onPress={this.onBack}>
              <Icon
                type="FontAwesome"
                name="chevron-left"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        <Content
          contentContainerStyle={styles.container}
					enableResetScrollToCoords={false}
        >
          {!fetching &&
            <View style={styles.topSectionContainer}>
              <Image
                source={{uri: filmDetails.Poster}}
                resizeMode={'cover'}
                style={styles.filmImage}
              />
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{filmDetails.Title}</Text>
                <Text style={styles.yearText}>{filmDetails.Year}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.divider} />
                <View style={styles.filmDetailsContainer}>
                  <View style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.genreText}>{filmDetails.Genre}</Text>
                  </View>
                  <View style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.genreText}>{filmDetails.Runtime}</Text>
                  </View>
                  <View style={{ width: '33%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <Icon
                      type="FontAwesome"
                      name="star"
                      style={{ fontSize: 12, color: 'yellow', marginRight: 4 }}
                    />
                    <Text style={styles.genreText}>{filmDetails.imdbRating}</Text>
                  </View>
                </View>
                <View style={styles.plotContainer}>
                  <Text style={styles.plotText}>Plot</Text>
                  <Text style={styles.plotDescText}>{filmDetails.Plot}</Text>
                </View>
                <View style={styles.filmRatingContainer}>
                  <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.genreText}>Score</Text>
                    <Text style={styles.genreText}>{filmDetails.Metascore}</Text>
                  </View>
                  <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.genreText}>Reviews</Text>
                    <Text style={styles.genreText}>{filmDetails.imdbVotes}</Text>
                  </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.peopleContainer}>
                  <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={styles.genreText}>Director: </Text>
                    <Text style={[styles.genreText, { flexShrink: 1 }]}>{filmDetails.Director}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={styles.genreText}>Writer: </Text>
                    <Text style={[styles.genreText, { flexShrink: 1 }]}>{filmDetails.Writer}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.genreText}>Actors: </Text>
                    <Text style={[styles.genreText, { flexShrink: 1 }]}>{filmDetails.Actors}</Text>
                  </View>
                </View>
              </View>
            </View>
          }
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 60,
    marginHorizontal: 16,
  },
  icon: {
    fontSize: 24,
    color: Colors.white,
  },
  filmImage: {
    height: 300,
    width: 160,
  },
  topSectionContainer: {
    width: '100%',
    height: 300,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
  },
  titleContainer: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    justifyContent: 'center',
    padding: 16,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  yearText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
    marginTop: 6,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.white,
    width: '100%',
  },
  detailsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
  },
  genreText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white, 
  },
  filmDetailsContainer: {
    padding: 16,
    flexDirection: 'row',
  },
  plotContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  plotText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 4,
  },
  plotDescText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
  filmRatingContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
  },
  peopleContainer: {
    padding: 16,
    paddingBottom: 100,
  },
});

Details.propTypes = {
  filmData: PropTypes.object,
  fetchFilm: PropTypes.func.isRequired,
  filmDetails: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
};

Details.defaultProps = {
  filmData: {},
};

const mapStateToProps = store => ({
  filmDetails: Actions.getFilm(store),
  fetching: Actions.isFetchingFilm(store),
});

const mapDispatchToProps = {
  fetchFilm: Actions.fetchFilm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
