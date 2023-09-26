1. Заполнить базу данных: отправить пост запрос по адресу /factory/init
2. Получить все языковые коды: /lang-code/all (GET)
3. Получить самые часто используемые языковые коды для пользователя: /statistic/get/{userId} (GET)
4. Перевести слово: /word/translate (POST)  формате: 
{
   "origin": "Hi",
   "originCode": "en",
   "translateCode": "de"
}  
   Так же в header запроса добавить id текущего пользователя по ключу uuid