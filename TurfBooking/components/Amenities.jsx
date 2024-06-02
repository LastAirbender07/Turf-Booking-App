import { Text, View } from 'react-native'
import React from 'react'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

const Amenities = () => {
    const services = [
        {
            id: 1,
            name: 'Free Wifi',
            icon: 'wifi',
            color: 'black',
        },
        {
            id: 2,
            name: 'Free Parking',
            icon: 'car',
            color: 'black',
        },
        {
            id: 3,
            name: 'Swimming Pool',
            icon: 'pool',
            color: 'black',
        },
        {
            id: 4,
            name: 'Gym',
            icon: 'dumbbell',
            color: 'black',
        },
        {
            id: 11,
            name: 'Pet Friendly',
            icon: 'paw',
            color: 'black',
        },
        {
            id: 14,
            name: 'Fitness Center',
            icon: 'weight-lifter',
            color: 'black',
        },
        {
            id: 17,
            name: 'Garden',
            icon: 'flower',
            color: 'black',
        },
        {
            id: 22,
            name: 'Elevator',
            icon: 'elevator',
            color: 'black',
        },
        {
            id: 23,
            name: 'Wheelchair Accessible',
            icon: 'human-wheelchair',
            color: 'black',
        },
        {
            id: 24,
            name: 'Smoking Area',
            icon: 'smoking',
            color: 'black',
        }
    ]
  return (
    <View className="p-2">
      <Text className="text-base font-semibold">Most Popular Facilities</Text>
      <View className="flex-row flex-wrap gap-1">
        {services.map((service, index) => (
            <View key={index} className="flex-row items-center justify-center gap-[5] px-2 py-1 rounded-lg bg-[#007fff]">
                <Icon1 name={service.icon} size={15} color='white' />
                <Text className="text-white text-sm">{service.name}</Text>
            </View>
        ))}
      </View>
    </View>
  )
}

export default Amenities