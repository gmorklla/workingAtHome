// Este modelo se usa cuando se requiere que un checkbox tenga una imagen para encer o apagar.
export class CheckboxStyleModel {
  public '-webkit-appearance': string;
  public 'width': string; // Lo que mida 'width'
  public 'height': string; // Lo que mida 'height'
  public 'background-image': string;
  public 'background-repeat': string;
  public 'background-size': string; // Las medidas de 'width' y 'height' multiplocado por 2
  public 'background-position-x': string; // Sólo puede ser left o right
}
