import { View, Text } from 'react-native'
import { Link } from 'expo-router'

const SignUp = () => {
  return (
    <View>
      <Text>SignUp</Text>
      <Link href="/(auth)/sign-in">Already have an account? Sign In</Link>
    </View>
  )
}

export default SignUp