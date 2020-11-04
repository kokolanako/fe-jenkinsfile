
# FROM node:12.19-alpine As builder
# RUN mkdir -p /energy-consumption-ui
# COPY package.json /energy-consumption-ui/package.json
# RUN npm install
# COPY . /energy-consumption-ui



FROM nginx:1.15.8-alpine
WORKDIR /ui


COPY $UI /ui/

# CMD ["npm","start"]