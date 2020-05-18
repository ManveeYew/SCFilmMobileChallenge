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

class Details extends Component {
  onBack = () => {
    this.props.navigation.pop();
  }

  render() {
    const { filmData } = this.props.route.params;
    return (
      <Container style={{ backgroundColor: Colors.backgroundDark }}>
        <StatusBar barStyle="light-content"/>
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
          <View style={styles.topSectionContainer}>
            <Image
              source={{uri: filmData.Poster}}
              resizeMode={'cover'}
              style={styles.filmImage}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{filmData.Title}</Text>
              <Text style={styles.yearText}>{filmData.Year}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.divider} />
              <View style={styles.filmDetailsContainer}>
                <View style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.genreText}>{filmData.Genre}</Text>
                </View>
                <View style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.genreText}>{filmData.Runtime}</Text>
                </View>
                <View style={{ width: '33%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                  <Icon
                    type="FontAwesome"
                    name="star"
                    style={{ fontSize: 12, color: 'yellow', marginRight: 4 }}
                  />
                  <Text style={styles.genreText}>{filmData.imdbRating}</Text>
                </View>
              </View>
              <View style={styles.plotContainer}>
                <Text style={styles.plotText}>Plot</Text>
                <Text style={styles.plotDescText}>{filmData.Plot}</Text>
              </View>
              <View style={styles.filmRatingContainer}>
                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.genreText}>Score</Text>
                  <Text style={styles.genreText}>{filmData.Metascore}</Text>
                </View>
                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.genreText}>Reviews</Text>
                  <Text style={styles.genreText}>{filmData.imdbVotes}</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.peopleContainer}>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={styles.genreText}>Director: </Text>
                  <Text style={[styles.genreText, { flexShrink: 1 }]}>{filmData.Director}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={styles.genreText}>Writer: </Text>
                  <Text style={[styles.genreText, { flexShrink: 1 }]}>{filmData.Writer}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.genreText}>Actors: </Text>
                  <Text style={[styles.genreText, { flexShrink: 1 }]}>{filmData.Actors}</Text>
                </View>
              </View>
            </View>
          </View>
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
};

Details.defaultProps = {
  filmData: {},
};

const mapStateToProps = store => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
