# Проект Место

Одностраничное приложение для размещения карточек с фотографиями красивых мест, с возможностями авторизации, регистрации и изменения информации о пользователе. Пользователи могут добавлять и удалять свои карточки, ставить и удалять лайки как своим, так и карточкам других пользователей.
Проект Место включает в себя фронтенд и бэкенд части.

## Функционал:

### Фронтенд:
- регистрация и авторизация пользователей.
- валидация вводимых данных пользователя.
- изменение информации и аватара пользователя.
- добавление карточек с фотографиями.
- удаление текущим пользователем своих карточек.
- добавление и удаление лайков карточкам.
- счетчик лайков каждой карточки.
- при клике по фото на карточке всплывает полноразмерное фото.
- всплывающие информационные окна при регистрации и авторизации пользователя.
- неавторизованные пользователи перенаправляются на страницу входа.

### Бэкенд:
- проверка всех поступающих на сервер данных.
- регистрация и аутентификация пользователей.
- создание, проверка и удаление токена.
- сохранение новых пользователей в базу данных.
- сохранение карточек в базу данных.
- внесение изменений данных пользователей, лайков карточек в базу данных.
- проверка принадлежности удаляемых карточек текущему пользователю.
- защита от веб-уязвимостей с помощью модуля helmet.


## Использованные технологии:
- HTML
- CSS
- JavaScript
- React.js
- Express.js
- helmet
- Figma
  
Сайт размещен по адресу: https://mesto.annam.nomoredomains.xyz   
Домен сервера: https://api.mesto.annam.nomoredom.nomoredomains.xyz
