import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const API_KEY = '50a9c8afd35eda57b87bcdc33d29cd1b';

export default function CineflixSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchMovies = async () => {
    if (!query.trim()) return;

    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      const json = await response.json();
      setResults(json.results);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const openTrailer = async (movieId) => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
      const json = await res.json();
      const trailer = json.results.find((vid) => vid.type === 'Trailer' && vid.site === 'YouTube');
      if (trailer) {
        Linking.openURL(`https://www.youtube.com/watch?v=${trailer.key}`);
      }
    } catch (error) {
      console.error('Trailer error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Movies</Text>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter movie name"
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity onPress={searchMovies} style={styles.searchButton}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openTrailer(item.id)} style={styles.resultItem}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.poster}
            />
            <Text style={styles.movieTitle} numberOfLines={2}>{item.title}</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
        contentContainerStyle={styles.resultsContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
  },
  title: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#222',
    color: 'white',
    paddingHorizontal: 15,
    borderRadius: 8,
    height: 45,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  resultsContainer: {
    paddingBottom: 40,
  },
  resultItem: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
  },
  poster: {
    width: 140,
    height: 200,
    borderRadius: 10,
  },
  movieTitle: {
    color: 'white',
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    width: 140,
  },
});
