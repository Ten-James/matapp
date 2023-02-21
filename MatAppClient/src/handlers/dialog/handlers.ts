export const hide = (e: Event, setTranslateY: (string) => void, setDialog: (string) => void) => {
  e.preventDefault();
  setTranslateY('-100vh');
  setTimeout(() => setDialog('hidden'), 500);
};

export const submit = (e: Event, form: HTMLFormElement | null, selectedIDs: number[], setButtonDisabled: (data: boolean) => void, sendData: (data: any) => void, setError: (Error: string) => void, afterProcess: (data: any) => any) => {
  e.preventDefault();
  if (!form) return;
  setButtonDisabled(true);
  const data = { id: selectedIDs };
  const arr = [...form.querySelectorAll('input:not([type="checkbox"]):not([type="button"]), select')] as HTMLInputElement[];
  const checkboxes = [...form.querySelectorAll('input[type="checkbox"]:not([type="button"])')] as HTMLInputElement[];

  if (
    !arr
      .reverse()
      .map<Boolean>((input) => {
        if (input.required && !input.value) {
          setError(`${input.name} is not filled`);
          return false;
        }
        return true;
      })
      .reduce((a, b) => a && b, true)
  ) {
    setButtonDisabled(false);
    return;
  }

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      if (!Object.keys(data).includes(checkbox.name)) data[checkbox.name] = [];
      data[checkbox.name].push(checkbox.id.split('-')[1]);
    }
  });
  // @ts-ignore
  arr.forEach((e) => (data[e.id] = e.value));

  if (Object.keys(data).findIndex((x) => x.startsWith('line')) !== -1) {
    //merge all lines into one array depending on line number
    const lines = [
      ...new Set(
        Object.keys(data)
          .filter((x) => x.startsWith('line'))
          .map((x) => x.split('_')[1]),
      ),
    ];
    data['ingredients'] = lines.map((line) =>
      Object.keys(data)
        .filter((x) => x.startsWith('line') && x.split('_')[1] === line)
        .map((x) => data[x]),
    );
    //delete all line keys
    Object.keys(data)
      .filter((x) => x.startsWith('line'))
      .forEach((x) => delete data[x]);
  }

  console.log(afterProcess(data));
  sendData(afterProcess(data));
};
