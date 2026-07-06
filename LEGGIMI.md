# Manuale Soccorritore 118 — Versione PWA (installabile)

Questa cartella contiene la versione "app installabile" del manuale, in aggiunta al file HTML singolo che hai già (quello resta utilizzabile come sempre, semplicemente aprendolo nel browser).

## Cosa c'è dentro
- `index.html` — la stessa app, con i soli aggiunta dei collegamenti PWA (manifest + service worker)
- `manifest.json` — dice al telefono nome, icona e modalità "app" del manuale
- `sw.js` — service worker: mette in cache l'app per l'uso **offline**
- `icon-192.png` / `icon-512.png` — icone dell'app

## Perché non basta aprire index.html da file://
I service worker (necessari per l'offline) funzionano solo se i file sono serviti tramite **http/https**, non se apri il file direttamente dal filesystem (`file://...`). Serve quindi un piccolo server locale — bastano poche righe, anche dentro Termux.

## Come provarla in Termux (Android)
1. Copia l'intera cartella `soccorritore118-pwa` sul telefono.
2. Apri Termux nella cartella e avvia un server locale, ad esempio con Python:
   ```
   cd soccorritore118-pwa
   python3 -m http.server 8080
   ```
3. Apri Chrome su `http://localhost:8080/index.html`.
4. Dal menu di Chrome (⋮) scegli **"Aggiungi a schermata Home"** (o comparirà il banner automatico "Installa app").
5. Da quel momento l'icona sarà sulla home, si aprirà a schermo intero come un'app e funzionerà anche offline (dopo il primo caricamento).

## Come pubblicarla online (facoltativo, per non dover tenere Termux acceso)
Se in futuro vuoi che l'app resti installabile senza dover avviare un server ogni volta, puoi caricare questa cartella su un hosting statico gratuito (es. GitHub Pages, Netlify, Vercel): basta trascinare la cartella, senza bisogno di configurazioni particolari.

## Aggiornamenti
Se in futuro modifichi i contenuti, ricordati di cambiare il valore di `CACHE_NAME` dentro `sw.js` (es. da `v1` a `v2`): serve a far scaricare la nuova versione ai telefoni che avevano già installato l'app, altrimenti resterebbero con i contenuti vecchi in cache.
