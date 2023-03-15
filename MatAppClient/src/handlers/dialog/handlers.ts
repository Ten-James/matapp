import { IDialogOption } from '../../types';

export const hide = (e: Event, setTranslateY: (string: string) => void, setDialog: React.Dispatch<React.SetStateAction<IDialogOption>>) => {
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
      .map<boolean>((input) => {
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
      // @ts-ignore
      if (!Object.keys(data).includes(checkbox.name)) data[checkbox.name] = [];
      // @ts-ignore
      data[checkbox.name].push(checkbox.id.split('-')[1]);
    }
  });
  // @ts-ignore
  arr.forEach((e) => (data[e.id] = e.value));

  if (Object.keys(data).findIndex((x) => x.startsWith('line')) !== -1) {
    //@ts-ignore
    data['ingredients'] = [];
    Object.keys(data)
      .filter((x) => x.startsWith('line') && !x.endsWith('_amount'))
      .forEach((x) => {
        const id = x.split('_')[1];
        //@ts-ignore
        data['ingredients'][id] = [data[x], data[`line_${id}_amount`]];
      });
    //delete all line keys
    Object.keys(data)
      .filter((x) => x.startsWith('line'))
      //@ts-ignore
      .forEach((x) => delete data[x]);
  }

  console.log(afterProcess(data));
  sendData(afterProcess(data));
};
