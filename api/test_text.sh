#!/bin/bash

# Test the Text API

# --- Save text ---
echo "Testing text creation..."
response=$(curl -s -X POST -H "Content-Type: application/json" -d '{"text":"This is a test text"}' http://localhost/api/text)
share_code=$(echo "$response" | jq -r '.share_code')

if [ -n "$share_code" ]; then
  echo "Text created successfully with share code: $share_code"
else
  echo "Error creating text:"
  echo "$response"
  exit 1
fi

# --- Retrieve the text ---
echo "Testing text retrieval..."
response=$(curl -s http://localhost/api/text/"$share_code")
text=$(echo "$response" | jq -r '.text')

if [ "$text" == "This is a test text" ]; then
  echo "Text retrieved successfully:"
  echo "$text"
else
  echo "Error retrieving text:"
  echo "$response"
  exit 1
fi

echo "All tests passed!"