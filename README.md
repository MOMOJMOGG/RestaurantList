# 餐廳清單 RestaurantList version 4.0

一個基於 Node.js 的 Express 框架練習專案，包含實作 MongoDB、cookie-session、Middleware、Passport.js、Facebook API串接等

## 專案畫面 Demo
[<img align="center" src="https://github.com/MOMOJMOGG/RestaurantList/blob/master/public/images/HomePage.PNG" height="500" width="500" />]()
[<img align="center" src="https://github.com/MOMOJMOGG/RestaurantList/blob/master/public/images/create.PNG" height="500" width="500" />]()
[<img align="center" src="https://github.com/MOMOJMOGG/RestaurantList/blob/master/public/images/DeleteWarning.PNG" height="500" width="500" />]()
[<img align="center" src="https://github.com/MOMOJMOGG/RestaurantList/blob/master/public/images/Login.png" height="300" width="500" />]()
[<img align="center" src="https://github.com/MOMOJMOGG/RestaurantList/blob/master/public/images/Register.PNG" height="300" width="500" />]()

## 功能描述 - Features
- 瀏覽餐廳列表與基本資訊，包含: 餐廳名稱、圖片、類別、評分
  - 點選 **圖片** 顯示餐廳詳細資訊
  - 點選 **`Edit`** 可以編輯一家餐廳
  - 點選 **`Del`** 可以刪除一家餐廳
  - 點選 **➕** 可以新增一家餐廳
- 瀏覽餐廳詳細資訊，包含: 餐廳類別、地址、電話、介紹、圖片
  - 點選 **`Edit`** 可以編輯一家餐廳
  - 點選 **`Del`** 可以刪除一家餐廳
- 依照餐廳名稱進行搜尋
- 對餐廳顯示進行排序，包含: 新-舊、舊-新、名稱 A-Z、名稱 Z-A、類別、地區
- 登入才能使用餐廳網頁，包含使用者驗證與錯誤回報 **--version 4.0 新增功能**
  - 密碼有使用加密處理 
- 能註冊一組使用者帳號，包含登入資訊驗證與錯誤回報 **--version 4.0 新增功能**
  - 密碼有使用加密處理
- 能使用臉書進行登入 **--version 4.0 新增功能**
- 每個使用者的餐廳列表互相獨立 **--version 4.0 新增功能**


## 環境建置需求與套件版本 - Prerequisies & Package Version
- 開發平台: [Visual Studio Code](https://code.visualstudio.com/download)
- 開發環境: [Node.js](https://nodejs.org/en/) - v10.15.0
- 開發框架: [Express](https://expressjs.com/en/starter/installing.html) - v4.17.1
- 開發套件: [Express-handlebars](https://www.npmjs.com/package/express-handlebars) - v5.3.0
- 開發套件: [Express-session]() - v1.17.2
- 開發套件: [Nodemon](https://www.npmjs.com/package/nodemon) - v2.0.7
- 開發套件: [method-override](https://www.npmjs.com/package/method-override) - v3.0.0
- 開發套件: [bcryptjs](https://www.npmjs.com/package/bcryptjs) -v2.4.3
- 開發套件: [connect-flash](https://www.npmjs.com/package/connect-flash) -v0.1.1
- 開發套件: [passport](https://www.npmjs.com/package/passport) -v0.4.1
- 開發套件: [passport-local](https://www.npmjs.com/package/passport-local) -v1.0.0
- 開發套件: [passport-facebook](https://www.npmjs.com/package/passport-facebook) -v3.0.0
- 開發資料庫: [MongoDB](https://www.mongodb.com/) - v4.2.13
- 開發資料庫套件: [Mongoose](https://www.npmjs.com/package/mongoose) - (MongoDB 的 ODM) v5.12.6


## 安裝與執行步驟 - Installation & Execution
1. 打開你的終端機(Terminal)，git clone 此專案至本機電腦，或直接從 github 下載並解壓縮此專案

```
git clone https://github.com/MOMOJMOGG/RestaurantList.git
```

2. 在終端機下指令，進入存放此專案的資料夾，Ex: 放置此專案位置 D://RestaurantList

```
cd D://RestaurantList
```

3. 在終端機下指令，安裝此專案需要的 npm 套件

```
npm install
```

4. 在終端機下指令，匯入餐廳資料種子檔案

```
npm run seed
```

5. 當終端機出現以下字樣，表示種子檔案已成功匯入 MongoDB 中

```
mongodb connected!
Seeder Creating Finished!
```

6. 運行 start 腳本指令，啟動專案伺服器

```
npm run start
```

7. 當終端機出現以下字樣，表示伺服器已啟動成功

```
App is running on http://localhost:3000.
mongodb connected!
```

8. 在終端機下指令 Ctrl+C 兩次，關閉伺服器

9. (Option) 若想在此專案使用開發者模式，在終端機下指令，安裝 nodemon 套件，幫助自動重啟伺服器。在第四步驟，改運行 dev 腳本指令，啟動專案伺服器

```
npm install -g nodemon

npm run dev
```


## 專案開發人員 - Contributor

> [MOMOJ](https://github.com/MOMOJMOGG)
