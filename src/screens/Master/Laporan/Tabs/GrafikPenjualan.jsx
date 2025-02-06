import {
  StyleSheet,
  View,
  useColorScheme,
  Dimensions,
  ActivityIndicator,
  Text,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
} from '../../../../utils/const';
import {LineChart} from 'react-native-chart-kit';
import axios from '../../../../libs/axios';
import {rupiah} from '../../../../libs/utils';

export default function GrafikPenjualan() {
  const isDarkMode = useColorScheme() === 'dark';
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const response = await axios.get('/master/transaction/chart-data');
      console.log(response.data);
      setChartData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching chart data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={isDarkMode ? '#fff' : '#000'} />
      </View>
    );
  }

  if (!chartData) return null;

  const chartConfig = {
    backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
    backgroundGradientFrom: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
    backgroundGradientTo: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
    decimalPlaces: 0,
    color: (opacity = 1) =>
      isDarkMode
        ? `rgba(255, 255, 255, ${opacity})`
        : `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) =>
      isDarkMode
        ? `rgba(255, 255, 255, ${opacity})`
        : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
    },
  };

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.transactions,
        color: (opacity = 1) => `rgba(71, 130, 218, ${opacity})`, // Warna biru
        strokeWidth: 2,
      },
      {
        data: chartData.amounts.map(amount => amount / 1000000), // Convert to millions
        color: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`, // Warna oranye
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View
      style={styles.container(isDarkMode)}
      className="h-full justify-start items-center p-3">
      <View style={styles.legendContainer}></View>

      <View
        className="w-full  p-3 m-3 rounded-xl pr-96"
        style={{backgroundColor: isDarkMode ? '#262626' : '#f8f8f8'}}>
        <View className="pr-96">
          <LineChart
            data={data}
            width={Dimensions.get('window').width}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>
      </View>

      <View className="items-start w-full mb-2 justify-start flex-col">
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, {backgroundColor: '#4782DA'}]} />
          <Text
            className="font-poppins-semibold text-sm"
            style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
            Jumlah Transaksi
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, {backgroundColor: '#F59E0B'}]} />
          <Text
            className="font-poppins-semibold text-sm"
            style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
            Total Penjualan ( Dalam Juta )
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between w-full">
        <Text
          className="font-poppins-semibold "
          style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
          Total Uang Masuk
        </Text>
        <Text
          className="font-poppins-semibold"
          style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
          {rupiah(chartData?.amounts)}
        </Text>
      </View>
      <View className="flex-row items-center justify-between w-full">
        <Text
          className="font-poppins-semibold "
          style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
          Total Transaksi
        </Text>
        <Text
          className="font-poppins-semibold"
          style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
          {chartData?.transactions}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: isDarkMode => ({
    backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
    paddingHorizontal: 16,
  }),
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartSubtitle: {
    fontSize: 14,
    marginTop: 10,
    color: '#666',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    marginRight: 40,
  },
  legendContainer: {
    flexDirection: 'column', // Menyusun legenda secara vertikal
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row', // Menyusun warna dan teks legenda secara horizontal
    alignItems: 'center',
    marginVertical: 5, // Jarak antara legenda
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
  },
});
