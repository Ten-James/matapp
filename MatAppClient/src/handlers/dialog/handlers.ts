export const hide = (e: Event, setTranslateY: (string) => void, setDialog: (string) => void) => {
  e.preventDefault();
  setTranslateY('-100vh');
  setTimeout(() => setDialog('hidden'), 500);
};

//TODO add base data for ids.

export const submit = (e: Event, form: HTMLFormElement | null, selectedIDs: number[], setButtonDisabled: (data: boolean) => void, sendData: (data: any) => void, setError: (Error: string) => void) => {
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
  sendData(data);
};
