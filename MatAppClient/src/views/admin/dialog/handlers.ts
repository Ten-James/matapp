export const hide = (e: Event, setTranslateY: (string) => void, setDialog: (string) => void) => {
  e.preventDefault();
  setTranslateY('-100vh');
  setTimeout(() => setDialog('hidden'), 500);
};
export const submit = (e: Event, form: HTMLFormElement | null, setTranslateY: (string) => void, setDialog: (string) => void) => {
  e.preventDefault();
  if (!form) return;
  let data = {};
  let arr = [...form.querySelectorAll('input, select')];
  // @ts-ignore
  arr.forEach((e) => (data[e.id] = e.value));
  console.log(data);
  setTranslateY('-100vh');
  setTimeout(() => setDialog('hidden'), 500);
};
