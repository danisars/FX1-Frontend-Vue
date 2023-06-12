import { Plugin } from '@nuxt/types'
import request, { GraphQLClient } from 'graphql-request'
import { DocumentNode } from 'graphql'
import { getSdk } from '~/types/graphql'

declare module 'vue/types/vue' {
  interface Vue {
    $api: ReturnType<typeof getSdk>
    $gql<T>(
      query: string | DocumentNode,
      variables?: Record<string, any>
    ): Promise<T>
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $api: ReturnType<typeof getSdk>
    $gql<T>(
      query: string | DocumentNode,
      variables?: Record<string, any>
    ): Promise<T>
  }
  interface Context {
    $api: ReturnType<typeof getSdk>
    $gql<T>(
      query: string | DocumentNode,
      variables?: Record<string, any>
    ): Promise<T>
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $api: ReturnType<typeof getSdk>
    $gql<T>(
      query: string | DocumentNode,
      variables?: Record<string, any>
    ): Promise<T>
  }
}

const plugin: Plugin = ({ store, $config }, inject) => {
  const client = new GraphQLClient($config.graphqlURL)
  inject(
    'api',
    getSdk(client, async (action) => {
      try {
        await store.dispatch('auth/refreshToken')
        const token = store.state.auth.token

        return await action({
          ...(token ? { Authorization: `Bearer ${token}` } : undefined),
        })
      } catch (e) {
        console.log(e)
        throw e
      }
    })
  )
  inject(
    'gql',
    (query: string | DocumentNode, variables?: Record<string, any>) => {
      return request($config.graphqlURL, query, variables)
    }
  )
}

export default plugin
