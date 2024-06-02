import { Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import RatingStars from './RatingStars';
import { useNavigation } from '@react-navigation/native';

const PropertyCard = ({index, date, people, property}) => {
    const navigation = useNavigation();
  return (
    <View>
        <TouchableOpacity 
        style={{flexDirection: 'row', margin: 15, padding: 10, backgroundColor: 'white', borderRadius: 10, elevation: 5, gap:10}}
        onPress={() => navigation.navigate('PropertyInfo', {
            name: property.name,
            rating: property.rating,
            address: property.address,
            oldPrice: property.oldPrice,
            newPrice: property.newPrice,
            logo: property.image,
            photos: property.photos,
            slots: property.slotsAvailable,
            date: date,
            people: people
        })}>
            <View className="px-2 border-r border-gray-200">
                <Image source={{uri:property.image}} style={{height:150, width:100}} resizeMode='contain'/>
            </View>
            <View className="w-[210] pl-1 flex">
                <View className="flex-row items-center justify-between">
                    <Text className="text-gray-600 font-bold text-lg">{property.name}</Text>
                    <Icon1 name="cards-heart-outline" size={25} color="red" />
                </View>
                <View className="flex-row items-center justify-between mt-1"> 
                    <RatingStars rating={property.rating} /> 
                    <View className="bg-[#6cb4ee] px-2 py-1 flex-row items-center justify-between rounded-md">
                        <Text className="text-white text-sm mr-3">Genius</Text>
                        <Text className="text-white text-sm mr-1">{property.rating.toFixed(1)}</Text>
                        <Icon1 name="star-circle" size={17} color="gold" />
                    </View>
                </View>
                <View>
                    <Text className="text-gray-600 text-sm font-bold mt-1">{property.address.length > 50 ? property.address.substr(0, 50) : property.address}</Text>
                    <Text>Price for 1 hr and {people} adults</Text>
                </View>
                <View className="flex-row gap-2 items-center justify-start">
                    <Text className="text-red-500 text-sm line-through">₹{property.oldPrice}</Text>
                    <Text className="text-black text-base font-bold">₹{property.newPrice}</Text>
                </View>
                <View className="bg-[#6082b6] w-[150] px-2 py-1 flex-row items-center justify-center rounded-lg">
                    <Text className="text-white text-sm text-center">Limited Time Deal</Text>
                </View>
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default PropertyCard