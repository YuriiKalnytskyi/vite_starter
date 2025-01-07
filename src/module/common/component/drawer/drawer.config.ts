export const config = {
  right: {
    from: {
      opacity: 0,
      transform: 'translateX(100%)'
    },
    enter: {
      opacity: 1,
      transform: 'translateX(0%)'
    },
    leave: {
      opacity: 0,
      transform: 'translateX(100%)'
    },
    config: {
      duration: 300
    }
  },
  left: {
    from: {
      opacity: 0,
      transform: 'translateX(-100%)'
    },
    enter: {
      opacity: 1,
      transform: 'translateX(0%)'
    },
    leave: {
      opacity: 0,
      transform: 'translateX(-100%)'
    },
    config: {
      duration: 300
    }
  },

  bottom: {
    from: {
      opacity: 1,
      transform: 'translateY(+100%)'
    },
    enter: {
      opacity: 1,
      transform: 'translateY(0%)'
    },
    leave: {
      opacity: 1,
      transform: 'translateY(+100%)'
    },
    config: {
      duration: 300,
    }
  },
  top: {
    from: {
      opacity: 1,
      transform: 'translateY(-100%)'
    },
    enter: {
      opacity: 1,
      transform: 'translateY(0%)'
    },
    leave: {
      opacity: 1,
      transform: 'translateY(-100%)'
    },
    config: {
      duration: 300
    }
  },
  center: {
    from: {
      opacity: 0,
      transform: 'scale(0.5)',
      borderRadius: '50%'
    },
    enter: {
      opacity: 1,
      transform: 'scale(1)',
      borderRadius: '0'
    },
    leave: {
      opacity: 0,
      transform: 'scale(0.5)',
      borderRadius: '50%'
    },
    config: {
      duration: 300
    }
  }
};
