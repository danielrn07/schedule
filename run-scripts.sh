#!/bin/bash

# Abre um terminal Alacritty para cada script do package.json

alacritty --title "Webpack" -e sh -c "npm run webpack" &
alacritty --title "Start" -e sh -c "npm run start" &
alacritty --title "Tailwind" -e sh -c "npm run tailwind" &
