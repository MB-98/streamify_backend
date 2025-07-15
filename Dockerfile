FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

COPY src/secret/cloudfront/cloudfront-private-key.pem /app/cloudfront-private-key.pem
ENV CLOUDFRONT_PRIVATE_KEY_PATH=/app/cloudfront-private-key.pem

RUN npm install --only=production

EXPOSE 80
CMD ["node", "dist/main"]
