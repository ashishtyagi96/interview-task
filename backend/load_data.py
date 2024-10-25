import pandas as pd
import sqlite3
from datetime import datetime

# Step 1: Read the CSV file
csv_file = 'data.csv'
df = pd.read_csv(csv_file)

# Step 2: Create the SQLite schema
db_file = 'database.db'
conn = sqlite3.connect(db_file)
cursor = conn.cursor()

# Create investors table
cursor.execute('''
CREATE TABLE IF NOT EXISTS investors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    type TEXT,
    country TEXT,
    date_added TEXT
);
''')

# Create commitments table
cursor.execute('''
CREATE TABLE IF NOT EXISTS commitments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    investor_id INTEGER,
    added_at TEXT,
    updated_at TEXT,
    asset_class TEXT,
    amount REAL,
    currency TEXT,
    FOREIGN KEY (investor_id) REFERENCES investors (id)
);
''')

# Step 3: Populate the investors table
investors = df[['investor_name', 'investory_type', 'investor_country']].drop_duplicates()
for _, row in investors.iterrows():
    # Find the oldest added_at date for the current investor
    oldest_date = df[df['investor_name'] == row['investor_name']]['added_at'].min()
    cursor.execute('INSERT OR IGNORE INTO investors (name, type, country, date_added) VALUES (?, ?, ?, ?);', 
                   (row['investor_name'], row['investory_type'], row['investor_country'], oldest_date))

# Step 4: Populate the commitments table
for _, row in df.iterrows():
    cursor.execute('SELECT id FROM investors WHERE name = ?;', (row['investor_name'],))
    investor_id = cursor.fetchone()[0]
    cursor.execute('''
    INSERT INTO commitments (investor_id, added_at, updated_at, asset_class, amount, currency)
    VALUES (?, ?, ?, ?, ?, ?);
    ''', (investor_id, row['added_at'], row['updated_at'], row['commitment_asset_class'], row['commitment_amount'], row['commitment_currency']))

# Commit and close the connection
conn.commit()
conn.close()

print(f"Data from {csv_file} has been loaded into {db_file} successfully.")