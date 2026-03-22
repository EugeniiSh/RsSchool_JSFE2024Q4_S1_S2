interface ILogObject {
  [key: string]: string | number;
}

function logOnScreen(logInfo: ILogObject): {
  logScreenNode: HTMLDivElement;
  apdate: (logInfo: ILogObject) => void;
} {
  const logWindow = document.createElement('div');
  logWindow.style.cssText = `
    position: fixed;
    left: 0;
    top: 0;
    min-width: 50px;
    min-height: 50px;
    background-color: grey;
    font-size: 16px;
  `;

  Object.keys(logInfo).forEach((key) => {
    const logBlock = document.createElement('div');
    logBlock.textContent = `${key}: ${logInfo[key]}`;
    logWindow.append(logBlock);
  });

  function apdateLog(apdateLogInfo: ILogObject) {
    logWindow.innerHTML = '';

    Object.keys(apdateLogInfo).forEach((key) => {
      const logBlock = document.createElement('div');
      logBlock.textContent = `${key}: ${apdateLogInfo[key]}`;
      logWindow.append(logBlock);
    });
  }

  document.body.append(logWindow);

  return {
    logScreenNode: logWindow,
    apdate: apdateLog,
  };
}

export default { logOnScreen };
