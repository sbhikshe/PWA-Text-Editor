const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeinstallprompt_event
window.addEventListener('beforeinstallprompt', (beforeInstallPromptEvent) => {
  window.deferredPrompt = beforeInstallPromptEvent;
  butInstall.hidden = false;
});

// TODO: Implement a click event handler on the `butInstall` element
https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent/prompt
butInstall.addEventListener('click', async () => {
  const beforeInstallPromptEvent = window.deferredPrompt;
  if(!beforeInstallPromptEvent) {
    console.log("no beforeInstallPromptEvent found!");
    return;
  }
  /* show install prompt */
  beforeInstallPromptEvent.prompt();
  window.deferredPrompt = null;

  /* hide the install button */
  butInstall.hidden = true;
});

// TODO: Add an handler for the `appinstalled` event
https://developer.mozilla.org/en-US/docs/Web/API/Window/appinstalled_event
window.addEventListener('appinstalled', (event) => {
  console.log('Thank you for installing JATE!')

  /* clear the beforeInstallPromptEvent */
  window.deferredPrompt = null;
});
