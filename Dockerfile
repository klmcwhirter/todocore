# docker build -t klmcwhirter/todocore .

FROM microsoft/dotnet:latest

COPY . /app

WORKDIR /app

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - \
    && apt-get install -y nodejs \
    && rm -fr node_modules \
    && npm install \
    && dotnet restore \
    && dotnet build \
    && dotnet ef database update \
    && ./node_modules/.bin/gulp build

EXPOSE 5000/tcp

ENTRYPOINT ["dotnet", "run", "--server.urls", "http://0.0.0.0:5000"]
