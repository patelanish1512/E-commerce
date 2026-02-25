# -----------------------------------------------------------------------------
# Base Stage
# -----------------------------------------------------------------------------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files to restore dependencies
COPY ["AmazonClone.Api/AmazonClone.Api.csproj", "AmazonClone.Api/"]
COPY ["AmazonClone.Application/AmazonClone.Application.csproj", "AmazonClone.Application/"]
COPY ["AmazonClone.Domain/AmazonClone.Domain.csproj", "AmazonClone.Domain/"]
COPY ["AmazonClone.Infrastructure/AmazonClone.Infrastructure.csproj", "AmazonClone.Infrastructure/"]

RUN dotnet restore "AmazonClone.Api/AmazonClone.Api.csproj"

# Copy the remaining source code
COPY . .
WORKDIR "/src/AmazonClone.Api"

# Build and Publish
RUN dotnet build "AmazonClone.Api.csproj" -c Release -o /app/build
RUN dotnet publish "AmazonClone.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# -----------------------------------------------------------------------------
# Final Runtime Stage
# -----------------------------------------------------------------------------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8080

# For debugging/networking tools, optional:
# RUN apt-get update && apt-get install -y curl

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "AmazonClone.Api.dll"]
