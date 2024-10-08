import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import {BLUE_COLOR, HORIZONTAL_MARGIN, REGULAR_FONT, WHITE_COLOR, windowWidth} from '../../utils/const';
import Input from '../../components/form/input';

export default function PLNPrabayar() {
  const isDarkMode = useColorScheme() === 'dark';
  const [customer_no, setCustomerNo] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Input
          value={customer_no}
          placeholder="Masukan Nomor meter"
          onChange={text => setCustomerNo(text)}
          onDelete={() => setCustomerNo('')}
          type="numeric"
          lebar={windowWidth * 0.7}
        />
        <TouchableOpacity style={styles.buttonSearch}>
          <Text style={styles.buttonText}>Cek</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: HORIZONTAL_MARGIN,
    marginTop: 15,
  },
  formGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 5,
  },
  buttonSearch: {
    backgroundColor: BLUE_COLOR,
    borderRadius: 5,
    padding: 14.5,
    flex: 1,
  },
  buttonText : {
    color : WHITE_COLOR,
    fontFamily : REGULAR_FONT,
    textAlign : 'center'
  }
});
