FROM node:lts-alpine

# Labels for GitHub to read your action
LABEL "com.github.actions.name"="Library-box"
LABEL "com.github.actions.description"="Update gist with latest reads from google books"

# Cheatsheet for GitHub action branding: https://haya14busa.github.io/github-action-brandings/
LABEL "com.github.actions.icon"="book"
LABEL "com.github.actions.color"="pink"

# Copy the package.json and package-lock.json
COPY yarn.lock ./
COPY package.json ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of your action's code
COPY . .

# Run `node index.js`
ENTRYPOINT ["node", "index.js"]
