This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Módulo de Inicio de Sesión

Este proyecto implementa un sistema de inicio de sesión completo con backend en Flask y frontend en HTML/CSS.

## Características

- Interfaz de usuario moderna y responsiva
- Sistema de autenticación seguro
- Sistema de reportes de problemas
- Base de datos SQLite para almacenar usuarios
- Mensajes de error y éxito

## Requisitos

- Python 3.8 o superior
- pip (gestor de paquetes de Python)

## Instalación

1. Clona este repositorio o descarga los archivos

2. Crea un entorno virtual (recomendado):
```bash
python -m venv venv
.\venv\Scripts\activate  # En Windows
source venv/bin/activate  # En Unix/MacOS
```

3. Instala las dependencias:
```bash
pip install -r requirements.txt
```

## Configuración

1. La base de datos se creará automáticamente al ejecutar la aplicación
2. Para crear un usuario de prueba, puedes usar el siguiente código en la terminal de Python:

```python
from app import app, db, User
from werkzeug.security import generate_password_hash

with app.app_context():
    db.create_all()
    user = User(username='admin', password=generate_password_hash('admin123'))
    db.session.add(user)
    db.session.commit()
```

## Uso

1. Ejecuta la aplicación:
```bash
python app.py
```

2. Abre tu navegador y visita `http://localhost:5000`

3. Inicia sesión con las credenciales:
   - Usuario: admin
   - Contraseña: admin123

## Estructura del Proyecto

```
.
├── app.py              # Aplicación principal Flask
├── requirements.txt    # Dependencias del proyecto
├── templates/         # Plantillas HTML
│   ├── login.html    # Página de inicio de sesión
│   └── dashboard.html # Panel de control
└── users.db          # Base de datos SQLite (se crea automáticamente)
```

## Seguridad

- Las contraseñas se almacenan hasheadas usando Werkzeug
- Protección contra CSRF incluida en Flask
- Validación de datos en el backend

## Personalización

- Puedes modificar los estilos en los archivos HTML
- La configuración de la base de datos se puede cambiar en `app.py`
- Los mensajes de error y éxito se pueden personalizar en las rutas de Flask 
