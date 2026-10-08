# KoshykGO — Render

Проект подготовлен для публикации на Render как **Static Site**.

## Вариант 1 — через Render Dashboard

1. Создай новый **Static Site** на Render.
2. Подключи репозиторий с этим проектом.
3. Build Command:
   `npm ci && npm run build`
4. Publish Directory:
   `dist`
5. Нажми **Deploy Static Site**.

## Вариант 2 — Blueprint

Файл `render.yaml` уже содержит настройки Render. Если проект находится в Git-репозитории, Render сможет использовать их автоматически через Blueprint.

## Важно

Это Vite-приложение, поэтому запускать `npm run dev` на Render не нужно. Render должен собрать проект командой `npm ci && npm run build` и отдавать готовую папку `dist` как статический сайт.
