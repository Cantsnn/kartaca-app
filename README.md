# Kartaca Task App

Temel kullanıcı işlemleri yapılabilen, ana sayfada listenen ürünlere teklif verilebilen bir uygulama geliştirilmiştir. Teklifler anlık olarak oturum açan herkes tarafından görüntülenebilmektedir. Websocket kullanılmıştır.

## Backend
- Python - Flask
- Websocket

## Databases
- SQLlite
- Redis

## Frontend
- JavaScript - React


# Gereksinimler
- Docker
- Docker Compose

 # Kurulumlar
 1. Bu depoyu yerel bilgisayarınıza kopyalayın.
 2. docker-compose.yml dosyasını açın.
3. Redis URL'sini değiştirin (opsiyonel).
4. Terminalde aşağıdaki komutları çalıştırın:

```shell
docker-compose build
docker-compose up

```

5. Proje http://localhost:3000 portunda çalışacaktır.

# Kullanım
1. Hesap oluşturma
[resim]: ./img/singup.jpg "Hesap"
2. Giriş Yapma
[resim]: ./img/login.jpg "Login"

3. Ürün listeleme
[resim]: ./img/home.jpg "Home"

4. Teklif verme
[resim]: ./img/offer.jpg "Home"
