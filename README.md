# Line-replytoken-bot
## What is this
It's Google App Script Project
It will provide
- Line Webhook endpoint
- API server to get Line replytoken

## API info
```bash
$ curl -L https://script.googleusercontent.com/...
{
  "timestamp": 123456,
  "id": "xxxx",
  "replyToken": "xxxxxx"
}
```
or when not found
```bash
$ curl -L https://script.googleusercontent.com/...
null
```

## How to deploy
1. init repository
```bash
npm i
...
```
2. create App Script Project by clasp
```bash
clasp login
...
clasp create
```
> use "clasp login --no-localhost" for remote
3. modify .clasp.json
```diff
{
  "scriptId": ...,
- "rootDir": ...,
+ "roodDir": "./dist",
}
```
4. create .env file
```env
TARGET_GROUP_IDS="[Line Group Id]"
TARGET_USER_IDS="[Line User Id]"
REPLYTOKEN_SHEET_ID="Your Spread Sheet Id"
REPLYTOKEN_SHEET_NAME="Your Sheet Name"
```
5. deploy
```bash
npm run deploy
```