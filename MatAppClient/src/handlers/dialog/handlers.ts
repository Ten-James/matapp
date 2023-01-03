export const hide = (e: Event, setTranslateY: (string) => void, setDialog: (string) => void) => {
  e.preventDefault();
  setTranslateY('-100vh');
  setTimeout(() => setDialog('hidden'), 500);
};

//TODO add base data for ids.

export const submit = (e: Event, form: HTMLFormElement | null, setTranslateY: (string) => void, setDialog: (string) => void, selectedIDs: number[], sendData: (data: any) => void) => {
  e.preventDefault();
  if (!form) return;
  const data = { id: selectedIDs };
  const arr = [...form.querySelectorAll('input:not([type="checkbox"]):not([type="button"]), select')];
  const checkboxes = [...form.querySelectorAll('input[type="checkbox"]:not([type="button"])')] as HTMLInputElement[];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      if (!Object.keys(data).includes(checkbox.name)) data[checkbox.name] = [];
      data[checkbox.name].push(checkbox.id.split('-')[1]);
    }
  });
  // @ts-ignore
  arr.forEach((e) => (data[e.id] = e.value));
  console.log(data);
  setTranslateY('-100vh');
  sendData(data);
  setTimeout(() => setDialog('hidden'), 500);
};
