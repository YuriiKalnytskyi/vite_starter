const getIcons = async () => ({
  //default icons
  errorIcon: (await import('./default/error-icon.svg')).default,
  successIcon: (await import('./default/success-icon.svg')).default,
  visibilityOffIcon: (await import('./default/success-icon.svg')).default,
  visibilityOnIcon: (await import('./default/success-icon.svg')).default

  //scheme icons
});

const Icons = (async function () {
  return await getIcons();
})();

export { Icons, getIcons };
