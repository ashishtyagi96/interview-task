from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.get("/investors")
def read_investors():
    conn = get_db_connection()
    query = '''
    SELECT investors.id as id, investors.type as type, investors.date_added as date_added, investors.name as name, SUM(commitments.amount) as total_commitment
    FROM commitments
    JOIN investors ON commitments.investor_id = investors.id
    GROUP BY investors.name
    ORDER BY investors.id ASC
    '''
    investors = conn.execute(query).fetchall()
    conn.close()
    return investors

@app.get("/investors/{id}")
def read_investor(id: int):
    conn = get_db_connection()
    query = '''
    SELECT *
    FROM investors
    WHERE id = ?
    '''
    investor = conn.execute(query, (id,)).fetchone()
    conn.close()
    if investor is None:
        return {"error": "Investor not found"}
    return dict(investor)

@app.get("/investors/{id}/commitments")
def read_commitments(id: int, request: Request):
    asset_class = request.query_params.get('asset_class')
    conn = get_db_connection()
    query = 'SELECT * FROM commitments WHERE investor_id = ?'
    params = [id]
    if asset_class and asset_class.lower() != 'all':
        query += ' AND asset_class = ?'
        params.append(asset_class)
    query += ' ORDER BY added_at DESC'
    commitments = conn.execute(query, params).fetchall()
    conn.close()
    return [dict(row) for row in commitments]

@app.get("/investors/{id}/commitments/filters")
def get_commitment_filters(id: int):
    conn = get_db_connection()
    query = '''
    SELECT asset_class, SUM(amount) as amount
    FROM commitments
    WHERE investor_id = ?
    GROUP BY asset_class
    UNION ALL
    SELECT 'All' as asset_class, SUM(amount) as amount
    FROM commitments
    WHERE investor_id = ?
    ORDER BY amount DESC
    '''
    filters = conn.execute(query, (id, id)).fetchall()
    conn.close()
    return [dict(row) for row in filters]