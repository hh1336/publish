FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["ADMIN/ADMIN.csproj", "ADMIN/"]
RUN dotnet restore "ADMIN/ADMIN.csproj"
COPY . .
WORKDIR "/src/ADMIN"
RUN dotnet build "ADMIN.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "ADMIN.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "ADMIN.dll"]