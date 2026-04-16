# 🎨 CASTJOVI - App de Plastilina per a Nens

Aplicació web interactiva dissenyada per a tablets, dirigida a nens que utilitzen figures de plastilina de la marca **Jovi**.

## 📱 Característiques Principals

### **Tres Seccions**
1. **Figures** 🎨
   - Reptes diaris (10 estrelles)
   - Reptes mensuals amb concursos (50 estrelles)
   - Sistema de votació mensual

2. **Àlbum** 📚
   - Col·leccions temàtiques: Savana, Mar, Jungla
   - Cada col·lecció té 4 figures
   - Desbloqueig amb estrelles guanyades
   - Editor de fotos integrat

3. **Social** 💬
   - Feed tipus microblogging
   - Sistema de moderació d'administració
   - Comentaris i likes
   - Contingut moderat i segur per a nens

### **Sistema de Gamificació**
- ⭐ Moneda virtual: Estrelles
- 🏆 Retos diaris i mensuals
- 📦 Col·leccions desblocables
- 🎖️ Rankings i competicions

### **Panel d'Administració** 🔐
- Accés secret: mantén premut el logo durant 3 segons
- Moderació de posts socials
- Gestió de figures mensuals per a votacions
- Dashboard centralitzat

## 🎨 Disseny

### **Paleta de Colors**
- **Blau**: `#00a1e8`
- **Groc**: `#ffdd00`
- **Verd**: `#84cc16`
- **Taronja**: `#ff8000`
- **Vermell**: `#ff0046`

### **Estil Visual**
- Efecte "liquid glass" estil Apple
- Textures de plastilina
- Botons 3D amb ombres
- Tipografia clara (Fredoka, Poppins)
- Interfície 100% en català

## 📱 Optimització per a Tablets

Aquesta aplicació està optimitzada per a tablets amb:
- **Mides de pantalla**: 768px - 1366px
- **Orientacions**: landscape i portrait
- **Touch targets**: mínims 48px per a accessibilitat
- **Fonts responsive**: s'ajusten segons el dispositiu
- **Layout fluid**: s'adapta a diferents resolucions

## 🚀 Desplegament

### **Com a Progressive Web App (PWA)**

Aquesta és una aplicació web que es pot utilitzar com a PWA en Android:

1. **Desplegar a un hosting**:
   - Netlify, Vercel, Firebase Hosting
   - Executar `npm run build`
   - Pujar la carpeta `dist/`

2. **Instal·lar en Android**:
   - Obrir l'URL en Chrome
   - Tocar "Menú" → "Afegir a pantalla d'inici"
   - L'app s'instal·larà com si fos nativa

3. **Avantatges de PWA**:
   - ✅ Funciona offline (amb cache)
   - ✅ Icona a la pantalla d'inici
   - ✅ Pantalla completa (sense barra del navegador)
   - ✅ Actualitzacions automàtiques
   - ✅ No cal publicar a Google Play

### **Accés a Càmera i Galeria**

La PWA pot accedir a:
- 📷 Càmera del dispositiu (amb permís)
- 🖼️ Galeria de fotos (amb permís)
- 💾 LocalStorage per a dades offline

## 🛠️ Tecnologies

- **React** 18+ amb TypeScript
- **React Router** per navegació
- **Tailwind CSS** v4 per estils
- **Motion** (Framer Motion) per animacions
- **LocalStorage** per persistència de dades
- **Sonner** per notificacions toast

## 🔒 Seguretat i Privacitat

- ⚠️ **No està dissenyada per recollir dades sensibles (PII)**
- 🔐 Sistema de moderació per contingut infantil
- 💾 Dades emmagatzemades localment (LocalStorage)
- 👨‍💼 Panel d'administració amb accés protegit

## 📦 Gestió d'Espai

Sistema de neteja automàtica de localStorage:
- Límits proactius per evitar errors
- Neteja automàtica al detectar quota excedida
- Màxim 20 posts aprovats, 50 posts pendents

## 🎯 Properes Funcionalitats Suggerides

Per convertir-la en una app Android nativa completa, caldria:

1. **React Native** o **Capacitor** per compilar a APK
2. **Accés avançat a càmera** per escanejat 3D
3. **Realitat Augmentada (AR)** amb ARCore
4. **Backend (Supabase)** per dades globals i concursos reals
5. **Notificacions push** per recordatoris diaris

---

**Desenvolupat amb ❤️ per a nens creatius amb JOVI**
