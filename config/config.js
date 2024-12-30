module.exports = {
    token: "token",
    customstatus: "💥Sklep",
    nazwa: "Nazwa sklepu",
    glowny_kolor: "Purple",
    tickety_embed_naglowek: "System ticketów",
    tickety_embed_opis: "Aby zakupić produkt, kliknij jeden z listy poniżej.",
    tickety_embed_zdjecie: false, 
    tickety_embed_zdjecie_url: 'https://i.imgur.com/AfFp7pu.png', // Podana grafika wyświetli się tylko wtedy, gdy zmienna wyżej jest ustawiona na true
    
    //config kanałów
    tickety_kategoria_id: "1316134009813602334",
    dodatkowy_dostep: false,
    dodatkowy_dostep_rola_id: "none", //Dodaje daną role/użytkownika do ticketów. Działa tylko, gdy funkcja wyżej jest ustawiona na true

    //metody płatności
    blik_numer: "twój numer telefonu",
    paypal_email: "twój email paypal",
    
    platnosc_ltc_mozliwa: true,
    ltc_adres: "twój adres LTC",
    
    //kanał ticketu
    kanal_ticket_embed_opis: `Dziękujemy za stworzenie ticketa. Jeżeli masz pytania, zadaj je teraz aby uniknąć dodatkowego czasu oczekiwania.
Więcej informacji na temat metod płatności znajduje się pod komendą /metody płatności`,
    kanal_ticket_embed_zdjecie: true,
    kanal_ticket_embed_zdjecie_url: "https://i.imgur.com/AfFp7pu.png", // Podana grafika wyświetli się tylko wtedy, gdy zmienna wyżej jest ustawiona na true
    

}
