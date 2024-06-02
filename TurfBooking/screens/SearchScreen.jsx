import {StatusBar, View, SafeAreaView, TextInput} from 'react-native';
import React, {useState} from 'react';
import Icon2 from 'react-native-vector-icons/Ionicons';
import SearchResults from '../components/SearchResults';

const SearchScreen = () => {
  const [input, setInput] = useState('');
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} backgroundColor={'#003580'} />
      <View className="m-5 px-2 py-1 flex-row items-center justify-between border-4 border-[#ffc72c] rounded-xl">
        <TextInput
          className="text-base"
          placeholder="Enter the Location"
          onChangeText={text => setInput(text)}
        />
        <Icon2 name="search" size={30} />
      </View>
      <SearchResults input={input} setInput={setInput} />
    </SafeAreaView>
  );
};

export default SearchScreen;
