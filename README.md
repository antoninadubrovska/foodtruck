
# Yum Yum Gim Me Sum – Foodtruck Webbapp

Detta projekt är en webbapplikation för den Karlstad-baserade foodtrucken **"Yum Yum Gim Me Sum"** som säljer wontons, dipsås och drycker. Appen är en **Single Page Application (SPA)** och är byggd med JavaScript.

## Funktioner

- Visa menyn med alla produkter hämtade från API:et.
- Lägg till produkter i varukorgen och ändra antal.
- Skicka beställning till API:et och få tillbaka ett order-ID.
- Visa kvitto för en lagd beställning.
- Navigera fram och tillbaka mellan meny och varukorg.

## Tekniker

- JavaScript (ES6+), HTML, CSS
- Fetch API för att kommunicera med backend-API
- Responsiv design, mobile-first
- Hantering av state med egna funktioner för varukorg och beställningar

## API-användning

Appen kommunicerar med API:et på följande sätt:

- **Hämta meny:** `getMenu()`
- **Skapa tenant:** `createTenant(name)`
- **Skapa order:** `createOrder(tenantId, orderBody)`
- **Hämta kvitto:** `getReceipt(orderId)`