"use client";

import { useEffect } from "react";

type FullscreenDocument = Document & {
  webkitExitFullscreen?: () => Promise<void> | void;
  webkitFullscreenElement?: Element | null;
};

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

function isFullscreen(documentRef: FullscreenDocument) {
  return Boolean(
    documentRef.fullscreenElement ?? documentRef.webkitFullscreenElement,
  );
}

async function enterFullscreen(documentRef: FullscreenDocument) {
  const root = documentRef.documentElement as FullscreenElement;

  if (root.requestFullscreen) {
    await root.requestFullscreen();
    return;
  }

  await root.webkitRequestFullscreen?.();
}

async function exitFullscreen(documentRef: FullscreenDocument) {
  if (documentRef.exitFullscreen) {
    await documentRef.exitFullscreen();
    return;
  }

  await documentRef.webkitExitFullscreen?.();
}

export async function toggleFullscreen() {
  const documentRef = document as FullscreenDocument;

  if (isFullscreen(documentRef)) {
    await exitFullscreen(documentRef);
    return;
  }

  await enterFullscreen(documentRef);
}

export default function FullscreenShortcut() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isShortcut =
        event.key.toLowerCase() === "m" && (event.metaKey || event.ctrlKey);

      if (!isShortcut) {
        return;
      }

      event.preventDefault();
      void toggleFullscreen();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}
