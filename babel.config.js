module.exports = function(api) {
  api.cache(true);
  console.log('found the babel.config')
  return {
    presets: ['babel-preset-expo'],
  };
};