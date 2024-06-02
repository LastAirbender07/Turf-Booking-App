import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = () => {
  return (
    <View className="w-full h-[65] px-2 pb-2 bg-[#003580] flex-row items-center justify-around">
      <TouchableOpacity className="flex-row items-center py-1 px-3 border-2 border-[#F0E4CE] rounded-3xl">
        <Icon1 name="cricket" size={30} color="white" />
        <Text className="text-white ml-[8] font-bold text-sm">Cricket</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-row items-center">
        <Icon1 name="basketball" size={30} color="white" />
        <Text className="text-white ml-[8] font-bold text-sm">Football</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-row items-center">
        <Icon1 name="badminton" size={30} color="white" />
        <Text className="text-white ml-[8] font-bold text-sm">Badminton</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
