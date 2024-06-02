import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome6';
import data from '../assets/Data/turfs.json';
import PropertyCard from '../components/PropertyCard';
import {
  BottomModal,
  ModalFooter,
  SlideAnimation,
  ModalTitle,
  ModalContent,
} from 'react-native-modals';

const PlacesScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [modalVisibile, setModalVisibile] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Popular Turfs',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: '#003580',
        height: 70,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
      headerTintColor: 'white',
    });
  }, [navigation]);

  const filters = [
    {
      id: '0',
      filter: 'cost: Low to High',
    },
    {
      id: '1',
      filter: 'cost: High to Low',
    },
  ];

  const searchPlaces = data?.filter(
    item => item.place === route?.params?.place,
  );
  const [sortedData, setSortedData] = useState(data);

  const compare = (a, b) => {
    if (a.newPrice < b.newPrice) {
      return -1;
    }
    if (a.newPrice > b.newPrice) {
      return 1;
    }
    return 0;
  };

  const comparision = (a, b) => {
    if (a.newPrice < b.newPrice) {
      return 1;
    }
    if (a.newPrice > b.newPrice) {
      return -1;
    }
    return 0;
  };

  const applyFilter = filter => {
    setModalVisibile(!modalVisibile);
    switch (filter) {
      case 'cost: Low to High':
        searchPlaces.map(item => item.properties.sort(compare));
        setSortedData(searchPlaces);
        break;
      case 'cost: High to Low':
        searchPlaces.map(item => item.properties.sort(comparision));
        setSortedData(searchPlaces);
        break;
      default:
        break;
    }
  };

  return (
    <View>
      <TouchableOpacity className="flex-row items-center justify-between px-8 py-4 bg-white">
        <TouchableOpacity
          className="flex-row items-center gap-3"
          onPress={() => setModalVisibile(!modalVisibile)}>
          <Icon3 name="arrow-right-arrow-left" size={22} color="gray" />
          <Text className="text-sm font-medium">Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center gap-3">
          <Icon2 name="filter" size={22} color="gray" />
          <Text className="text-sm font-medium">Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center gap-3"
          onPress={() =>
            navigation.navigate('Map', {searchPlaces: searchPlaces})
          }>
          <Icon1 name="map-marker" size={22} color="gray" />
          <Text className="text-sm font-medium">Map</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <ScrollView
        className="bg-[#f5f5f5]"
        contentContainerStyle={{width: '100%', paddingBottom: 70}}>
        {data
          ?.filter(item => item.place === route?.params?.place)
          .map(item =>
            item.properties.map((property, index) => (
              <PropertyCard
                key={index}
                date={route?.params?.date}
                people={route?.params?.people}
                property={property}
              />
            )),
          )}
      </ScrollView>
      <BottomModal
        onBackdropPress={() => setModalVisibile(!modalVisibile)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        footer={
          <ModalFooter>
            <TouchableOpacity
              className="w-full p-4 mx-auto bg-[#003580] justify-center items-center"
              onPress={() => applyFilter(selectedFilter)}>
              <Text className="text-white font-bold text-xl">Apply</Text>
            </TouchableOpacity>
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Sort and Filter" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        onHardwareBackPress={() => setModalVisibile(!modalVisibile)}
        visible={modalVisibile}
        onTouchOutside={() => setModalVisibile(!modalVisibile)}>
        <ModalContent className="w-full h-[280]">
          <View className="flex-row">
            <View className="my-[10] flex-[2] h-[280] border-r-2 border-[#e0e0e0]">
              <Text className="text-center">Sort</Text>
            </View>
            <View className="flex-[3]">
              {filters.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex-row items-center justify-between px-8 py-4 border-b-2 border-[#e0e0e0]"
                  onPress={() => setSelectedFilter(item.filter)}>
                  {selectedFilter.includes(item.filter) ? (
                    <Icon1
                      name="checkbox-marked-circle"
                      size={22}
                      color="#003580"
                    />
                  ) : (
                    <Icon1
                      name="checkbox-blank-circle-outline"
                      size={22}
                      color="gray"
                    />
                  )}
                  <Text className="text-sm font-medium">{item.filter}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </View>
  );
};

export default PlacesScreen;
