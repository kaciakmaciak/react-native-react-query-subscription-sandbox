import React from 'react'
import {StatusBar} from 'expo-status-bar'
import {StyleSheet, Text, View} from 'react-native'
import {QueryClientProvider, QueryClient} from 'react-query'
import {useSubscription} from 'react-query-subscription'
import {interval} from 'rxjs'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ExampleInterval />
      </View>
    </QueryClientProvider>
  )
}

const interval$ = interval(1000)

function ExampleInterval() {
  const {data, isLoading, isError, error} = useSubscription(
    'example-key',
    () => interval$,
  )

  if (isLoading) {
    return <Text>Loading...</Text>
  }
  if (isError) {
    return <Text>{error?.message || 'Unknown error'}</Text>
  }
  return <Text>Data: {JSON.stringify(data)}</Text>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
