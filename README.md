# Restaurant app

## Run
```
yarn start
````

## Test
````
yarn test
```

## Tech stack
Based on create-react-app
```
create-react-app restaurant-app --scripts-version=react-scripts-ts
```

What it ate:
- Typescript
- React
- Redux + Redux-saga
- Styled components
- Jest + Enzyme for testing

## Notes

For SSR I would've probably tried NextJS as a starting point.
It's possible to backport SSR here too after ejecting,  https://medium.freecodecamp.org/demystifying-reacts-server-side-render-de335d408fe4

The API seems a bit buggy in places.
I inserted a few hacks here and there to make the app demoable due to the API bugs.
search for "HACK"
