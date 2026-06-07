# Meliani Trans

## Application de Transport International de Bagages & Marchandises Non Accompagnees

Application web complete de gestion de transport avec interface publique et espace d'administration.

---

## Architecture du Projet

```
meliani-trans/
├── backend/          # Spring Boot API
│   ├── src/main/java/com/melianitrans/
│   │   ├── config/       # Configuration (Security, CORS)
│   │   ├── controller/   # REST Controllers (Auth, Shipment, Tracking, Contact, Admin)
│   │   ├── dto/          # Data Transfer Objects
│   │   ├── entity/       # JPA Entities (User, Shipment, ShipmentStatusHistory, ShipmentRequest, ContactRequest)
│   │   ├── repository/   # Spring Data JPA Repositories
│   │   ├── security/     # JWT (Utils, Filters, UserDetails)
│   │   └── service/      # Business Logic Services
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
└── frontend/         # Angular Application
    ├── src/app/
    │   ├── components/   # Shared Components (Navbar, Footer)
    │   ├── guards/       # Route Guards (Auth, Public)
    │   ├── interceptors/ # HTTP Interceptors (Auth Token)
    │   ├── models/       # TypeScript Models & Interfaces
    │   ├── pages/        # Page Components
    │   │   ├── home/                 # Landing Page
    │   │   ├── tracking/             # Shipment Tracking
    │   │   ├── request-shipment/     # Public Shipment Request Form
    │   │   ├── contact/              # Contact Form
    │   │   ├── admin-login/          # Admin Login
    │   │   ├── admin-dashboard/      # Admin Dashboard
    │   │   ├── admin-shipments/      # Shipment CRUD Management
    │   │   ├── admin-requests/       # Shipment Requests Management
    │   │   └── admin-contacts/       # Contact Messages Management
    │   └── services/     # API Services
    └── package.json
```

---

## Technologies Utilisees

### Backend
- **Spring Boot 3.2** - Framework Java
- **Spring Security** - Securite & Authentification JWT
- **Spring Data JPA** - Persistance des donnees
- **PostgreSQL** - Base de donnees relationnelle
- **JJWT** - Generation & validation des tokens JWT
- **Maven** - Gestion des dependances

### Frontend
- **Angular 17** - Framework TypeScript
- **Bootstrap 5** - Framework CSS
- **Font Awesome** - Icones
- **RxJS** - Programmation reactive

---

## Fonctionnalites

### Interface Publique
- **Page d'accueil** - Hero section, statistiques, services, etapes de fonctionnement, temoignages, FAQ
- **Suivi de colis** - Recherche par numero de suivi avec historique complet
- **Demande d'envoi** - Formulaire public multi-etapes (prenom, nom, ville d'expedition, ville de livraison, pays, date)
- **Contact** - Formulaire de demande d'informations

### Espace Admin
- **Authentification JWT** - Login securise
- **Tableau de bord** - Statistiques globales
- **Gestion des expeditions** - CRUD complet + mise a jour du statut
- **Gestion des demandes** - Visualisation et changement de statut
- **Gestion des messages** - Visualisation et gestion des contacts

### Systeme de Statuts d'Expedition
- EN_PREPARATION, EN_AGENCE_DEPART, EN_TRANSIT, ARRIVEE_INTERMEDIAIRE, EN_AGENCE_ARRIVEE, EN_LIVRAISON, LIVRE, ANNULE
- Historique complet des mises a jour de statut avec localisation

---

## Configuration Requise

### Logiciels
- Java 17 ou superieur
- Node.js 18 ou superieur
- PostgreSQL 14 ou superieur (ou PostgreSQL Cloud comme Neon, Supabase, AWS RDS)
- Maven 3.8+

### Identifiants Administrateur
| Champ | Valeur |
|-------|--------|
| Email | Meliani@gmail.com |
| Mot de passe | Meliani@123 |

---

## Installation & Execution

### 1. Configuration de la Base de Donnees

Le backend est configure pour Neon PostgreSQL. Dans Neon, copiez la connection string puis convertissez-la au format JDBC pour Spring Boot :

```text
postgresql://neondb_owner:password@ep-wispy-haze-a2rr314o-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

jdbc:postgresql://ep-wispy-haze-a2rr314o-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channelBinding=require
```

Configurer les variables d'environnement :

```bash
# Linux/Mac
export DATABASE_URL="jdbc:postgresql://ep-wispy-haze-a2rr314o-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channelBinding=require"
export DB_USERNAME="neondb_owner"
export DB_PASSWORD="votre_mot_de_passe_neon"

# Windows
set "DATABASE_URL=jdbc:postgresql://ep-wispy-haze-a2rr314o-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channelBinding=require"
set "DB_USERNAME=neondb_owner"
set "DB_PASSWORD=votre_mot_de_passe_neon"
```

### 2. Lancer le Backend

```bash
cd backend

# Compilation
mvn clean install

# Execution
mvn spring-boot:run
```

Le backend demarre sur `http://localhost:8080`

### 3. Lancer le Frontend

```bash
cd frontend

# Installation des dependances
npm install

# Execution (development)
npm start
```

Le frontend demarre sur `http://localhost:4200`

---

## Configuration PostgreSQL Cloud

Pour utiliser un autre PostgreSQL Cloud (Neon, Supabase, Railway, etc.), mettez a jour les variables d'environnement :

```bash
export DATABASE_URL=jdbc:postgresql://votre-host-cloud.com:5432/votre_database?sslmode=require
export DB_USERNAME=votre_username
export DB_PASSWORD=votre_password
```

---

## API Endpoints

### Authentification
| Methode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/login` | Connexion admin |

### Expeditions (Auth requis)
| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/shipments` | Liste toutes les expeditions |
| GET | `/api/shipments/{id}` | Detail d'une expedition |
| POST | `/api/shipments` | Creer une expedition |
| PUT | `/api/shipments/{id}` | Modifier une expedition |
| DELETE | `/api/shipments/{id}` | Supprimer une expedition |
| PATCH | `/api/shipments/{id}/status` | Mettre a jour le statut |
| GET | `/api/shipments/stats` | Statistiques |

### Suivi (Public)
| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/tracking/{trackingNumber}` | Suivre un colis |

### Demandes d'envoi
| Methode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/shipments/request` | Soumettre une demande (Public) |
| GET | `/api/shipments/requests` | Liste des demandes (Auth) |
| PATCH | `/api/shipments/requests/{id}/status` | Changer statut (Auth) |

### Contact
| Methode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/contact/request` | Envoyer un message (Public) |
| GET | `/api/contact/requests` | Liste des messages (Auth) |
| PATCH | `/api/contact/requests/{id}/status` | Changer statut (Auth) |

---

## Variables d'Environnement

| Variable | Description | Defaut |
|----------|-------------|--------|
| `DATABASE_URL` | URL JDBC PostgreSQL | Neon `neondb` |
| `DB_USERNAME` | Nom d'utilisateur DB | `neondb_owner` |
| `DB_PASSWORD` | Mot de passe DB | requis |
| `JWT_SECRET` | Cle secrete JWT | `melianiTransSecretKey2024...` |
| `JWT_EXPIRATION` | Duree de validite JWT (ms) | `86400000` |
| `CORS_ORIGINS` | Origines CORS autorisees | `http://localhost:4200` |

---

## Deploiement en Production

### 1. Construire le Frontend
```bash
cd frontend
npm run build
```
Les fichiers statiques sont generes dans `dist/meliani-trans/`.

### 2. Construire le Backend
```bash
cd backend
mvn clean package
```
Le JAR est genere dans `target/meliani-trans-backend-1.0.0.jar`.

### 3. Deploiement
- Deployer le JAR Spring Boot sur un serveur (Heroku, Railway, VPS)
- Deployer le frontend (Netlify, Vercel, ou servir via Spring Boot)
- Configurer les variables d'environnement
- La base de donnees PostgreSQL sera creee automatiquement (`ddl-auto=update`)

---

## Licence

© 2025 Meliani Trans. Tous droits reserves.

<div class="login-help">
            <p><strong>Identifiants par défaut :</strong></p>
            <p>Email : Meliani&#64;gmail.com</p>
            <p>Mot de passe : Meliani&#64;123</p>
          </div>
