import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Actions from 'actions';
import _debounce from 'lodash/debounce';
import _filter from 'lodash/filter';
import _isEmpty from 'lodash/isEmpty';
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  Keyboard,
} from 'react-native';
import { Icon } from 'native-base';
import * as Colors from 'themes/colors';
import Loading from 'components/Loading';
import FilmCard from './local_components/FilmCard';
import { FilmData } from './local_components/FilmData';

class Home extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      filmData: [],
      isReload: false,
      currentPage: 1,
      searchText: 'Marvel',
    };
    this.onSearchTextChange = _debounce(this.onSearchTextChange, 400);
  }

  componentDidMount() {
    this.setState({ filmData: FilmData });
    this.props.fetchFilmList('Marvel', 'movie', this.state.currentPage, false);
  }

  onSearchTextChange = (t: string) => {
    if (t === '') {
      this.setState({ searchText: 'Marvel' });
      this.props.fetchFilmList('Marvel', 'movie', 1, true);
    } else {
      this.setState({ searchText: t });
      this.props.fetchFilmList(t, 'movie', 1, true);
    }
  }

  onCardClick = (item) => {
    this.props.navigation.navigate('Details', { filmData: item })
  }

  onFetchList = (reload) => {
    const { fetching, firmList, totalResults, errors } = this.props;
    const { searchText } = this.state;

    if (fetching) return;

    if (reload) {
      this.setState({ isReload: true, currentPage: 1 });
      if (searchText === '') {
        this.props.fetchFilmList('Marvel', 'movie', 1, true);
      } else {
        this.props.fetchFilmList(searchText, 'movie', 1, true);
      }
      return;
    }
    this.setState({ isReload: false });
    if (_isEmpty(errors)) {
      if (firmList.length < totalResults) {
        this.setState({ currentPage: this.state.currentPage + 1 });
        if (searchText === '') {
          this.props.fetchNextFilmList('Marvel', 'movie', this.state.currentPage + 1, false);
      } else {
          this.props.fetchNextFilmList(searchText, 'movie', this.state.currentPage + 1, false);
        }
      }
    }
    
  }

  renderListItem = (item, index) => {
    return (
        <FilmCard filmData={item} index={index} onCardClick={this.onCardClick} />
    );
  }

  renderListFooter(fetching, reloading, currentPage) {
    return (fetching && !reloading && currentPage !== 1) ? (
      <View style={styles.loader}>
        <ActivityIndicator size="small" color={Colors.primary} />
      </View>
    ) : null;
  }

  render() {
    const { fetching, firmList, totalResults } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <Loading processing={!this.state.isReload && fetching} cleanBackground />
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>Film List</Text>
          <Icon
            type="FontAwesome"
            name="user-circle"
            style={styles.icon}
          />
        </View>
        <TextInput
          placeholder={'Search here...'}
          placeholderTextColor={Colors.white}
          autoCapitalize={'none'}
          style={styles.input}
          onChangeText={this.onSearchTextChange}
        />
        <FlatList
          contentContainerStyle={{}}
          onEndReached={() => this.onFetchList(false)}
          refreshControl={(
            <RefreshControl
              tintColor={Colors.secondary}
              refreshing={this.state.isReload && fetching}
              onRefresh={() => this.onFetchList(true)}
            />
          )}
          numColumns={2}
          data={firmList}
          extraData={firmList}
          onScrollBeginDrag={() => Keyboard.dismiss()}
          keyExtractor={item => item.imdbID.toString()}
          renderItem={({ item, index }) => this.renderListItem(item, index)}
          ListFooterComponent={() => this.renderListFooter(fetching, this.state.isReload, this.state.currentPage)}
        />
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
  loader: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
});

Home.propTypes = {
  fetchFilmList: PropTypes.func.isRequired,
  fetchNextFilmList: PropTypes.func.isRequired,
  firmList: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  errors: PropTypes.array.isRequired,
};

Home.defaultProps = {
};

const mapStateToProps = store => ({
  firmList: Actions.getFilmList(store),
  fetching: Actions.isFetchingFilmList(store),
  totalResults: Actions.getTotalResults(store),
  errors: Actions.getErrors(store),
});

const mapDispatchToProps = {
  fetchFilmList: Actions.fetchFilmList,
  fetchNextFilmList: Actions.fetchNextFilmList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
