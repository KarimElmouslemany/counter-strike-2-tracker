import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from "expo-router";
const Home = () => {
  return (
    <View style={styles.Container}>
      <Text>Home</Text>
     <Link href="/Statues">Stautes</Link>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
   Container:{
    flex: 1,
    alignItems: "center",
    justifyContent:"center"
  }
})
// rnfes