# Steps to recreate issue

1. Bring up postgres server:

```
docker-compose up -d
```

2. Apply migration to create table:

```
npx prisma migrate deploy
```

3. Run code:
```
node main.js
```

Expected output would be that only 1 user has claimed the seat and the seat has version = 1 (1 update). Actual outcome is the seat version = 2 and output:

```
Considering seat 1 v0 for user1
Considering seat 1 v0 for user2
Considering seat 1 v0 for user6
Considering seat 1 v0 for user4
Considering seat 1 v0 for user3
Considering seat 1 v0 for user5
user1 claimed the seat
user6 claimed the seat
There were 4 exceptions
```

Note: this occurs 90% of the time for me but may need to run multiple times to get to occur.

Full log when run with DEBUG="*" included in debug.txt
