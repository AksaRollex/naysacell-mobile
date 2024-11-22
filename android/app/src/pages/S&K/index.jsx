import {ScrollView, StyleSheet, Text, View, useColorScheme} from 'react-native';
import React from 'react';
import {
  DARK_BACKGROUND,
  LIGHT_COLOR,
  WHITE_BACKGROUND,
  WHITE_COLOR,
} from '../../utils/const';

export default function SyaratDanKetentuan() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View>
      <View
        className="w-full h-full"
        style={{
          backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
        }}>
        <ScrollView className="mx-auto my-5 ">
          <View id="S&K" className="p-3 items-center">
            <Text
              className="text-base font-poppins-semibold"
              style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
              Syarat Dan Ketentuan
            </Text>
            <View className="my-5">
              <View className="my-1">
                <Text className="font-poppins-semibold">1. Pendahuluan</Text>
                <Text className="font-poppins-regular">
                  Syarat dan Ketentuan ini mengatur penggunaan layanan
                  pembayaran online (PPOB) yang disediakan oleh [ NAYSA COMPANY
                  ] melalui aplikasi [ NAYSA CELL ]. Dengan menggunakan aplikasi
                  ini, pengguna dianggap telah membaca, memahami, dan menyetujui
                  seluruh isi dalam Syarat dan Ketentuan ini.
                </Text>
              </View>
              <View className="my-1">
                <Text className="font-poppins-semibold">2. Definisi</Text>
                <Text className="font-poppins-regular">
                  Aplikasi: Merujuk pada aplikasi [ NAYSA CELL] yang menyediakan
                  layanan PPOB
                  {'\n'}
                  Pengguna: Individu yang telah terdaftar dan menggunakan
                  aplikasi {'\n'}
                  Layanan: Seluruh fitur dan jasa yang tersedia dalam aplikasi
                  {'\n'}Transaksi: Setiap aktivitas pembayaran atau pembelian
                  yang dilakukan melalui aplikasi
                </Text>
              </View>
              <View className="my-1">
                <Text className="font-poppins-semibold">
                  3. Pendaftaran Akun
                </Text>
              </View>
              <View className="my-1">
                <Text className="font-poppins-semibold">
                  3.1 Persyaratan Pendaftaran
                </Text>
                <Text className="font-poppins-regular">
                  Pengguna wajib berusia minimal 17 tahun atau sudah memiliki
                  {'\n'}
                  KTP Memberikan data diri yang benar dan valid Memiliki nomor
                  {'\n'}
                  telepon aktif dan email yang valid
                </Text>
              </View>
              <View className="my-1">
                <Text className="font-poppins-semibold">
                  3.2 Keamanan Akun{' '}
                </Text>
                <Text className="font-poppins-regular">
                  Pengguna bertanggung jawab menjaga kerahasiaan akun {'\n'}
                  Segala aktivitas yang dilakukan menggunakan akun menjadi
                  tanggung jawab pengguna {'\n'} Wajib segera melaporkan jika
                  terjadi akses tidak sah pada akun
                </Text>
              </View>
              <View className="my-1">
                <Text className="font-poppins-semibold">
                  4. Layanan Dan Transaksi
                </Text>
              </View>
              <View className="my-1">
                <Text className="font-poppins-semibold">
                  4.1 Layanan Yang Tersedia
                </Text>
                <Text className="font-poppins-regular">
                  Pembayaran tagihan listrik, air, telepon {'\n'}Pembelian pulsa
                  dan paket data{'\n'} Pembayaran e-commerce{'\n'} Pembayaran
                  BPJS"{'\n'} Layanan transfer uang {'\n'}Layanan lainnya yang
                  tersedia dalam aplikasi
                </Text>
              </View>
              <View className="my-1">
                <Text className="font-poppins-semibold">
                  4.2 Ketentuan Transaksi
                </Text>
                <Text className="font-poppins-regular">
                  Transaksi yang telah diproses tidak dapat dibatalkan {'\n'}
                  Minimum dan maksimum nominal transaksi mengikuti ketentuan
                  yang berlaku {'\n'}Biaya administrasi dibebankan sesuai dengan
                  jenis transaksi {'\n'}Struk/bukti transaksi akan diberikan
                  setelah transaksi berhasil
                </Text>
              </View>
              <View className="my-1">
                <Text className="font-poppins-semibold">
                  5. Ketentuan Transaksi
                </Text>
                <Text className="font-poppins-regular">
                  Biaya layanan dapat berbeda-beda sesuai jenis transaksi {'\n'}
                  Rincian biaya akan ditampilkan sebelum konfirmasi transaksi{' '}
                  {'\n'}
                  Perusahaan berhak mengubah biaya layanan sewaktu-waktu {'\n'}
                  Pembayaran dilakukan menggunakan metode yang tersedia dalam
                  aplikasi
                </Text>
              </View>
              <View className="my-1">
                <Text className="font-poppins-semibold">
                  6. Batasan Tanggung Jawab
                </Text>
              </View>
              <View className="my-1">
                <Text className="font-poppins-semibold">
                  6.1 Gangguan Layanan
                </Text>
                <Text className="font-poppins-regular">
                  Perusahaan tidak bertanggung jawab atas gangguan yang
                  disebabkan oleh:{'\n'}Masalah teknis di luar kendali
                  perusahaan {'\n'}
                  Gangguan jaringan atau internet {'\n'}Force majeure (bencana
                  alam, huru-hara, dll)
                </Text>
              </View>
              <View className="my-1">
                <Text className="font-poppins-semibold">
                  6.2 Kerugian Pengguna
                </Text>
                <Text className="font-poppins-regular">
                  Perusahaan tidak bertanggung jawab atas gangguan yang
                  disebabkan oleh: {'\n'} Kesalahan input data oleh pengguna
                  {'\n'}
                  Penyalahgunaan akun oleh pihak lain {'\n'}
                  Kelalaian pengguna dalam menjaga keamanan akun
                </Text>
              </View>
              <View className="my-1">
                <Text className="font-poppins-semibold">
                  7. Hak Dan Kewajiban{' '}
                </Text>
              </View>
              <View className="my-1">
                <Text className="font-poppins-semibold">
                  7.1 Hak Perusahaan
                </Text>
                <Text className="font-poppins-regular">
                  Membekukan atau menutup akun yang melanggar ketentuan {'\n'}
                  Mengubah atau menghentikan layanan tanpa pemberitahuan {'\n'}
                  Meminta informasi tambahan dari pengguna jika diperlukan{' '}
                </Text>
              </View>
              <View className="my-1">
                <Text className="font-poppins-semibold">
                  7.2 Kewajiban Pengguna
                </Text>
                <Text className="font-poppins-regular">
                  Memberikan informasi yang benar dan valid {'\n'}
                  Mematuhi seluruh syarat dan ketentuan {'\n'}
                  Menggunakan layanan sesuai peraturan yang berlaku{'\n'}
                  Membayar biaya layanan yang telah ditetapkan
                </Text>
              </View>
              <View className="my-1">
                <Text className="font-poppins-semibold">
                  8. Privasi Dan Keamanan Data
                </Text>
                <Text className="font-poppins-regular">
                  Perusahaan akan menjaga kerahasiaan data pengguna {'\n'}
                  Data pengguna dapat digunakan untuk keperluan layanan {'\n'}
                  Pengguna menyetujui penggunaan data sesuai kebijakan privasi{' '}
                </Text>
              </View>
              <View className="my-1">
                <Text className="font-poppins-semibold">
                  9. Perubahan Ketentuan
                </Text>
                <Text className="font-poppins-regular">
                  Perusahaan berhak mengubah syarat dan ketentuan sewaktu-waktu{' '}
                  {'\n'}
                  Perubahan akan diinformasikan melalui aplikasi atau email
                  {'\n'}
                  Penggunaan berkelanjutan setelah perubahan dianggap sebagai
                  persetujuan
                </Text>
              </View>
              <View className="my-1">
                <Text className="font-poppins-semibold">
                  10. Penyelesaian Masalah
                </Text>
                <Text className="font-poppins-regular">
                  Keluhan dapat disampaikan melalui layanan pelanggan
                  Penyelesaian masalah mengikuti prosedur yang berlaku Keputusan
                  perusahaan bersifat final dan mengikat
                </Text>
              </View>
              <View className="my-1">
                <Text className="font-poppins-semibold">11. Penutup </Text>
                <Text className="font-poppins-regular">
                  Keluhan dapat disampaikan melalui layanan pelanggan
                  Penyelesaian masalah mengikuti prosedur yang berlaku Keputusan
                  perusahaan bersifat final dan mengikat
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
