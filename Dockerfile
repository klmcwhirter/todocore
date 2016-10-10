# docker build -t klmcwhirter/todocore .

FROM microsoft/dotnet:latest

COPY . /app

WORKDIR /app

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - \
    && apt-get install -y --no-install-recommends nodejs wamerican-small \
    && npm run setup \
    && npm run build

EXPOSE 5000/tcp

ENTRYPOINT ["dotnet", "run", "-p", "todocore" ]
