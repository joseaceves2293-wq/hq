# HQ

A top-down pixel office for the dropshipping bot team: Products · Scout, Profit · Analyst, Store · Builder, Ads · Tester, Support · Desk, Dropship HQ and QC · Auditor.

- Live: https://joseaceves2293-wq.github.io/hq/
- Installable PWA (offline after first load).
- Tasks, pipeline and meetings are saved in your own browser's localStorage. Only Round Table messages go to the relay.

Round Table goes live with the real Grok Bots through a small relay on the Grok Bot box: Start meeting sends the topic to the seated bots, their real replies land at the table, and Wrap up asks Dropship HQ for decisions and `ACTION: <bot> | <task>` lines. Settings (gear) holds the relay URL (pre-filled from `relay.json`) and a 6-digit meeting PIN. When the relay is offline or not connected, the table falls back to role-based checklist prompts, labeled as such.

This repo holds the built site. The source lives in `/workspace/hq-office` on the Grok Bot box.
