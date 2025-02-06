import { StyleSheet, View, useColorScheme, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { DARK_BACKGROUND, LIGHT_BACKGROUND } from '../../../../utils/const'
import { LineChart } from 'react-native-chart-kit'
import axios from '../../../../libs/axios'

export default function GrafikPenjualan() {
  const isDarkMode = useColorScheme() === 'dark'
  const [chartData, setChartData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChartData()
  }, [])

  const fetchChartData = async () => {
    try {
      const response = await axios.get('/master/transaction/chart-data')
      setChartData(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching chart data:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND }]}>
        <ActivityIndicator size="large" color={isDarkMode ? '#FFFFFF' : '#000000'} />
      </View>
    )
  }

  if (!chartData) return null

  const chartConfig = {
    backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
    backgroundGradientFrom: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
    backgroundGradientTo: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
    decimalPlaces: 0,
    color: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
    }
  }

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.transactions,
        color: (opacity = 1) => `rgba(71, 130, 218, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: chartData.amounts.map(amount => amount / 1000000), // Convert to millions for better visibility
        color: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`,
        strokeWidth: 2,
      }
    ],
    legend: ["Jumlah Transaksi", "Total Penjualan (dalam juta)"]
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND }]}>
      <LineChart
        data={data}
        width={Dimensions.get("window").width - 5}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        yAxisLabel=""
        yAxisSuffix=""
        withDots={true}
        withInnerLines={true}
        withOuterLines={true}
        withVerticalLines={true}
        withHorizontalLines={true}
        withShadow={false}
        legend={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  }
})