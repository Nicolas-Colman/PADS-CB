export class Prestador {
    public prestEmail           : string | undefined;
    public prestEspecialidade   : Date   | undefined;
    public prestId              : string | undefined;
    public prestNome            : string | undefined;
    public prestTelefone        : string | undefined;
    
    constructor(obj?: Partial<Prestador>){
        if (obj){
            this.prestEmail         = obj.prestEmail
            this.prestEspecialidade = obj.prestEspecialidade
            this.prestId            = obj.prestId
            this.prestNome          = obj.prestNome
            this.prestTelefone      = obj.prestTelefone
        }
    }

    toString(){
        const objeto=`{
            "prestEmail"            : "${this.prestEmail}",
            "prestEspecialidade"    : "${this.prestEspecialidade}",
            "prestId"               : "${this.prestId}",
            "prestNome"             : "${this.prestNome}",
            "prestTelefone"         : "${this.prestTelefone}"
        }`
        return objeto
    }

    toFirestore(){
        const prestador={
            prestEmail          : this.prestEmail,
            prestEspecialidade  : this.prestEspecialidade,
            prestId             : this.prestId,
            prestNome           : this.prestNome,
            prestTelefone       : this.prestTelefone
        }
        return prestador
    }


}