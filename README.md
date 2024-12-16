# Mindbug cards

Show Mindbug cards with filtering abilities.

## Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Install

```bash
npm i
```

## Database

Using [Drizzle](https://orm.drizzle.team/) as orm, configured with [sqlite3](https://www.sqlite.org/)

```bash
# create tables, and run seed
npm run db:generate && npm run db:push && npm run db:seed
```

## Development

```bash
npm run dev # localhost:3000 by default
```

## Credits

+ Thanks to [ryanascherr/mindbug-deck](https://github.com/ryanascherr/mindbug-deck) for bringing
cards and creatures
