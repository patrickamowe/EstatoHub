#!/bin/bash

# === Load environment variables from .env ===
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo "❌ .env file not found!"
  exit 1
fi

# === Configuration ===
BACKUP_DIR="./db_backups"
DATE=$(date +%Y-%m-%d_%H-%M-%S)
FILENAME="$DB_NAME-backup-$DATE.sql"

# === Create backup directory if it doesn't exist ===
mkdir -p $BACKUP_DIR

# === Perform the backup ===
mysqldump -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASS $DB_NAME > "$BACKUP_DIR/$FILENAME"

# === Check if backup succeeded ===
if [ $? -eq 0 ]; then
  echo "✅ Backup successful: $BACKUP_DIR/$FILENAME"
else
  echo "❌ Backup failed! Check your .env credentials or network."
fi
