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