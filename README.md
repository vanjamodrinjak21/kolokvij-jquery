# Kolokvij - Jquery i Jquery UI  - PA3 

Ovo je projekt izrađen kao rješenje zadatka za kolokvij iz predmeta PA3IKZ.

Projekt implementira web stranicu s dva taba:

1.  **Prosjek:** Omogućuje unos četiri broja i dinamički izračunava i prikazuje njihov prosjek.
2.  **Mobiteli:** Prikazuje tablicu s podacima o mobitelima učitanim iz `mobiteli.json` datoteke. Omogućuje filtriranje mobitela prema godini proizvodnje.

## Tehnologije

*   HTML5
*   CSS3 (s CSS varijablama za teme)
*   JavaScript (ES6+)
*   jQuery
*   jQuery UI (za tabove)
*   JSON (za podatke o mobitelima)

## Značajke

*   Responzivni dizajn
*   Svijetla i tamna tema (s automatskom detekcijom i ručnim prekidačem)
*   Dinamičko učitavanje podataka (JSON)
*   Interaktivni izračun prosjeka
*   Filtriranje podataka u tablici

## Pokretanje lokalno

Budući da se radi o statičkom projektu (HTML, CSS, JS), dovoljno je otvoriti `index.html` datoteku u web pregledniku. Za neke funkcionalnosti poput AJAX učitavanja JSON datoteke, možda će biti potrebno pokrenuti lokalni web server.

Jednostavan način za pokretanje servera (ako imate instaliran Node.js):

1.  Otvorite terminal u korijenskom direktoriju projekta (`kolokvij`).
2.  Instalirajte `http-server` globalno (ako već nemate):
    ```bash
    npm install -g http-server
    ```
3.  Pokrenite server:
    ```bash
    http-server
    ```
4.  Otvorite prikazanu adresu (obično `http://127.0.0.1:8080` ili slično) u pregledniku
