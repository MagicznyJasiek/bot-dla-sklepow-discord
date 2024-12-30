# Bot dla sklepów Discord
### Wykonanie: Autorskie, Magiczny_Jasiek


# Spersonalizowanie
### Co można zmienić?
- Token bota
- Status bota
- Nazwe sklepu
- Kolor embedów
- Nagłówek embedu panelu ticketów
- Opis embedu panelu ticketów
- Zdjęcie embedu panelu ticketów
- Kategorie ticketów
- Dodatkowy dostęp do ticketów dla danej roli
- Numer blik
- Email paypal
- Adres LTC (można wyłączyć)
- Opis embedu po stworzeniu ticketa
- Zdjęcie embedu po stworzeniu embeda

### Jak to zmienić?
Aby zmienić ustawienia, wystarczy wejść w plik `config/config.js`, oraz go edytować. Każde pole ma odpowiednią nazwe.

**Trzeba patrzeć, co się daje w ustawieniach. Jedna zła literka, i bot się wywali.**
#
# Produkty
### Jak dodać/zmienić produkty?
Aby dodać swoje produkty, trzeba:

`1.` Wejść w plik `events/tickets/panel.js` oraz dodać sobie swoje nowe opcje oraz emoji. 
Dodajemy je tutaj:
```
.addOptions(
  new StringSelectMenuOptionBuilder()
    .setLabel('Przedmiot 1')
    .setEmoji('💰')
    .setValue('przedmiot1'),
  new StringSelectMenuOptionBuilder()
    .setLabel('Przedmiot 2')
    .setEmoji('💸')
    .setValue('przedmiot2'),
  new StringSelectMenuOptionBuilder()
    .setLabel('Przedmiot 3')
    .setEmoji('✨')
    .setValue('przedmiot3'),
)
```
Zamieniamy "Przedmiot 1", jego emoji oraz value na takie jakie chcemy. **Value trzeba zapamiętać, lub zapisać.**


`2.` Po wykonaniu punktu numer 1, przechodzimy do pliku `events/tickets/kanal.js`
W głównej funkcji (main) szukamy tej linijki kodu:
```
let produkt
if (przedmiot === 'przedmiot1'){
    produkt = "Testowy przedmiot numer 1"
} else if(przedmiot === 'przedmiot2'){
    produkt = "Testowy przedmiot numer 2"
} else if(przedmiot === 'przedmiot3'){
    produkt = "Testowy przedmiot numer 3"
}
```
Tutaj dajemy swoje values oraz ich odpowiedniki. Np. jeżeli sprzedajesz discord nitro, value powinno być: dsc_nitro a odpowiednik "Discord nitro".
### Przykład na 3 przedmiotach:
```
let produkt
if (przedmiot === 'dsc_nitro'){
    produkt = "Discord nitro"
} else if(przedmiot === 'netflix_konto'){
    produkt = "Konto NETFLIX"
} else if(przedmiot === 'yt_premium'){
    produkt = "Konto YouTube Premium"
}
```

#
# Komendy
### Lista komend i wyjaśnienie:
- `/ticket`: Wysyła panel do tworzenia ticketów. **Komenda dostępna tylko z permisją Administrator**
- `/metody płatności`: Wysyła embed z metodami płatności. (Numer blik, email paypal, adres LTC)

#
# Informacje
**Starałem się cały kod podpisywać komentarzami, ale nie wszędzie są. Bot działa jak powinien. Poniżej daje zdjęcia z działalności bota** 

![image](https://github.com/user-attachments/assets/473e77f2-9606-4d55-a40f-d2c325f28d92)
![image](https://github.com/user-attachments/assets/7c73c4bd-30bf-42ad-aa8b-2b393fb58f76)
![image](https://github.com/user-attachments/assets/0cc1d999-fc19-4f4d-a467-703ac55fe19f)
![image](https://github.com/user-attachments/assets/40d50488-3ef2-4ff0-90a1-f34402123c37)
![image](https://github.com/user-attachments/assets/095bcefb-a815-4a3c-8d06-d4d3aef8bcc1)



