import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Actions from 'actions';
import _debounce from 'lodash/debounce';
import _filter from 'lodash/filter';
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar,
  FlatList,
  RefreshControl,
} from 'react-native';
import { Icon, Input } from 'native-base';
import * as Colors from 'themes/colors';
import Loading from 'components/Loading';
import FilmCard from './local_components/FilmCard';
import { FilmData } from './local_components/FilmData';

class Home extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      filmData: [],
    };
    this.onSearchTextChange = _debounce(this.onSearchTextChange, 400);
  }

  componentDidMount() {
    this.setState({ filmData: FilmData });
    // this.props.fetchFilmList('Marvel', 'movie');
  }

  onSearchTextChange = (t: string) => {
    const newFilmData = _filter(FilmData, item => (
      item.Title.toLowerCase().includes(t)
    ));
    this.setState({ filmData: newFilmData });
  }

  onReload = () => {
    console.log('reload');
  }

  onCardClick = (item) => {
    this.props.navigation.navigate('Details', { filmData: item })
  }

  renderListItem = (item, index) => {
    return (
        <FilmCard filmData={item} index={index} onCardClick={this.onCardClick} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        {/* <Loading processing={true} cleanBackground /> */}
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>Film List</Text>
          <Icon
            type="FontAwesome"
            name="user-circle"
            style={styles.icon}
          />
        </View>
        <Input
          placeholder={'Search here...'}
          placeholderTextColor={Colors.white}
          autoCapitalize={'none'}
          style={styles.input}
          onChangeText={this.onSearchTextChange}
        />
        <FlatList
          contentContainerStyle={{}}
          refreshControl={(
            <RefreshControl
              tintColor={Colors.secondary}
              refreshing={false}
              onRefresh={this.onReload}
            />
          )}
          numColumns={2}
          data={this.state.filmData}
          extraData={this.state.filmData}
          keyExtractor={item => item.imdbID.toString()}
          renderItem={({ item, index }) => this.renderListItem(item, index)}
        />
        {/* <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: Colors.backgroundDark,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '600',
  },
  icon: {
    fontSize: 24,
    color: Colors.white,
  },
  input: {
    flex: 0,
    marginVertical: 16,
    height: 30,
    marginTop: 16,
    color: Colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: Colors.white,
  },
});

Home.propTypes = {
  fetchFilmList: PropTypes.func.isRequired,
};

Home.defaultProps = {
};

const mapStateToProps = store => ({
});

const mapDispatchToProps = {
  fetchFilmList: Actions.fetchFilmList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
