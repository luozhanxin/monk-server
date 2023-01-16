# Dockerfile
FROM node:19
WORKDIR /app
COPY . /app

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone

RUN npm set registry https://registry.npm.taobao.org
RUN npm install
RUN npm install -g pm2

# run
CMD echo $SERVER_NAME && echo $AUTHOR_NAME && npm run prd-dev && npx pm2 log

# env
ENV SERVER_NAME="monk-server"
ENV AUTHOR_NAME="zhanxin"
