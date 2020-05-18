import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import * as Colors from 'themes/colors';
import * as Animatable from 'react-native-animatable';

class FilmCard extends Component {

  render() {
    const { filmData } = this.props;
    return (
      <Animatable.View
        easing="ease-in-out"
        animation="fadeIn"
        duration={500}
        useNativeDriver
        style={styles.container}
      >
        <TouchableOpacity onPress={() => this.props.onCardClick(filmData)}>
          <ImageBackground source={{uri: filmData.Poster}} imageStyle={{ borderRadius: 8 }} style={styles.filmImage}>
            <View style={styles.cardContainer}>
              <View style={styles.textContainer}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleText}>{filmData.Title}</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    padding: 16,
    justifyContent: 'center',
  },
  cardContainer: {
    borderRadius: 8,
    height: 200,
  },
  textContainer: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  filmImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

FilmCard.propTypes = {
  filmData: PropTypes.object,
  onCardClick: PropTypes.func,
};

FilmCard.defaultProps = {
  filmData: {},
  onCardClick: () => null,
};

export default FilmCard;
