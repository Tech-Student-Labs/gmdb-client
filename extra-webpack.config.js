// extra-webpack.config.ts
import * as webpack from '@angular-builders/custom-webpack';

export default {
  plugins: [
    new webpack.DefinePlugin({
      ENVVARS: {
        GMDB_API_HOST: JSON.stringify(process.env.GMDB_API_HOST)
      }
    })
  ]
};
