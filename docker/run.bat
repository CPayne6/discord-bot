setlocal
for /F "tokens=*" %%A in (../.env) do SET %%A

docker compose up --build -d

endlocal
