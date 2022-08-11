# ~~testful-api~~ Onboards

Re-purposed into an online clipboard app, Onboards.

### Dependencies

* [PostgreSQL](https://www.postgresql.org/)

* [NodeJS](https://nodejs.org/en/)

* [git](https://git-scm.com/)

### To run:

1. Set up PostgreSQL on your machine.

2. Set up a database with a table called **boards**.

3. Clone the repo and install node packages

```bash
git clone https://github.com/SoMir0/testful-api.git
cd testful-api/frontend
npm ci
cd ..
npm ci
```

4. Create a .env file in the root folder that looks like this:

```
user=yourUsername
password=yourPassword
host=localhost
database=yourDBname
```

5. Launch both the frontend and the backend:

```bash
cd testful-api
npm run dev

# In another terminal

cd testful-api/frontend
npm run dev
```

### Info

An online clipboard app to exchange text between devices, not done.
