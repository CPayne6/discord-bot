
cd %~dp0

cd ../

docker build . -f ./docker/Dockerfile --tag %1:latest

docker push %1
