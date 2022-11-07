const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});


module.exports = withBundleAnalyzer(
  {
    compress: true,
    images: {
      minimumCacheTTL: 60,
      domains: ['localhost', 'seolcat.s3.ap-northeast-2.amazonaws.com'],
    },
    webpack(config) {
      const productionEnvironment = process.env.NODE_ENV === 'production';
      return {
        ...config,
        mode: productionEnvironment ? 'production' : 'development',
        devtool: productionEnvironment ? 'hidden-source-map' : 'eval-source-map',
      };
    },
  }
);
