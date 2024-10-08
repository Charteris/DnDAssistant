# Dungeons And Dragons Assistant

An assistant for me as the dungeon master for DnD sessions.

## Execute frontend

To run the frontend, simply install dependencies with `npm i` and run the frontend with `npm start`.

A static deployment of the frontend can be achieved via `npm deploy`.

## Execute backend

The following instructions are how to concisely run the backend:

1. Install docker
2. Load the postgres database and adminer by running `docker compose up --build` in the `postgres` directory (this can be verified by checking <localhost:8080>)
3. Perform `mvn clean install`
4. Run `java -cp target/dnd-assistant-<version>.jar main.java.com.pigishentertainment.dndassistant.Main`

## Resources

Maps are generated through [Azgaar's Fantasy Map Generator](https://azgaar.github.io/Fantasy-Map-Generator/). Markers on the interactive map are generated via simple locational metadata in the `Avandria.json` file which is read at runtime. The locations of these markers are the relevant pixel coordinates of the generated map where city images are generated through [Watabou's City Generator](https://watabou.github.io/city-generator/) which uses the `outskirts.json` and `charred.json` styles respectively loaded through the *Color Scheme* menu. Other settings applied through the *Style* menu include *Misc -> Show trees & Show Alleys*; *Elements -> Districts -> Legend*; and *Graphics -> Thing Lines & Tint Districts & Weathered roofs*.

Other Dungeons and Dragons resources are scraped from various resources across the internet which have been adopted as the relevant data structure for defining new resources as well. Eventually, all endpoints will be configured to accept JSON files of the relevant formats when ingesting new data and these will be frequently backed up to be preloaded as the default resources within the database.
