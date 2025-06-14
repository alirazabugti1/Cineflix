import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

export default function FavoritesScreen() {
  const favorites = useSelector(state => state.favorites); 

  const renderItem = ({ item }) => (
    <View style={styles.movieCard}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />
      <Text style={styles.movieTitle} numberOfLines={1}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Favorite Movies</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites added yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 50,
    paddingHorizontal: 15,   
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyText: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  listContainer: {
    paddingTop: 20,
    paddingBottom: 30,      
  },
  movieCard: {
    width: '100%',          
    flexDirection: 'row',  
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,       
    alignItems: 'center',
    padding: 10,            
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  movieTitle: {
    flex: 1,              
    color: 'white',
    fontSize: 18,
    marginLeft: 15,       
    fontWeight: '600',
  },
});
