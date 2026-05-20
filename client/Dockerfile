FROM oven/bun:1.3.14 AS base
ARG USER_ID=1000
ARG GROUP_ID=1000

# Install passwd to get useradd/groupadd and create user
RUN apt-get update && apt-get install -y passwd && \
    if ! getent group ${GROUP_ID} >/dev/null; then groupadd -g ${GROUP_ID} appuser; fi && \
    if ! getent passwd ${USER_ID} >/dev/null; then useradd -l -u ${USER_ID} -g ${GROUP_ID} -m appuser; fi

WORKDIR /app
RUN chown ${USER_ID}:${GROUP_ID} /app

FROM base AS install
RUN mkdir -p /temp/dev && chown -R ${USER_ID}:${GROUP_ID} /temp
USER ${USER_ID}:${GROUP_ID}
COPY --chown=${USER_ID}:${GROUP_ID} package.json bun.lock* /temp/dev/
RUN cd /temp/dev && (bun install --frozen-lockfile || bun install)

FROM base AS build
USER ${USER_ID}:${GROUP_ID}
COPY --from=install --chown=${USER_ID}:${GROUP_ID} /temp/dev/node_modules node_modules
COPY --chown=${USER_ID}:${GROUP_ID} . .
RUN bun run build

FROM nginx:1.30.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
