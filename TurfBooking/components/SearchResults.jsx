import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import data from '../assets/Data/turfs.json';
import {useNavigation} from '@react-navigation/native';

const SearchResults = ({input, setInput}) => {
  const navigation = useNavigation();
  return (
    <View className="m-5">
      <FlatList
        data={data}
        renderItem={({item}) => {
          if (item.place.toLowerCase().includes(input.toLowerCase())) {
            if (input === '') return null;
            return (
              <TouchableOpacity
                className="mx-3 flex-row items-center"
                onPress={() => {
                  setInput(item.place);
                  navigation.navigate('Home', {place: item.place});
                }}>
                <View>
                  <Image
                    source={{uri: item.placeImage}}
                    style={{width: 100, height: 100}}
                    resizeMode="contain"
                  />
                </View>
                <View className="ml-5">
                  <Text className="text-slate-800 font-bold text-lg">
                    {item.place}
                  </Text>
                  <Text className="text-slate-500 font-semibold text-sm">
                    {item.shortDescription}
                  </Text>
                  <Text>{item.properties.length} Turfs</Text>
                </View>
              </TouchableOpacity>
            );
          }
        }}
      />
    </View>
  );
};

export default SearchResults;
