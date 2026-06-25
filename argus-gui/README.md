# Argus GUI (Expo / React Native / TypeScript)

Mobile front-end for the Argus DR screening. Picks a fundus photo, sends it to the Django/Strawberry GraphQL backend via `urql`'s multipart
upload exchange, and displays the predicted severity grade.

## Setup

```bash
cd argus-gui
bun install
```

## IMPORTANT: configure the API URL before running

Open `src/graphql/client.ts`. The default URL is:

```
http://localhost:8000/graphql/
```


```bash
# Linux (Arch):
ip addr show | grep "inet "
```

either edit the fallback URL directly in `client.ts`, or set it in
`app.json` under `expo.extra.apiUrl`, e.g.:

```json
"extra": {
  "apiUrl": "http://192.168.1.42:8000/graphql/"
}
```

Also make sure Django is listening on all interfaces, not just localhost:

```bash
python manage.py runserver 0.0.0.0:8000
```

And that your phone and dev machine are on the **same Wi-Fi network**.

## Run it

```bash
bunx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS).

## Notes

- Image picking uses `expo-image-picker` — you'll be prompted for photo library permission on first use.
- The `predict` mutation returns a GraphQL union (`PredictionResult |  PredictionError`); the UI branches on `__typename` to show either the prediction breakdown or a plain error message.
