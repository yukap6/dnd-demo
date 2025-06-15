# 阶段1: 依赖安装
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 阶段2: 项目构建
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# 阶段3: 运行配置
FROM node:18-alpine AS runner
WORKDIR /app
ENV PORT 3001 # 指定容器内部端口[6](@ref)
EXPOSE 3001 

# 复制构建产物
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 启动命令
CMD ["node", "server.js"] # 使用 standalone 模式[3](@ref)