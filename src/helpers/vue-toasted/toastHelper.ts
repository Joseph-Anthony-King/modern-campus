export const ToastMethods = {
  show: 'show',
  success: 'success',
  info: 'info',
  error: 'error',
  register: 'register',
};

export function showToast(component: any, type: string, message: string, options: any): void {
  const timeout = 500;

  if (type === "show") {
    setTimeout(function () {
      component.$toasted.show(message, options);
    }, timeout);
  } else if (type === "success") {
    setTimeout(function () {
      component.$toasted.success(message, options);
    }, timeout);
  } else if (type === "info") {
    setTimeout(function () {
      component.$toasted.info(message, options);
    }, timeout);
  } else if (type === "error") {
    setTimeout(function () {
      component.$toasted.error(message, options);
    }, timeout);
  } else {
    setTimeout(function () {
      component.$toasted.show(message, options);
    }, timeout);
  }
}

export function defaultToastOptions(): any {
  return {
    duration: 3000,
    position: "top-center",
  };
}

export function actionToastOptions(action: any, icon: null | string): any {
  if (icon === null) {
    return {
      action: action,
      position: "top-center",
    };
  } else {
    return {
      icon: icon,
      action: action,
      position: "top-center",
    };
  }
}
