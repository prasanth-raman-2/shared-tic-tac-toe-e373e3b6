#!/bin/bash
cd /tmp/kavia/workspace/code-generation/shared-tic-tac-toe-e373e3b6/tic_tac_toe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

