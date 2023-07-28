//function to handle the name of Modal
export function objIsEmpty(obj?: object) {
  //se tiver uma prop no obj, retorna false - significa que o objeto contem algo
  for (const prop in obj) {return false}
  //senao retorna true, o objeto esta vazio
  return true;
}