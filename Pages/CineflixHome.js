import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';

const API_KEY = '50a9c8afd35eda57b87bcdc33d29cd1b';

export default function CineflixHome() {
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const fetchMovies = async (category, setter) => {
    const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      setter(json.results);
    } catch (error) {
      console.error(error);
    }
  };

  const isFavorite = (movieId) => favorites.some(m => m.id === movieId);

  const handleToggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  const openYouTubeTrailer = async (movieId) => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
      const json = await res.json();
      const trailer = json.results.find((vid) => vid.type === 'Trailer' && vid.site === 'YouTube');
      if (trailer) {
        Linking.openURL(`https://www.youtube.com/watch?v=${trailer.key}`);
      }
    } catch (error) {
      console.error('Error opening trailer:', error);
    }
  };

  useEffect(() => {
    fetchMovies('popular', setPopular);
    fetchMovies('upcoming', setUpcoming);
    fetchMovies('top_rated', setTopRated);
  }, []);

  const renderMovies = (title, data) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openYouTubeTrailer(item.id)} style={{ marginRight: 10 }}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.posterImage}
            />
            <Text style={styles.movieTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <TouchableOpacity
              onPress={() => handleToggleFavorite(item)}
              style={{ position: 'absolute', top: 5, right: 5 }}
            >
              <Ionicons
                name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite(item.id) ? 'red' : 'white'}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>CINEFLIX</Text>
      <Image
        source={require('../assets/kuchkuch.jpg')}
        style={styles.mainPoster}
        resizeMode="contain"
      />
      <Text style={styles.description}>Charming Feel-Good Dramedy Movie</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="add" size={20} color="white" />
          <Text style={styles.buttonText}>My List</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.playButton]}>
          <Ionicons name="play" size={20} color="black" />
          <Text style={[styles.buttonText, { color: 'black' }]}>Play</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="information-circle-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Info</Text>
        </TouchableOpacity>
      </View>

      {renderMovies('Popular Movies', popular)}
      {renderMovies('Upcoming Movies', upcoming)}
      {renderMovies('Top Rated Movies', topRated)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  logo: {
    color: 'red',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingLeft: 10,
  },
  mainPoster: {
    width: '100%',
    height: 370,
    marginBottom: 20,
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  button: {
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  posterImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  movieTitle: {
    color: 'white',
    width: 120,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
});
