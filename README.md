# message-board
## 1. 安裝
安裝 package.json 裡的 npm package
```
npm update
```
###### 目前詳細 package 如下
```
"devDependencies": {
    "babel": "^6.5.2",
    "babel-core": "^6.7.7",
    "babel-loader": "^6.2.4",
    "babel-preset-es2015": "^6.6.0",
    "babel-preset-react": "^6.5.0",
    "babel-preset-stage-2": "^6.5.0",
    "express": "^4.13.4",
    "node-libs-browser": "^1.0.0",
    "react": "^15.0.2",
    "react-dom": "^15.0.2",
    "react-hot-loader": "^1.3.0",
    "react-router": "^2.4.0",
    "webpack": "^1.13.0",
    "webpack-dev-server": "^1.14.1"
  },
  "dependencies": {
    "nodemon": "^1.9.2"
  }
```
  
## 2. 測試
```
npm start
```
###### 將會執行package.json 裡面 scripts 的 start

暫時將 server 放在src/server/server.js，網址 127.0.0.1:3000

