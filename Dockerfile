FROM node:lts-hydrogen as InstallDependencies
WORKDIR /app
COPY ./package.json .
RUN yarn install --production

FROM node:lts-hydrogen as BuilderApp
WORKDIR /app
ENV MONGODB_URI = "mongodb://userTask:T4sk1234@localhost:27020/dbtask";
COPY --from=InstallDependencies /app/node_modules ./node_modules
COPY ./package.json .
COPY ./dist ./dist
EXPOSE 4000
CMD ["yarn","prod:start"]