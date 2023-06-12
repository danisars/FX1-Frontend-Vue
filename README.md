# FX1

## Build Setup

```bash
# install dependencies
$ yarn install

# build for production and launch server
$ yarn install
$ yarn build
$ yarn start

# serve with hot reload at localhost:3000
$ yarn dev

# generate static project
$ yarn generate
```


## Environment Variables

| Key             | Value                                                                                      | Description                                     |
| --------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| FIREBASE_CONFIG | _Ask the developers_                                                                       | Firebase project config                         |
| APP_ENV         | **Local/Develop/Staging**: <br />`develop` <br /><br /> **Production**: <br />`production` | Indicate the environment server is running in   |
| PORT            | _By default: `3000`_                                                                       | Server port                                     |
| GRAPHQL_URL     | _Ask the developers_                                                                       | Graphql endpoint based on current environment   |
| SOCKET_URL      | _Ask the developers_                                                                       | Socket.IO endpoint based on current environment |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[ISC](https://choosealicense.com/licenses/isc/)
