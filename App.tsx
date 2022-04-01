import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import warehouseLamp from './assets/warehouse-lamp.jpg';
import Stock from './components/Stock.tsx';
// 4981f8a0a5e999e31be26ed3a8019945 APInyckel
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.base}>
      <Text style={{color: '#486875', fontSize: 52, fontFamily: 'Cochin', textAlign: 'center', margin: 10}}>Lamplager</Text>
      <Image source={warehouseLamp} style={{ width: 340, height: 240, borderRadius: 5, borderColor: '#756553', borderWidth: 3}} />
      <Stock />
      <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  base: {
    flex: 1,
    backgroundColor: '#FFF4E8',
    paddingLeft: 12,
    paddingRight: 12,
  }
});
