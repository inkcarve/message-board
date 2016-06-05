// Webpack dev server
// Ran in parallel with the Express server

import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";
import config from "../../webpack.config";

var server = new WebpackDevServer(webpack(config), {
  // webpack-dev-server options
  publicPath: config.output.publicPath,
  stats: { colors: true },
  hot: true,
  noInfo: true,
  historyApiFallback: true
});
server.listen(8080, "127.0.0.1", function(err, result) {
	if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:8080');
});

