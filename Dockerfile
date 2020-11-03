
FROM node:12.19-alpine As builder
RUN mkdir -p /energy-consumption-ui
WORKDIR /energy-consumption-ui
COPY package.json /energy-consumption-ui/package.json
RUN npm install
COPY . /energy-consumption-ui

# RUN npm run build --prod

# FROM nginx:1.15.8-alpine

# COPY --from=builder /energy-consumption-ui/dist/energy-consumption-ui/ /usr/share/nginx/html

CMD ["npm","start"]