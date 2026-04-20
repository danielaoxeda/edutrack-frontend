# EduTrack — Frontend

> Plataforma académica para estudiantes, docentes y administradores.
> Construida con React, TypeScript y Tailwind CSS.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss)
![GCP](https://img.shields.io/badge/Despliegue-GCP_App_Engine-4285F4?logo=googlecloud)

## 📌 Sobre el proyecto

EduTrack es una plataforma de gestión académica desarrollada como parte del
curso de **Desarrollo Web Integrado**. Este repositorio contiene la aplicación
frontend, que consume la API REST de EduTrack.

## ✨ Características

- 🔐 Autenticación con JWT y rutas protegidas
- 👨‍🎓 **Estudiante** — ver notas, tareas y asistencia
- 👨‍🏫 **Docente** — gestionar notas, tareas y asistencia de estudiantes
- 🛠️ **Administrador** — gestionar usuarios y configuración del sistema
- 📊 Dashboards personalizados por rol con datos en tiempo real
- 📱 Interfaz completamente responsiva con Tailwind CSS

## 🛠️ Tecnologías utilizadas

| Tecnología       | Propósito                     |
|------------------|-------------------------------|
| React 18         | Framework de interfaz de usuario |
| TypeScript       | Desarrollo con tipos seguros   |
| Tailwind CSS     | Estilización basada en utilidades |
| React Router     | Navegación en el cliente       |
| Axios            | Cliente HTTP para llamadas a API |
| Context API      | Gestión de autenticación y estado global |
| GCP App Engine   | Despliegue en la nube         |

## 🚀 Cómo empezar

### Requisitos previos

- Node.js >= 18
- npm o yarn
- Backend de EduTrack corriendo localmente o desplegado

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/danielaoxeda/edutrack-frontend.git
cd edutrack-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
