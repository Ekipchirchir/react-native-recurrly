import { View, Text } from 'react-native'
import { Link, useLocalSearchParams } from 'expo-router';

const SubscriptionDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>Subscriptions Details: {id} </Text>
      <Link href="/(tabs)/subscriptions">Go back</Link>
    </View>
  )
}

export default SubscriptionDetails