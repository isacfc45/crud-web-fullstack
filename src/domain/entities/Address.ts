export class Address {
  constructor(
    public id: number,
    public road: string,
    public number: string,
    public complement: string,
    public neighborhood: string,
    public cep: string,
    public city: string,
    public state: string,
    public country: string,
    public personId: number
  ) {}
}
