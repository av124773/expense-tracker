# 老爸的私房錢
本專案是一個簡單的網路記帳

## 產品功能
### 基礎專案功能
- 使用者可以在主要頁面查看餐廳名稱、類型及評分
- 使用者可以點選任一餐廳，查看地址、電話、餐廳簡述等詳細資訊
- 使用者可以在搜尋欄中輸入中、英文店名或餐廳類型等關鍵字來尋找餐廳
- 使用者可以點選網頁頂部的 "我的餐廳清單" 返回主要頁面
- 使用者可以點選餐廳資訊卡下方的 Detail，進入餐廳詳細資訊頁面
- 使用者可以點選餐廳資訊卡下方的 Edit，進入指定餐廳的資訊編輯頁面
- 使用者可以點選餐廳資訊卡下方的 Delete，刪除指定餐廳
- 使用者可以點選固定在首頁右下角的 "新增餐廳" 按鈕來新增餐廳
- 使用者可以在餐廳詳細資訊頁面，執行 Edit 和 Delete 的功能

### Final 專案新增功能
- 本專案的基礎專案功能必須要登入帳號才能使用
- 使用者可以註冊一個帳號，註冊資訊包括: 名字、信箱、密碼、確認密碼
- 其中註冊資訊中的名字不是必填資料，其餘信箱、密碼、確認密碼都是必填
- 若必填資料未填寫或密碼、確認密碼比對不符合或信箱已被註冊時，會顯示註冊失敗訊息與失敗原因
- 使用者可以透過 Facebook Login 登入本專案
- 使用者註冊成功並登入後，可以使用基礎專案功能自行建立專屬於該帳號的餐廳清單 
- 使用者可以透過畫面右上角的 logout 按鈕登出帳號
- 使用者註冊的密碼會使用 bcrypt 處裡後再存入資料庫

## 安裝流程
1. 開啟終端機(Terminal)，使用指令 `cd` 移動到想安裝檔案的位置
```
cd <想安裝檔案的路徑>
```
2. 執行 `git clone` 指令，下載檔案
```
git clone https://github.com/av124773/restaurantListUseMongoDB.git
```
3. 下載完成後，移動至專案資料夾內，使用 `npm install` 安裝需要的套件
```
cd restaurantList_auth

npm install
```
4. 完成後輸入指令執行專案
```
npm run start
```
5. 專案啟動後，打開瀏覽器輸入網址[http://localhost:3001](http://localhost:3001)
### 執行錯誤解決方法
如果執行後發生以下錯誤
```
Error [MongooseError]: The `uri` parameter to `openUri()` must be a string, 
got "undefined". Make sure the first parameter to `mongoose.connect()` or 
`mongoose.createConnection()` is a string.

```
可能是因為沒有將資料庫連結設定至環境變數，這時請在專案資料夾中新增檔案 `.env`
```
touch .env
```
使用 VScode 或記事本開起，在該檔案中加入資料庫連結，例如：
```
MONGODB_URI=mongodb+srv://<帳號>:<密碼>@cluster0.n3idk03.mongodb.net/<資料庫名稱>?retryWrites=true&w=majority
```
## 種子資料使用方式
在終端機(Terminal)中使用指令 `npm run seed` 可以建立種子資料，使用該指令會產生兩個使用者帳號，每個帳後都會有預設的餐廳資訊：
- 第一位使用者
  - email: user1@example.com
  - password: 12345678
- 第二位使用者
  - email: user2@example.com
  - password: 12345678

## 使用工具
1. Node.js v12.22.12
2. Express v4.16.4
3. Express-Handlebars v3.0.0
4. Bootstrap v5.1.3
5. Visual Studio Code
6. Robo 3T v1.4
7. Mongoose v5.9.7
8. dotenv v16.0.3
9. MongoDB Atlas
10. Express-Session v1.17.1
11. Passport v0.4.1
12. Passport-local v1.0.0
13. Passport-facebook v3.0.0
14. Connect-flash v 0.1.1
15. Bcryptjs v2.4.3

