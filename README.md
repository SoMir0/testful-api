# ~~testful-api~~ Onboards

Re-purposed into an online clipboard app, Onboards.

### To run:

1. Set up PostgreSQL on your machine.

2. Set up a database with a table called **boards**.

3. Create a .env file in the root folder that looks like this:

```
user=yourUsername
password=yourPassword
host=localhost
database=yourDBname
```

4. Execute these commands:

```bash
git clone https://github.com/SoMir0/testful-api.git
cd testful-api/frontend
npm ci
npm run dev

# In another terminal

cd testful-api
npm ci
npm run dev
```

### Info

An online clipboard app to exchange text between devices, not done.
