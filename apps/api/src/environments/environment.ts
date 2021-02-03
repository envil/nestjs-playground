export const environment = {
  production: false,
};
export const configurations = () => ({
  cities: [
    'Helsinki,FI',
  ],
  openweathermap: {
    appId: '2be5213c6e457effb144c15c5fcb08b8'
  },
  databases: {
    mongo: 'mongodb://mongodb:27017/weather-alert'
  }
});
