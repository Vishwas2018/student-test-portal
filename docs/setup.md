# Setup Guide

This document explains how to set up the Student Test Portal project for development.

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Docker and Docker Compose
- Git

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/student-test-portal.git
   cd student-test-portal
   ```

2. Copy the environment file:
   ```
   cp .env.example .env
   ```

3. Install dependencies:
   ```
   npm run install-all
   ```

4. Start the development environment:
   ```
   npm run dev
   ```

## Running Locally Without Docker

1. Make sure MongoDB is installed and running locally.
2. Update the .env file to connect to your local MongoDB instance.
3. Run the server and client separately:
   ```
   npm run dev-local
   ```

