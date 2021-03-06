const styleGeneral =
  // tslint:disable-next-line:max-line-length
  'position:absolute;transform:translate3d(0,0,0);width:150px;height:35px;font-size:12px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-style:normal;line-height:12px;color:rgb(0,0,0);background:rgb(255,255,255,0);border-width:1px;border-style:solid;border-color:rgb(173,173,173);';

const styleRange =
  'position:absolute;transform:translate3d(0,0,0);width:160px;height:50px;background:rgb(255,255,255,0);';

const styleVideo =
  'position:absolute;transform:translate3d(0,0,0);width:360px;height:220px;background:rgb(255,255,255,0);';

const styleLink =
  // tslint:disable-next-line:max-line-length
  'position:absolute;transform:translate3d(0,0,0);background:rgb(255,255,255,0);width:160px;height:70px;font-size:12px;text-align:left;font-family:Arial,Helvetica,sans-serif;font-style:normal;line-height:12px;';

const styleImage =
  'position:absolute;transform:translate3d(0,0,0);width:100px;height:100px';

const styleDiv =
  // tslint:disable-next-line:max-line-length
  'position:absolute;transform:translate3d(0,0,0);width:160px;height:70px;font-size:12px;text-align:left;font-family:Arial,Helvetica,sans-serif;font-style:normal;line-height:12px;color:rgb(0,0,0);background:rgb(255,255,255,0);border-width:1px;border-style:none;border-color:rgb(173,173,173);';

const styleRadioCheck =
  // tslint:disable-next-line:max-line-length
  'position:absolute;transform:translate3d(0,0,0);-webkit-appearance:none;width:50px;height:50px;background-repeat:no-repeat;background-size:100px;background-position-x:left;border-radius:10px';

export const ctrlStyleMap = {
  text: styleGeneral,
  number: styleGeneral,
  email: styleGeneral,
  password: styleGeneral,
  button: styleGeneral,
  select: styleGeneral,
  div: styleDiv,
  image: styleImage,
  textarea: styleGeneral,
  file: styleGeneral,
  a: styleLink,
  checkbox: styleRadioCheck,
  radio: styleRadioCheck,
  range: styleRange,
  iframe: styleVideo,
  template: styleVideo
};

export const displayValue = {
  text: 'Texto',
  number: 'Número',
  email: 'Email',
  password: 'Contraseña',
  button: 'Botón',
  select: 'Combo',
  div: 'Mensaje',
  image: 'Imagen',
  textarea: 'Área texto',
  file: 'Archivo',
  a: 'Link',
  checkbox: 'Checkbox',
  radio: 'Radio',
  range: 'Rango',
  iframe: 'Video'
};
