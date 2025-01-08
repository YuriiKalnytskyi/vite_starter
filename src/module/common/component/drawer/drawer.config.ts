export const config = {
  right: {
    variants: {
      hidden: { x: '100%', opacity: 0 },
      visible: { x: '0%', opacity: 1 },
      exit: { x: '100%', opacity: 0 }
    },
    duration: 0.6
  },
  left: {
    variants: {
      hidden: { x: '-100%', opacity: 0 },
      visible: { x: '0%', opacity: 1 },
      exit: { x: '-100%', opacity: 0 }
    },
    duration: 0.6
  },
  bottom: {
    variants: {
      hidden: { y: '100%', opacity: 0 },
      visible: { y: '0%', opacity: 1 },
      exit: { y: '100%', opacity: 0 }
    },
    duration: 0.6
  },
  top: {
    variants: {
      hidden: { y: '-100%', opacity: 0 },
      visible: { y: '0%', opacity: 1 },
      exit: { y: '-100%', opacity: 0 }
    },
    duration: 0.6
  },
  center: {
    variants: {
      hidden: { scale: 0.5, opacity: 0, borderRadius: '50%' },
      visible: { scale: 1, opacity: 1, borderRadius: '0%' },
      exit: { scale: 0.5, opacity: 0, borderRadius: '50%' }
    },
    duration: 0.6
  }
};
