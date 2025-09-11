
# 🔐 Password Crypt - Sistema de Registro y Login en Consola

Un sistema sencillo en Node.js para registrar usuarios y manejar login de manera segura usando la librería bcrypt
.
Todas las contraseñas se almacenan cifradas en un archivo JSON, lo que garantiza que no se guarden en texto plano.

## 📌 Descripción del Problema

El almacenamiento de contraseñas en texto plano es un grave riesgo de seguridad.
Este proyecto resuelve el problema implementando un sistema de registro y login seguro en consola, donde:

- Los usuarios se registran con email y contraseña.

- La contraseña se cifra con bcrypt antes de guardarse en accounts.json.

- El login valida la contraseña ingresada comparándola contra el hash.

## 🛠️ Librerías Utilizadas

- bcrypt
 → para cifrar y comparar contraseñas.

- chalk
 → para mostrar mensajes coloridos en consola.

- clear
 → para limpiar la consola y mejorar la experiencia visual.

- fs (File System)
 → para leer y escribir en el archivo accounts.json.

- readline
 → para manejar entradas del usuario por consola.

## ⚙️ Implementación

**1.** El sistema arranca mostrando un menú principal:

-  Login

-  Register

-  Exit

**2.** En el registro:

- Se solicita un correo y contraseña.

- La contraseña se cifra con bcrypt y se guarda en accounts.json.

- Si el email ya existe, se muestra un error.

**3.** En el login:

- Se pide email y contraseña.

- Se busca el usuario en accounts.json.

- Se compara la contraseña ingresada con el hash almacenado usando bcrypt.compare.

- Si coinciden, el acceso es exitoso; de lo contrario, se muestra error.
---
## 📂 Estructura del Proyecto
````
Password_crypt-main/
├── accounts.json      # Base de datos local (usuarios y contraseñas cifradas)
├── main.js            # Lógica principal del programa
├── package.json       # Dependencias y scripts
├── .gitignore
└── README.md
````
---

## 🚀 Instalación y Uso
### 1️⃣ Clonar el repositorio
````
git clone https://github.com/KarolainReyes/Password_crypt
cd Password_crypt
````
### 2️⃣ Instalar dependencias
````
npm install
````
### 3️⃣ Ejecutar el programa
````
node main.js
````
### 4️⃣ Ejemplo de flujo
````
=======================
 Welcome to the system
=======================
1. Login
2. Register
3. Exit
-----------------------
Type an option:
````
## 🎥 Video de Presentación

📌 Mira el video explicativo aquí 👉 [https://youtu.be/0UYCP7rRDNE?si=KsIkTsSlcfUEA_2M]

En el video se explica:

- Qué problema resuelve el proyecto.

- Por qué se usa la librería bcrypt.

- Cómo funciona la aplicación completa.

- Ejemplo en vivo del registro y login por consola.

## 🤝 Autores
- Karolain Reyes
- Edgar Andres Leal
- Michel Rodríguez 
