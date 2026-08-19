# ArtUp APS — Guida alla pubblicazione

Questo pacchetto contiene il sito completo, pronto per essere pubblicato su un
dominio vero (es. artupaps.it) con Vercel gratis e un database gratuito
(Supabase) per far funzionare la Bacheca.

Tempo stimato: 20-30 minuti, tutto gratis.

---

## Parte 1 — Crea il database (Supabase)

1. Vai su **supabase.com** e crea un account gratuito (basta l'email o GitHub)
2. Clicca **"New Project"**
   - Nome progetto: `artup-aps` (o quello che preferisci)
   - Password database: scegline una e **salvala da parte** (non serve per il sito, ma tienila)
   - Regione: scegli quella più vicina all'Italia (es. Frankfurt/EU)
3. Aspetta 1-2 minuti che il progetto sia pronto
4. Nel menu a sinistra, clicca **"SQL Editor"** → **"New query"**
5. Apri il file **`supabase-setup.sql`** incluso in questo pacchetto, copia tutto il contenuto, incollalo nell'editor
6. Clicca **"Run"** (in basso a destra) — crea la tabella e i permessi in un colpo solo
7. Nel menu a sinistra, vai su **"Project Settings"** (icona ingranaggio) → **"API"**
8. Trovi due cose che ti servono:
   - **Project URL** (tipo `https://xxxxx.supabase.co`)
   - **anon public key** (una stringa lunga)
   - Tienile a portata di mano per il prossimo passo

---

## Parte 2 — Inserisci le chiavi nel codice

1. Apri il file **`src/App.jsx`** con un editor di testo qualsiasi (anche il Blocco Note va bene)
2. Trova queste righe vicino all'inizio del file:
   ```js
   const SUPABASE_URL = "https://TUO-PROGETTO.supabase.co";
   const SUPABASE_ANON_KEY = "TUA-ANON-KEY";
   ```
3. Sostituisci i due valori con quelli copiati da Supabase al passo 8 sopra
4. Salva il file

---

## Parte 3 — Pubblica su Vercel

1. Vai su **vercel.com** e crea un account gratuito (puoi accedere con GitHub)
2. Il modo più semplice: carica questa cartella su GitHub (crea un nuovo repository e trascina dentro tutti questi file), poi su Vercel clicca **"Add New" → "Project"** e seleziona quel repository
   - In alternativa, se non vuoi usare GitHub: installa [Vercel CLI](https://vercel.com/docs/cli) e lancia `vercel` dalla cartella — ti guida lui passo passo
3. Vercel riconosce automaticamente che è un progetto Vite/React: lascia le impostazioni di default e clicca **"Deploy"**
4. Dopo 1-2 minuti il sito è online su un indirizzo tipo `artup-aps.vercel.app`

---

## Parte 4 — Collega il dominio artupaps.it

1. Compra il dominio su un registrar (Aruba, Register.it, ecc.)
2. Su Vercel, entra nel progetto → **"Settings" → "Domains"**
3. Scrivi `artupaps.it` e clicca **"Add"**
4. Vercel ti mostra 1-2 righe da inserire nel pannello DNS del tuo registrar (di solito un record di tipo A e/o CNAME)
5. Vai sul pannello del registrar dove hai comprato il dominio, nella sezione **DNS**, e incolla quei valori
6. Aspetta da qualche minuto a poche ore perché si propaghi — poi `artupaps.it` mostrerà il sito

---

## Domande frequenti

**La Bacheca è pubblica per tutti?**
Sì, come prima: chiunque abbia il link al sito può leggere, pubblicare ed
eliminare annunci. Non c'è login. Se in futuro volete che solo i soci
possano pubblicare, si può aggiungere un sistema di autenticazione — fatecelo
sapere quando siete a questo punto.

**Quanto costa tutto questo?**
- Vercel: gratis
- Supabase: gratis (il piano free è ampiamente sufficiente per un'associazione)
- Unico costo reale: il dominio (~10-20€/anno)

**Chi ha accesso ai dati di Supabase?**
Solo chi ha le credenziali del progetto Supabase (email con cui l'avete
creato). I dati della Bacheca sono comunque pubblici via sito per via delle
policy impostate nello script SQL.

**Cosa faccio se qualcosa non funziona?**
Il caso più comune è aver copiato URL o chiave Supabase sbagliati/incompleti.
Ricontrollate il passo 2 con calma, spazi e virgolette inclusi.
