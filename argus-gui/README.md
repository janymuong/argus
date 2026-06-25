# Argus GUI (Expo / React Native / TypeScript)

Mobile front-end for the `argus` DR screening. Picks a fundus photo, sends it to the Django/Strawberry GraphQL backend via `urql`'s multipart
upload exchange, and displays the predicted severity grade.

## Setup

```bash
cd argus-gui
bun install
bunx expo install expo-image-picker expo-status-bar
```
> **NOTE**: (`expo install`, not plain `bun install`, for Expo packages — it pulls the
exact patch versions compatible with your installed Expo SDK / Expo Go
version, which matters a lot for SDK 54.)


## IMPORTANT: setup
The backend host is read from an env var at start time, so your IP never
ends up in source control:

```bash
EXPO_PUBLIC_BACKEND_HOST=192.168.x.xyz bunx expo start
```

Optionally override the port too (defaults to 8000):

```bash
EXPO_PUBLIC_BACKEND_HOST=192.168.x.xyz EXPO_PUBLIC_BACKEND_PORT=8000 bunx expo start
```

Find your LAN IP:

```bash
# linux:
hostname  hostname --ip-addresses # or ip addr show | grep "inet "

# or windowns:
ipconfig
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

---
## Notes

- Image source: gallery (`expo-image-picker` library) or camera
  (`expo-image-picker` camera launch) — both prompt for the relevant
  permission on first use.
- UI flow: pick a source → preview + Analyze/Choose-Different-Image →
  result. The source-picker buttons disappear once an image is selected,
  replaced by Analyze and a way back, rather than showing every button at
  once.
- The `predict` mutation returns a GraphQL union (`PredictionResult |
  PredictionError`); the UI branches on `__typename` to show either the
  prediction breakdown or a plain error message.

