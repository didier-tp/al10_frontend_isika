export class MenuDefinition {
    label? : string;
    path? : string;
    children? : MenuDefinition[];
    divider? : boolean;
    role? : string; //expected role for routerLink enable/display
}