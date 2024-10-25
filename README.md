# Interview Task

This repository contains a full-stack application with a backend built using Python, frontend built using React and database using SQLite.

## Backend

The backend is a Python application.

### Setup

1. Navigate to the `backend` directory:

   ```sh
   cd backend
   ```

2. Install the dependencies:
   - If you have `pip`:
     ```sh
     pip install -r requirements.txt
     ```
   - If you have `pip3`:
     ```sh
     pip3 install -r requirements.txt
     ```
3. To load the data from file to SQLite database
   - If you have `python`:
     ```sh
     python load_data.py
     ```
   - If you have `python3`:
     ```sh
     python3 load_data.py
     ```

### Running the Backend

To start the backend server, run:

```sh
uvicorn main:app --reload
```

## Frontend

The frontend is a React application.

### Setup

1. Navigate to the `frontend` directory:

   ```sh
   cd frontend
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

### Running the Frontend

To start the frontend, run:

```sh
npm start
```
