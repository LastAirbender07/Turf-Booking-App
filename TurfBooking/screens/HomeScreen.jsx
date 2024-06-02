import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  LogBox,
  Alert,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../components/Header';
import HomeExtras from '../components/HomeExtras';

const HomeScreen = () => {
  const route = useRoute();
  LogBox.ignoreLogs([
    'Warning: TextInputComponent: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
  ]);

  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [people, setPeople] = useState(null);
  const [selectedDate, setSelectedDate] = useState('Date');

  const data = [
    {label: '2 Adults', value: '2'},
    {label: '3 Adults', value: '3'},
    {label: '4 Adults', value: '4'},
    {label: '5 Adults', value: '5'},
    {label: '6 Adults', value: '6'},
    {label: '7 Adults', value: '7'},
    {label: '8 Adults', value: '8'},
    {label: '9 Adults', value: '9'},
    {label: '10 Adults', value: '10'},
    {label: '11 Adults', value: '11'},
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Turf Booking',
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
      headerRight: () => (
        <View style={{flexDirection: 'row', marginRight: 10}}>
          <Icon1
            name="cards-heart"
            size={30}
            color="white"
            style={{marginRight: 10}}
          />
          <Icon2 name="notifications" size={30} color="white" />
        </View>
      ),
      headerLeft: () => (
        <Icon1 name="menu" size={30} color="white" style={{marginLeft: 10}} />
      ),
    });
  }, [navigation]);

  const searchPlaces = place => {
    if (!place || place === 'Location' || !selectedDate || !people) {
      Alert.alert('Invalid Details', 'Please fill all the fields', [
        {text: 'OK'},
      ]);
      return;
    }
    navigation.navigate('Places', {
      place: route?.params?.place,
      date: selectedDate,
      people: people,
    });
  };

  return (
    <ScrollView className="w-full h-full">
      <StatusBar barStyle={'light-content'} backgroundColor={'#003580'} />
      <Header />
      <View className="justify-center p-5 gap-2">
        <TouchableOpacity
          className="flex-row gap-2 p-1 items-center border-2 border-yellow-400 rounded-lg"
          onPress={() => navigation.navigate('Search')}>
          <Icon2 name="location" size={30} color="#003580" />
          <Text className="text-lg font-semibold w-[290] p-2">
            {route?.params?.place ? route?.params?.place : 'Location'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row gap-2 p-1 items-center border-2 border-yellow-400 rounded-lg"
          onPress={() => setOpen(true)}>
          <Icon2 name="calendar" size={30} color="#003580" />
          <Text className="text-lg font-semibold w-[290] p-2">
            {selectedDate}
          </Text>
          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              setSelectedDate(date.toDateString());
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row gap-2 p-1 items-center border-2 border-yellow-400 rounded-lg">
          <Icon1 name="account-group" size={30} color="#003580" />
          <Dropdown
            className="text-lg font-semibold w-[290] p-1"
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="No of People"
            searchPlaceholder="Search..."
            value={people}
            onChange={item => {
              setPeople(item.value);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className=""
          onPress={() => searchPlaces(route?.params?.place)}>
          <View className="bg-[#003580] rounded-lg w-full h-12 items-center justify-center">
            <Text className="text-white text-xl">Search</Text>
          </View>
        </TouchableOpacity>
      </View>
      <HomeExtras />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
